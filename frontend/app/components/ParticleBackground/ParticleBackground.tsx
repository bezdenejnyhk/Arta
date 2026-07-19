import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import styles from "./ParticleBackground.module.scss";

const PARTICLE_COUNT = 40_000;

const vertexShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uScroll;
uniform float uAspect;
uniform float uPixelRatio;

attribute float aIndex;
attribute vec3 aRandom;

varying float vOpacity;

const float PI = 3.14159265358979323846;
const float TAU = 6.28318530717958647692;

mat3 rotateX(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, -s,
    0.0, s, c
  );
}

mat3 rotateY(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
}

mat3 rotateZ(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(
    c, -s, 0.0,
    s, c, 0.0,
    0.0, 0.0, 1.0
  );
}

float hash11(float value) {
  return fract(sin(value * 127.1) * 43758.5453123);
}

vec3 flowingRibbons() {
  float ribbonCount = 11.0;
  float ribbon = floor(aIndex * ribbonCount);
  float progress = fract(aIndex * ribbonCount);
  float path = (progress - 0.5) * 7.6;
  float phase = ribbon * 0.67;

  vec3 point = vec3(
    path + sin(path * 1.35 + phase) * 0.42,
    sin(path * 0.64 + phase) * 1.52 + cos(path * 1.19 - phase) * 0.28,
    cos(path * 0.58 + phase) * 1.34 + sin(path * 1.47 + phase) * 0.24
  );

  point += (aRandom - 0.5) * vec3(0.13, 0.2, 0.2);
  return rotateZ(-0.16) * point;
}

vec3 orbitKnot() {
  float angle = aIndex * TAU * 8.0;
  float radius = 1.82 + 0.68 * cos(angle * 3.0);

  vec3 point = vec3(
    radius * cos(angle * 2.0),
    radius * sin(angle * 2.0),
    0.76 * sin(angle * 3.0)
  );

  float haloAngle = aRandom.x * TAU;
  float haloRadius = (aRandom.y - 0.5) * 0.34;
  point += vec3(
    cos(haloAngle) * haloRadius,
    sin(haloAngle) * haloRadius,
    (aRandom.z - 0.5) * 0.28
  );

  return rotateX(0.58) * point;
}

/*
vec3 orbitalVeil() {
  float strandCount = 7.0;
  float strand = floor(aIndex * strandCount);
  float progress = fract(aIndex * strandCount);
  float angle = (progress - 0.5) * TAU * 1.65 + strand * 0.31;
  float wave = 2.15 + 0.78 * sin(angle * 2.0 + strand);

  vec3 point = vec3(
    wave * cos(angle),
    1.74 * sin(angle * 1.47 + strand * 0.46),
    wave * sin(angle) * 0.72 + cos(angle * 2.3) * 0.42
  );

  point += (aRandom - 0.5) * vec3(0.18, 0.16, 0.18);
  return rotateZ(0.2) * point;
}
*/

vec3 galaxyDisk() {
  float group = aRandom.x;
  float randomA = hash11(aIndex * 1931.17 + 0.31);
  float randomB = hash11(aIndex * 3187.73 + 1.79);
  float angle = 0.0;
  float radius = 0.0;
  float height = 0.0;
  vec3 point;

  if (group < 0.34) {
    // Dense central bulge.
    radius = pow(aRandom.y, 1.72) * 1.28;
    angle = aRandom.z * TAU + radius * 3.7;
    height = (randomA - 0.5) * (0.82 - radius * 0.52);
    point = vec3(cos(angle) * radius, sin(angle) * radius, height);
  } else if (group < 0.68) {
    // Bright inner ring.
    angle = aRandom.y * TAU;
    radius = 1.5 + (aRandom.z - 0.5) * 0.22 + (randomA - 0.5) * 0.08;
    height = (randomB - 0.5) * 0.18;
    point = vec3(cos(angle) * radius, sin(angle) * radius, height);
  } else if (group < 0.86) {
    // Thin outer ring.
    angle = aRandom.y * TAU;
    radius = 2.72 + (aRandom.z - 0.5) * 0.2;
    height = (randomA - 0.5) * 0.14;
    point = vec3(cos(angle) * radius, sin(angle) * radius, height);
  } else if (group < 0.97) {
    // Loose spiral arms connect both rings.
    float arm = floor(aRandom.y * 3.0);
    radius = 0.72 + pow(aRandom.z, 0.72) * 2.45;
    angle = radius * 2.42 + arm * TAU / 3.0 + (randomA - 0.5) * 0.62;
    height = (randomB - 0.5) * (0.38 - radius * 0.07);
    point = vec3(cos(angle) * radius, sin(angle) * radius, height);
  } else {
    // Sparse particles outside the main disk.
    radius = 2.95 + pow(aRandom.y, 1.6) * 1.18;
    angle = aRandom.z * TAU;
    height = (randomA - 0.5) * 0.86;
    point = vec3(cos(angle) * radius, sin(angle) * radius, height);
  }

  point = rotateX(1.0) * point;
  return rotateZ(-0.08) * point;
}

