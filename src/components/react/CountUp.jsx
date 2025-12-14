import { useState, useEffect, useRef } from 'react';

export default function CountUp({ end, suffix = '', duration = 2000, startDelay = 0 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;
      
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      animate();
    }, startDelay);

    return () => clearTimeout(timer);
  }, [isVisible, end, duration, startDelay]);

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  );
}















