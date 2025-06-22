
import { useRef, useCallback } from 'react';

interface GestureState {
  isDragging: boolean;
  startY: number;
  startPosition: number;
  lastY: number;
  lastTime: number;
  velocity: number;
}

export const useGestures = (
  onDragStart: () => void,
  onDragMove: (deltaY: number) => void,
  onDragEnd: (velocity: number) => void
) => {
  const gestureRef = useRef<GestureState>({
    isDragging: false,
    startY: 0,
    startPosition: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0
  });

  const handleStart = useCallback((clientY: number, currentPosition: number) => {
    console.log('Gesture start:', clientY, currentPosition);
    const now = performance.now();
    gestureRef.current = {
      isDragging: true,
      startY: clientY,
      startPosition: currentPosition,
      lastY: clientY,
      lastTime: now,
      velocity: 0
    };
    onDragStart();
  }, [onDragStart]);

  const handleMove = useCallback((clientY: number) => {
    const gesture = gestureRef.current;
    if (!gesture.isDragging) return;

    console.log('Gesture move:', clientY);
    
    const now = performance.now();
    const deltaY = clientY - gesture.startY;
    const timeDelta = now - gesture.lastTime;
    
    if (timeDelta > 0) {
      const velocityDelta = (clientY - gesture.lastY) / timeDelta;
      gesture.velocity = velocityDelta * 0.3 + gesture.velocity * 0.7; // More responsive velocity
    }
    
    gesture.lastY = clientY;
    gesture.lastTime = now;
    
    onDragMove(deltaY);
  }, [onDragMove]);

  const handleEnd = useCallback(() => {
    const gesture = gestureRef.current;
    if (!gesture.isDragging) return;
    
    console.log('Gesture end with velocity:', gesture.velocity);
    gesture.isDragging = false;
    onDragEnd(gesture.velocity);
  }, [onDragEnd]);

  const handleMouseDown = useCallback((e: React.MouseEvent, currentPosition: number) => {
    console.log('Mouse down handler called');
    e.preventDefault();
    e.stopPropagation();
    handleStart(e.clientY, currentPosition);
  }, [handleStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleMove(e.clientY);
  }, [handleMove]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEnd();
  }, [handleEnd]);

  const handleTouchStart = useCallback((e: React.TouchEvent, currentPosition: number) => {
    if (e.touches.length === 1) {
      console.log('Touch start handler called');
      e.preventDefault();
      e.stopPropagation();
      handleStart(e.touches[0].clientY, currentPosition);
    }
  }, [handleStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      e.stopPropagation();
      handleMove(e.touches[0].clientY);
    }
  }, [handleMove]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEnd();
  }, [handleEnd]);

  return {
    isDragging: () => gestureRef.current.isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
