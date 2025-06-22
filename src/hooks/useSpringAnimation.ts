
import { useState, useRef, useCallback, useEffect } from 'react';
import { SpringPhysics, SpringState } from '../utils/springPhysics';

export const useSpringAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const springRef = useRef(new SpringPhysics());
  const stateRef = useRef<SpringState>({ position: 0.1, velocity: 0, target: 0.1 });
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const onUpdateRef = useRef<(position: number) => void>();

  const animate = useCallback(() => {
    const now = performance.now();
    const deltaTime = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0;
    lastTimeRef.current = now;

    if (deltaTime > 0) {
      const newState = springRef.current.step(stateRef.current, deltaTime);
      stateRef.current = newState;
      
      onUpdateRef.current?.(newState.position);

      if (springRef.current.isAtRest(newState)) {
        setIsAnimating(false);
        return;
      }
    }

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  const startAnimation = useCallback((target: number, onUpdate: (position: number) => void) => {
    onUpdateRef.current = onUpdate;
    stateRef.current.target = target;
    
    if (!isAnimating) {
      setIsAnimating(true);
      lastTimeRef.current = performance.now();
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [animate, isAnimating]);

  const setPosition = useCallback((position: number) => {
    stateRef.current.position = position;
  }, []);

  const setVelocity = useCallback((velocity: number) => {
    stateRef.current.velocity = velocity;
  }, []);

  const getCurrentPosition = useCallback(() => stateRef.current.position, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    startAnimation,
    setPosition,
    setVelocity,
    getCurrentPosition,
    isAnimating
  };
};
