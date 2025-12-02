import { useState, useEffect } from 'react';

export default function HeroTitle() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const fullText = "I Don't Just";
  const speed = 100; // milliseconds per character

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText]);

  return (
    <span className="text-purple-400">
      {displayedText}
      {currentIndex < fullText.length && <span className="animate-pulse">|</span>}
    </span>
  );
}




