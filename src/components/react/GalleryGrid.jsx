import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryGrid({ images = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No images to display.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {images.map((image, index) => {
        const imageName = image.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '') || `Image ${index + 1}`;
        const isHovered = hoveredIndex === index;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="group relative overflow-visible cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              animate={{
                scale: isHovered ? 2.5 : 1,
                zIndex: isHovered ? 50 : 1,
                y: isHovered ? -30 : 0,
                x: isHovered ? 0 : 0,
              }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative overflow-hidden rounded-lg bg-gray-900 shadow-xl aspect-square"
            >
              <img
                src={image}
                alt={imageName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Overlay */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent"
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-sm font-semibold">{imageName}</h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shine effect on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    exit={{ x: '200%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ transform: 'skewX(-20deg)' }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

