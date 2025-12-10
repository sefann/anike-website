import { useState, useEffect } from 'react';

export default function HeroTypewriter() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const lines = [
    { text: "I Don't Just", color: "text-purple-400" },
    { text: "Build Brands.", color: "text-white" },
    { text: "I Nurture Them.", color: "text-pink-500" }
  ];
  
  const typingSpeed = 100; // milliseconds per character
  const delayBetweenLines = 500; // delay before starting next line

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const currentLineText = lines[currentLine].text;
    
    if (displayedText.length < currentLineText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentLineText.slice(0, displayedText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Move to next line after a delay
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setDisplayedText('');
      }, delayBetweenLines);

      return () => clearTimeout(timer);
    }
  }, [displayedText, currentLine]);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
      {lines.map((line, index) => {
        if (index < currentLine) {
          // Line is fully displayed
          return (
            <span key={index} className={line.color}>
              {line.text}
              {index < lines.length - 1 && <br />}
            </span>
          );
        } else if (index === currentLine) {
          // Current line being typed
          return (
            <span key={index} className={line.color}>
              {displayedText}
              {showCursor && <span className="animate-pulse">|</span>}
              {index < lines.length - 1 && <br />}
            </span>
          );
        } else {
          // Future lines not yet started
          return null;
        }
      })}
    </h1>
  );
}












