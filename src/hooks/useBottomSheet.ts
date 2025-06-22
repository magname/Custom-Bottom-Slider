
import { useState, useCallback, useEffect, useRef } from 'react';
import { useSpringAnimation } from './useSpringAnimation';
import { useGestures } from './useGestures';
import { SnapPoint, getSnapPointValue, getNearestSnapPoint } from '../utils/snapPoints';

export const useBottomSheet = (
  initialSnap: SnapPoint = 'closed',
  onSnapChange?: (snap: SnapPoint) => void
) => {
  const [currentSnap, setCurrentSnap] = useState<SnapPoint>(initialSnap);
  const [height, setHeight] = useState(getSnapPointValue(initialSnap));
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  
  const {
    startAnimation,
    setPosition,
    setVelocity,
    getCurrentPosition,
    isAnimating
  } = useSpringAnimation();

  const updateHeight = useCallback((position: number) => {
    const clampedPosition = Math.max(0.05, Math.min(0.95, position));
    setHeight(clampedPosition);
  }, []);

  const snapTo = useCallback((snap: SnapPoint) => {
    const targetValue = getSnapPointValue(snap);
    setCurrentSnap(snap);
    onSnapChange?.(snap);
    startAnimation(targetValue, updateHeight);
  }, [startAnimation, updateHeight, onSnapChange]);

  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
    console.log('Drag started');
  }, []);

  const handleDragMove = useCallback((deltaY: number) => {
    if (!containerRef.current || !isDraggingRef.current) return;
    
    const viewportHeight = window.innerHeight;
    const deltaRatio = -deltaY / viewportHeight;
    const currentPos = getCurrentPosition();
    const newPosition = Math.max(0.05, Math.min(0.95, currentPos + deltaRatio));
    
    setPosition(newPosition);
    updateHeight(newPosition);
    console.log('Drag move:', deltaY, newPosition);
  }, [getCurrentPosition, setPosition, updateHeight]);

  const handleDragEnd = useCallback((velocity: number) => {
    isDraggingRef.current = false;
    const currentPosition = getCurrentPosition();
    const nearestSnap = getNearestSnapPoint(currentPosition, -velocity);
    
    setVelocity(-velocity);
    snapTo(nearestSnap);
    console.log('Drag ended:', velocity, nearestSnap);
  }, [getCurrentPosition, setVelocity, snapTo]);

  const {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useGestures(handleDragStart, handleDragMove, handleDragEnd);

  // Set up global event listeners for drag
  useEffect(() => {
    if (isDragging()) {
      const handleMouseMoveGlobal = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleMouseMove(e);
      };

      const handleMouseUpGlobal = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleMouseUp(e);
      };

      const handleTouchMoveGlobal = (e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleTouchMove(e);
      };

      const handleTouchEndGlobal = (e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleTouchEnd(e);
      };

      document.addEventListener('mousemove', handleMouseMoveGlobal, { passive: false });
      document.addEventListener('mouseup', handleMouseUpGlobal, { passive: false });
      document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
      document.addEventListener('touchend', handleTouchEndGlobal, { passive: false });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMoveGlobal);
        document.removeEventListener('mouseup', handleMouseUpGlobal);
        document.removeEventListener('touchmove', handleTouchMoveGlobal);
        document.removeEventListener('touchend', handleTouchEndGlobal);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    console.log('Mouse down on handle');
    handleMouseDown(e, getCurrentPosition());
  }, [handleMouseDown, getCurrentPosition]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    console.log('Touch start on handle');
    handleTouchStart(e, getCurrentPosition());
  }, [handleTouchStart, getCurrentPosition]);

  return {
    height,
    currentSnap,
    snapTo,
    onMouseDown,
    onTouchStart,
    isDragging: isDragging(),
    isAnimating,
    containerRef
  };
};
