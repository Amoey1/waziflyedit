import { useEffect, useRef, useCallback } from 'react';

interface ParallaxOptions {
  intensity?: number;
  maxMovement?: number;
  smoothing?: number;
}

export function useMouseParallax(options: ParallaxOptions = {}) {
  const {
    intensity = 0.02,
    maxMovement = 20,
    smoothing = 0.1
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const animate = useCallback(() => {
    currentX.current += (targetX.current - currentX.current) * smoothing;
    currentY.current += (targetY.current - currentY.current) * smoothing;

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('[data-parallax]');
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const depth = parseFloat(element.dataset.parallax || '1');
        const moveX = currentX.current * depth;
        const moveY = currentY.current * depth;
        
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [smoothing]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * intensity;
      const deltaY = (e.clientY - centerY) * intensity;

      targetX.current = Math.max(-maxMovement, Math.min(maxMovement, -deltaX));
      targetY.current = Math.max(-maxMovement, Math.min(maxMovement, -deltaY));
    };

    const handleMouseLeave = () => {
      targetX.current = 0;
      targetY.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, maxMovement, animate]);

  return containerRef;
}
