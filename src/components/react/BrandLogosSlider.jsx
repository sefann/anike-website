import { useEffect, useRef } from 'react';

export default function BrandLogosSlider({ logos = [] }) {
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
          will-change: transform;
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
    <div className="relative w-full overflow-hidden" style={{ height: '70px' }}>
      <div ref={containerRef} className="brand-logos-pan flex gap-12 md:gap-16 items-center h-full">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`logo-${index}`}
            className="flex-shrink-0 flex items-center justify-center h-full"
            style={{ width: '180px', minWidth: '180px' }}
          >
            <div className="flex items-center justify-center p-2 hover:scale-110 transition-transform duration-300 h-full w-full">
              <img 
                src={logo} 
                alt={`Brand logo ${index + 1}`}
                className={
                  logo.includes('UNPACK IT') 
                    ? 'max-h-28 md:max-h-32 w-auto h-auto object-contain opacity-100'
                    : logo.includes('MC OBED')
                    ? 'max-h-28 md:max-h-32 w-auto h-auto object-contain opacity-100'
                    : (logo.includes('H&S') || logo.includes('TREC'))
                    ? 'max-h-14 md:max-h-16 w-auto h-auto object-contain opacity-100'
                    : 'max-h-20 md:max-h-24 w-auto h-auto object-contain opacity-100'
                }
                style={{ display: 'block' }}
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load logo:', logo);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
