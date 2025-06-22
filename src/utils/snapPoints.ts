
import { SNAP_POINTS, VELOCITY_THRESHOLD } from './constants';

export type SnapPoint = 'closed' | 'half' | 'full';

export const getSnapPointValue = (snapPoint: SnapPoint): number => {
  switch (snapPoint) {
    case 'closed':
      return SNAP_POINTS.CLOSED;
    case 'half':
      return SNAP_POINTS.HALF;
    case 'full':
      return SNAP_POINTS.FULL;
    default:
      return SNAP_POINTS.CLOSED;
  }
};

export const getNearestSnapPoint = (
  position: number,
  velocity: number
): SnapPoint => {
  const snapValues = Object.values(SNAP_POINTS);
  
  // If moving fast, consider velocity direction
  if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
    if (velocity > 0) {
      // Moving up, go to next higher snap point
      const higher = snapValues.find(val => val > position);
      if (higher === SNAP_POINTS.HALF) return 'half';
      if (higher === SNAP_POINTS.FULL) return 'full';
    } else {
      // Moving down, go to next lower snap point
      const lower = [...snapValues].reverse().find(val => val < position);
      if (lower === SNAP_POINTS.HALF) return 'half';
      if (lower === SNAP_POINTS.CLOSED) return 'closed';
    }
  }
  
  // Find closest snap point by distance
  let closest: SnapPoint = 'closed';
  let minDistance = Math.abs(position - SNAP_POINTS.CLOSED);
  
  if (Math.abs(position - SNAP_POINTS.HALF) < minDistance) {
    closest = 'half';
    minDistance = Math.abs(position - SNAP_POINTS.HALF);
  }
  
  if (Math.abs(position - SNAP_POINTS.FULL) < minDistance) {
    closest = 'full';
  }
  
  return closest;
};
