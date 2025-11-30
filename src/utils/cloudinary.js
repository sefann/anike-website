/**
 * Cloudinary Image Helper
 * Automatically formats, optimizes, and provides responsive image URLs
 */

// Get Cloudinary cloud name from environment variable or use default
const CLOUDINARY_CLOUD_NAME = typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_CLOUDINARY_CLOUD_NAME 
  ? import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME 
  : 'your-cloud-name'; // Replace with your Cloudinary cloud name

/**
 * Generate optimized Cloudinary image URL
 * @param {string} publicId - Cloudinary public ID of the image
 * @param {Object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export function getCloudinaryImage(publicId, options = {}) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'limit',
    gravity = 'auto',
  } = options;

  const transformations = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformString = transformations.join(',');
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}

/**
 * Generate responsive image srcset for Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @param {Array<number>} widths - Array of widths for srcset
 * @returns {string} srcset string
 */
export function getCloudinarySrcSet(publicId, widths = [400, 800, 1200, 1600]) {
  return widths
    .map((width) => {
      const url = getCloudinaryImage(publicId, { width, quality: 'auto', format: 'auto' });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate responsive image sizes attribute
 * @param {Object} breakpoints - Breakpoint configuration
 * @returns {string} sizes attribute string
 */
export function getCloudinarySizes(breakpoints = {}) {
  const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  
  if (Object.keys(breakpoints).length === 0) {
    return defaultSizes;
  }

  const sizes = Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}px) ${size}`)
    .join(', ');
  
  return sizes || defaultSizes;
}

/**
 * Get optimized image with responsive attributes
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Options including widths and sizes
 * @returns {Object} Image attributes object
 */
export function getResponsiveCloudinaryImage(publicId, options = {}) {
  const {
    widths = [400, 800, 1200, 1600],
    sizes,
    alt = '',
    ...imageOptions
  } = options;

  const src = getCloudinaryImage(publicId, { width: widths[Math.floor(widths.length / 2)], ...imageOptions });
  const srcSet = getCloudinarySrcSet(publicId, widths);
  const sizesAttr = sizes || getCloudinarySizes();

  return {
    src,
    srcSet,
    sizes: sizesAttr,
    alt,
    loading: 'lazy',
  };
}

