import type { Object3D } from 'three';

export interface PhysXConfig {
  jsPath: string;
  wasmPath: string;
  tps?: number;
}

export enum PhysXModelShapes {
  Sphere,
  Plane,
  // Capsule,
  Box,
  ConvexMesh,
  TriangleMesh,
  HeightField,
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Quat {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface PhysXBodyTransform {
  translation: Vec3;
  rotation: Quat;
  scale: Vec3;
}

export interface PhysXBodyData {
  translation: Vec3;
  rotation: Quat;
  scale: Vec3;
  linearVelocity?: Vec3;
  angularVelocity?: Vec3;
}

export enum PhysXBodyType {
  STATIC,
  DYNAMIC,
  KINEMATIC,
}

export interface PhysXShapeConfig {
  id: number;
  shape: PhysXModelShapes;
  transform: PhysXBodyTransform;
  config: ShapeConfig;
  options?: {
    vertices?: number[];
    indices?: number[];
    boxExtents?: Vec3;
    sphereRadius?: number;
  };
}

export interface ShapeConfig {
  id: number;
  isTrigger?: boolean;
  collisionId?: number;
  collisionMask?: number;
  staticFriction?: number;
  dynamicFriction?: number;
  restitution?: number;
}

export interface BodyConfig {
  type?: PhysXBodyType;
  mass?: number; // todo
  linearDamping?: number;
  angularDamping?: number;
  linearVelocity?: Vec3;
  angularVelocity?: Vec3;
  transform?: PhysXBodyData;
  shapes?: ShapeConfig[]; // only use in updates, initial is set from PhysXShapeConfig
}

export interface RigidBodyProxy {
  id: number;
  transform: PhysXBodyData;
  shapes: PhysXShapeConfig[];
  options: BodyConfig;
  addEventListener?: any;
  removeEventListener?: any;
  hasEventListener?: any;
  dispatchEvent?: any;
}

export interface PhysXUserData {
  type: PhysXBodyType;
  bodyData: PhysXBodyData;
  id: number;
}

export interface Object3DBody extends Object3D {
  body: RigidBodyProxy;
}

export enum PhysXEvents {
  COLLISION_START = 'COLLISION_START',
  COLLISION_PERSIST = 'COLLISION_PERSIST',
  COLLISION_END = 'COLLISION_END',

  TRIGGER_START = 'TRIGGER_START',
  TRIGGER_END = 'TRIGGER_END',
}
