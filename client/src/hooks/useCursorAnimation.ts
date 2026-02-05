import { useEffect, useRef, useCallback } from 'react';

interface CursorAnimationOptions {
  translateIntensity?: number;
  rotateIntensity?: number;
  maxTranslate?: number;
  maxRotate?: number;
  smoothing?: number;
  enabled?: boolean;
}

interface AnimatedElement {
  element: HTMLElement;
  translateX: number;
  translateY: number;
  rotateX: number;
  rotateY: number;
  targetTranslateX: number;
  targetTranslateY: number;
  targetRotateX: number;
  targetRotateY: number;
}

const defaultOptions: Required<CursorAnimationOptions> = {
  translateIntensity: 0.02,
  rotateIntensity: 0.01,
  maxTranslate: 20,
  maxRotate: 4,
  smoothing: 0.08,
  enabled: true,
};

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function useCursorAnimation<T extends HTMLElement>(
  options: CursorAnimationOptions = {}
) {
  const containerRef = useRef<T>(null);
  const animatedElements = useRef<Map<HTMLElement, AnimatedElement>>(new Map());
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const isTouch = useRef(isTouchDevice());

  const opts = { ...defaultOptions, ...options };

  const animate = useCallback(() => {
    if (!containerRef.current || !opts.enabled || isTouch.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mousePosition.current.x - centerX;
    const deltaY = mousePosition.current.y - centerY;

    animatedElements.current.forEach((state, element) => {
      const intensity = parseFloat(element.dataset.cursorIntensity || '1');
      const translateOnly = element.dataset.cursorTranslateOnly === 'true';
      const rotateOnly = element.dataset.cursorRotateOnly === 'true';
      const reverse = element.dataset.cursorReverse === 'true';
      const direction = reverse ? -1 : 1;

      if (!rotateOnly) {
        state.targetTranslateX = Math.max(
          -opts.maxTranslate,
          Math.min(opts.maxTranslate, deltaX * opts.translateIntensity * intensity * direction)
        );
        state.targetTranslateY = Math.max(
          -opts.maxTranslate,
          Math.min(opts.maxTranslate, deltaY * opts.translateIntensity * intensity * direction)
        );
      }

      if (!translateOnly) {
        state.targetRotateX = Math.max(
          -opts.maxRotate,
          Math.min(opts.maxRotate, -deltaY * opts.rotateIntensity * intensity * direction)
        );
        state.targetRotateY = Math.max(
          -opts.maxRotate,
          Math.min(opts.maxRotate, deltaX * opts.rotateIntensity * intensity * direction)
        );
      }

      state.translateX = lerp(state.translateX, state.targetTranslateX, opts.smoothing);
      state.translateY = lerp(state.translateY, state.targetTranslateY, opts.smoothing);
      state.rotateX = lerp(state.rotateX, state.targetRotateX, opts.smoothing);
      state.rotateY = lerp(state.rotateY, state.targetRotateY, opts.smoothing);

      const transform = `translate3d(${state.translateX}px, ${state.translateY}px, 0) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`;
      element.style.transform = transform;
    });

    animationFrame.current = requestAnimationFrame(animate);
  }, [opts]);

  useEffect(() => {
    if (!opts.enabled || isTouch.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      animatedElements.current.forEach((state) => {
        state.targetTranslateX = 0;
        state.targetTranslateY = 0;
        state.targetRotateX = 0;
        state.targetRotateY = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [opts.enabled]);

  useEffect(() => {
    if (!containerRef.current || !opts.enabled || isTouch.current) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll<HTMLElement>('[data-cursor-animate]');

    animatedElements.current.clear();
    elements.forEach((element) => {
      animatedElements.current.set(element, {
        element,
        translateX: 0,
        translateY: 0,
        rotateX: 0,
        rotateY: 0,
        targetTranslateX: 0,
        targetTranslateY: 0,
        targetRotateX: 0,
        targetRotateY: 0,
      });
    });

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animatedElements.current.forEach((state, element) => {
        element.style.transform = '';
      });
    };
  }, [animate, opts.enabled]);

  return containerRef;
}

export function useCardTilt<T extends HTMLElement>(options: {
  maxRotate?: number;
  scale?: number;
  smoothing?: number;
} = {}) {
  const cardRef = useRef<T>(null);
  const rotateState = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationFrame = useRef<number | null>(null);
  const isTouch = useRef(isTouchDevice());

  const { maxRotate = 6, scale = 1.02, smoothing = 0.1 } = options;

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
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      rotateState.current.targetX = 0;
      rotateState.current.targetY = 0;
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
  }, [maxRotate, scale, smoothing]);

  return cardRef;
}
