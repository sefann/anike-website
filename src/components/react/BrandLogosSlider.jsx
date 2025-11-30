import { useEffect, useRef } from 'react';

export default function BrandLogosSlider({ logos }) {
  const containerRef = useRef(null);
  
  if (!logos || logos.length === 0) {
    return null;
  }
  
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];
  
  useEffect(() => {
    const styleId = 'brand-logos-slider-styles';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = `
        @keyframes panLogos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .brand-logos-pan {
          animation: panLogos 40s linear infinite;
          display: flex;
          width: fit-content;
        }
        
        .brand-logos-pan:hover {
          animation-play-state: paused;
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      // Cleanup on unmount
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);
  
  return (
    <div className="relative w-full overflow-hidden py-8" style={{ minHeight: '150px' }}>
      <div ref={containerRef} className="brand-logos-pan flex gap-8 md:gap-12 items-center">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.slug}-${index}`}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: '200px', minWidth: '200px', height: '120px' }}
          >
            <a 
              href={`/projects/${logo.slug}`}
              className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300"
            >
              <img 
                src={logo.image} 
                alt={logo.name}
                className="max-h-20 md:max-h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load logo:', logo.image);
                  e.target.style.display = 'none';
                }}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
