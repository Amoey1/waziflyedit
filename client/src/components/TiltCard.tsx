import { useEffect, useRef, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxRotate?: number;
  scale?: number;
  smoothing?: number;
  glare?: boolean;
}

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function TiltCard({ 
  children, 
  className = '', 
  style,
  maxRotate = 5,
  scale = 1.02,
  smoothing = 0.1,
  glare = true
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rotateState = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationFrame = useRef<number | null>(null);
  const isTouch = useRef(isTouchDevice());

  useEffect(() => {
    if (!cardRef.current || isTouch.current) return;

    const card = cardRef.current;
    let isHovering = false;

    const animate = () => {
      const state = rotateState.current;
      state.x = lerp(state.x, state.targetX, smoothing);
      state.y = lerp(state.y, state.targetY, smoothing);

      const scaleValue = isHovering ? scale : 1;
      card.style.transform = `perspective(1000px) rotateX(${state.x}deg) rotateY(${state.y}deg) scale(${scaleValue})`;

      animationFrame.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      rotateState.current.targetX = -deltaY * maxRotate;
      rotateState.current.targetY = deltaX * maxRotate;

      if (glare && glareRef.current) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
        glareRef.current.style.opacity = '1';
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      rotateState.current.targetX = 0;
      rotateState.current.targetY = 0;
      if (glare && glareRef.current) {
        glareRef.current.style.opacity = '0';
      }
    };

    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      card.style.transform = '';
    };
  }, [maxRotate, scale, smoothing, glare]);

  return (
    <div 
      ref={cardRef} 
      className={`relative transition-shadow duration-300 ${className}`}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      {children}
      {glare && (
        <div 
          ref={glareRef}
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300"
          style={{ zIndex: 10 }}
        />
      )}
    </div>
  );
}
