import React, { forwardRef, useImperativeHandle, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BottomSheetHandle } from './BottomSheetHandle';
import { BottomSheetContent } from './BottomSheetContent';
import { BottomSheetProps, BottomSheetRef, SnapPoint } from './types';

const SNAP_POINTS = {
  closed: 0.02, // Very small so it's almost closed but visible
  half: 0.5,
  full: 0.85
};

const VELOCITY_THRESHOLD = 0.5; // pixels per ms
const SNAP_THRESHOLD = 0.15; // 15% of screen height

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, initialSnap = 'closed', onSnapChange, className }, ref) => {
    const [currentSnap, setCurrentSnap] = useState<SnapPoint>(initialSnap);
    const [height, setHeight] = useState(SNAP_POINTS[initialSnap]);
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const startY = useRef(0);
    const startHeight = useRef(0);
    const lastY = useRef(0);
    const startTime = useRef(0);
    const dragActive = useRef(false);

    const snapTo = useCallback((snap: SnapPoint) => {
      if (currentSnap === snap) return;
      
      setIsAnimating(true);
      setHeight(SNAP_POINTS[snap]);
      setCurrentSnap(snap);
      onSnapChange?.(snap);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, [currentSnap, onSnapChange]);

    const getClosestSnapPoint = useCallback((currentHeight: number, velocity: number = 0): SnapPoint => {
      // If velocity is high, snap in direction of velocity
      if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
        if (velocity > 0) {
          // Dragging up - go to next higher snap point
          if (currentHeight < SNAP_POINTS.half - SNAP_THRESHOLD) return 'half';
          if (currentHeight < SNAP_POINTS.full - SNAP_THRESHOLD) return 'full';
          return 'full';
        } else {
          // Dragging down - go to next lower snap point
          if (currentHeight > SNAP_POINTS.half + SNAP_THRESHOLD) return 'half';
          if (currentHeight > SNAP_POINTS.closed + SNAP_THRESHOLD) return 'closed';
          return 'closed';
        }
      }

      // Otherwise, snap to closest point
      const distances = Object.entries(SNAP_POINTS).map(([snap, snapHeight]) => ({
        snap: snap as SnapPoint,
        distance: Math.abs(currentHeight - snapHeight)
      }));
      
      distances.sort((a, b) => a.distance - b.distance);
      return distances[0].snap;
    }, []);

    const handleMove = useCallback((clientY: number) => {
      if (!dragActive.current) return;

      const containerHeight = window.innerHeight;
      const deltaY = startY.current - clientY;
      const deltaHeight = deltaY / containerHeight;
      const newHeight = Math.max(0, Math.min(0.9, startHeight.current + deltaHeight));
      
      setHeight(newHeight);
      lastY.current = clientY;
    }, []);

    const handleEnd = useCallback(() => {
      if (!dragActive.current) return;
      
      dragActive.current = false;
      setIsDragging(false);
      
      // Calculate velocity
      const now = Date.now();
      const timeDelta = now - startTime.current;
      const yDelta = startY.current - lastY.current;
      const velocity = timeDelta > 0 ? yDelta / timeDelta : 0;
      
      const closestSnap = getClosestSnapPoint(height, velocity);
      snapTo(closestSnap);
    }, [height, getClosestSnapPoint, snapTo]);

    // Mouse handlers
    const handleMouseMove = useCallback((e: MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientY);
    }, [handleMove]);

    const handleMouseUp = useCallback((e: MouseEvent) => {
      e.preventDefault();
      handleEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }, [handleEnd, handleMouseMove]);

    // Touch handlers
    const handleTouchMove = useCallback((e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientY);
      }
    }, [handleMove]);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
      e.preventDefault();
      handleEnd();
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }, [handleEnd, handleTouchMove]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      dragActive.current = true;
      setIsDragging(true);
      setIsAnimating(false);
      startY.current = e.clientY;
      startHeight.current = height;
      lastY.current = e.clientY;
      startTime.current = Date.now();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }, [height, handleMouseMove, handleMouseUp]);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (e.touches.length > 0) {
        dragActive.current = true;
        setIsDragging(true);
        setIsAnimating(false);
        startY.current = e.touches[0].clientY;
        startHeight.current = height;
        lastY.current = e.touches[0].clientY;
        startTime.current = Date.now();

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
      }
    }, [height, handleTouchMove, handleTouchEnd]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }, []);

    useImperativeHandle(ref, () => ({
      snapTo,
      getCurrentSnap: () => currentSnap
    }), [snapTo, currentSnap]);

    return (
      <>
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-40",
            height > 0.05 ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => snapTo('closed')}
        />
       
        {/* Bottom Sheet */}
        <div
          ref={containerRef}
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col",
            isDragging ? "transition-none" : "transition-all duration-300 ease-out",
            className
          )}
          style={{
            height: `${Math.max(height * 100, 5)}%`, // Always at least 5% height for handle
            minHeight: '40px', // Always show at least the handle
            willChange: isDragging ? 'height' : 'auto'
          }}
        >
          <BottomSheetHandle
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            isDragging={isDragging}
          />
          {/* Only render content if not fully closed */}
          {height > 0.07 && (
            <BottomSheetContent>
              {children}
            </BottomSheetContent>
          )}
        </div>
      </>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';