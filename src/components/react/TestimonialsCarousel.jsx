import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change slide every 6 seconds
    
    return () => clearInterval(timer);
  }, [testimonials.length]);
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ 
            duration: 0.5,
            ease: [0.25, 0.25, 0, 1]
          }}
          className="relative p-8 md:p-10 rounded-2xl bg-black border border-gray-900 shadow-xl max-w-3xl mx-auto"
        >
          {/* Large Quote Icon with Gradient */}
          <div className="absolute top-4 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-accentPink flex items-center justify-center z-10 shadow-lg">
            <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.433.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          
          {/* Testimonial Content */}
          <div className="pt-16 md:pt-4 md:pl-28">
            <p className="text-white text-base md:text-lg mb-8 leading-relaxed text-center md:text-left text-justify md:text-left px-4 md:px-0">
              {testimonials[currentIndex].content}
            </p>
            
            {/* Author Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
              {testimonials[currentIndex].avatar && (
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div className="flex flex-col text-center md:text-left">
                <p className="font-semibold text-white text-base mb-1">{testimonials[currentIndex].name}</p>
                {testimonials[currentIndex].role && (
                  <p className="text-white text-sm mb-1 opacity-90">{testimonials[currentIndex].role}</p>
                )}
                {testimonials[currentIndex].company && (
                  <p className="text-primary text-sm font-medium">{testimonials[currentIndex].company}</p>
                )}
              </div>
            </div>
            
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
        aria-label="Previous testimonial"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
        aria-label="Next testimonial"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dots Indicator */}
      <div className="flex gap-2 justify-center mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-gradient-to-r from-accentPink to-primary w-8'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
