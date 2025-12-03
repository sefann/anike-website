import { useState } from 'react';

export default function ProjectGallery({ images, title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = images.slice(startIndex, endIndex);
  
  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };
  
  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };
  
  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold mb-6 text-purple-400">Project Gallery</h2>
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
        {currentImages.map((image, index) => (
          <div key={`${image}-${index}`} className="rounded-lg overflow-hidden bg-gray-900/30 aspect-square">
            <img 
              src={image} 
              alt={`${title} - Image ${startIndex + index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-gray-300 text-sm">
            {startIndex + 1} - {Math.min(endIndex, images.length)} of {images.length}
          </span>
          
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}






