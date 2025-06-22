
export const SNAP_POINTS = {
  CLOSED: 0.1, // 10% of screen height
  HALF: 0.5,   // 50% of screen height  
  FULL: 0.9    // 90% of screen height
} as const;

export const SPRING_CONFIG = {
  stiffness: 300,
  damping: 30,
  mass: 1,
  precision: 0.01
} as const;

export const ANIMATION_DURATION = 300;
export const DRAG_THRESHOLD = 50;
export const VELOCITY_THRESHOLD = 0.5;
