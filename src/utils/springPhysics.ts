
import { SPRING_CONFIG } from './constants';

export interface SpringState {
  position: number;
  velocity: number;
  target: number;
}

export class SpringPhysics {
  private stiffness: number;
  private damping: number;
  private mass: number;
  private precision: number;

  constructor(config = SPRING_CONFIG) {
    this.stiffness = config.stiffness;
    this.damping = config.damping;
    this.mass = config.mass;
    this.precision = config.precision;
  }

  step(state: SpringState, deltaTime: number): SpringState {
    const { position, velocity, target } = state;
    
    // Spring force calculation: F = -kx - bv
    const displacement = position - target;
    const springForce = -this.stiffness * displacement;
    const dampingForce = -this.damping * velocity;
    
    const acceleration = (springForce + dampingForce) / this.mass;
    
    const newVelocity = velocity + acceleration * deltaTime;
    const newPosition = position + newVelocity * deltaTime;
    
    return {
      position: newPosition,
      velocity: newVelocity,
      target
    };
  }

  isAtRest(state: SpringState): boolean {
    const { position, velocity, target } = state;
    return Math.abs(position - target) < this.precision && 
           Math.abs(velocity) < this.precision;
  }
}
