'use client';

import { useEffect, useRef } from 'react';
import counterUp from 'counterup2';

const AnimatedCounter = ({ end, suffix = '' }) => {
  const counterRef = useRef(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          counterUp(el, {
            duration: 2000,
            delay: 16,
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={counterRef} data-counter>
      {end}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