void main() {
  vec3 ribbons = galaxyDisk();
  vec3 knot = orbitKnot();
  vec3 galaxy = flowingRibbons();

  float firstMorph = smoothstep(0.17, 0.42, uScroll);
  float secondMorph = smoothstep(0.56, 0.82, uScroll);
  vec3 point = mix(ribbons, knot, firstMorph);
  point = mix(point, galaxy, secondMorph);

  float pulse = sin(uTime * 0.18 + aRandom.x * TAU) * 0.035;
  point += normalize(point + vec3(0.001)) * pulse;

  vec3 freeRotation = rotateY(uTime * 0.055 + uScroll * 1.08) * point;
  freeRotation = rotateX(sin(uTime * 0.075) * 0.18 + uScroll * 0.28) * freeRotation;

  // Keep the final disk at the requested three-quarter angle.
  vec3 galaxyRotation = rotateZ(uTime * 0.018 + uScroll * 0.22) * point;
  point = mix(freeRotation, galaxyRotation, secondMorph);

  float wideScale = mix(1.0, max(1.0, uAspect * 0.76), 0.72);
  point.x *= wideScale;

  vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  float perspectiveSize = 8.2 / max(1.0, -viewPosition.z);
  gl_PointSize = (1.0 + aRandom.z * 1.35) * uPixelRatio * perspectiveSize;

  float depthFade = 1.0 - smoothstep(1.1, 3.8, abs(point.z));
  float edgeVariation = 0.42 + aRandom.y * 0.58;
  float galaxyBrightness = aRandom.x < 0.34 ? 1.24 : (aRandom.x < 0.68 ? 1.16 : 0.78);
  vOpacity = (0.2 + depthFade * 0.38) * edgeVariation;
  vOpacity *= mix(1.0, galaxyBrightness, secondMorph);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

varying float vOpacity;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  if (distanceToCenter > 0.5) {
    discard;
  }

  float softEdge = 1.0 - smoothstep(0.18, 0.5, distanceToCenter);
  gl_FragColor = vec4(vec3(1.0), vOpacity * softEdge);
}
`;

function seededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function ParticleField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const reducedMotionRef = useRef(false);
  const smoothScrollRef = useRef(0);
  const { size, gl } = useThree();

  const attributes = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const indices = new Float32Array(PARTICLE_COUNT);
    const randoms = new Float32Array(PARTICLE_COUNT * 3);
    const random = seededRandom(731_947);

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      indices[index] = index / (PARTICLE_COUNT - 1);
      randoms[index * 3] = random();
      randoms[index * 3 + 1] = random();
      randoms[index * 3 + 2] = random();
    }

    return { positions, indices, randoms };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uAspect: { value: 1 },
      uPixelRatio: { value: 1 },
    }),
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useFrame(({ clock }, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const scrollRange = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    const targetScroll = THREE.MathUtils.clamp(window.scrollY / scrollRange, 0, 1);
    smoothScrollRef.current = THREE.MathUtils.damp(
      smoothScrollRef.current,
      targetScroll,
      3.2,
      delta,
    );

    material.uniforms.uTime.value = reducedMotionRef.current ? 0 : clock.elapsedTime;
    material.uniforms.uScroll.value = smoothScrollRef.current;
    material.uniforms.uAspect.value = size.width / Math.max(size.height, 1);
    material.uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 1.5);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attributes.positions, 3]} />
        <bufferAttribute attach="attributes-aIndex" args={[attributes.indices, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[attributes.randoms, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

export function ParticleBackground() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0, 8], fov: 33, near: 0.1, far: 40 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
