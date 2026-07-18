import { useMemo, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTexture;
uniform float uPhase;
uniform float uStrength;
uniform float uFrequency;
uniform vec2 uTextureSize;
uniform vec2 uPlaneSize;

varying vec2 vUv;

const float PI = 3.14159265358979323846;
const float TAU = 6.28318530717958647692;

/*
 * Плавная псевдошумовая функция.
 */
float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(
        mix(a, b, f.x),
        mix(c, d, f.x),
        f.y
    );
}

/*
 * Периодический во времени шум.
 *
 * Вместо линейного времени используются cos(phase) и sin(phase).
 * При phase = 0 и phase = 2π входы полностью совпадают,
 * поэтому первый и последний кадры математически идентичны.
 */
float loopNoise(vec2 p, float phase) {
    vec2 orbitA = vec2(cos(phase), sin(phase));
    vec2 orbitB = vec2(
        cos(phase + PI * 0.5),
        sin(phase + PI * 0.5)
    );

    float n1 = valueNoise(p + orbitA * 0.55);
    float n2 = valueNoise(p * 1.73 - orbitB * 0.38);
    float n3 = valueNoise(p * 3.11 + orbitA * 0.17);

    return n1 * 0.55 + n2 * 0.30 + n3 * 0.15;
}

vec2 containUv(vec2 uv, vec2 textureSize, vec2 planeSize) {
    float textureAspect = textureSize.x / textureSize.y;
    float planeAspect = planeSize.x / planeSize.y;

    vec2 result = uv;

    if (planeAspect > textureAspect) {
        float scale = textureAspect / planeAspect;
        result.y = (uv.y - 0.5) / scale + 0.5;
    } else {
        float scale = planeAspect / textureAspect;
        result.x = (uv.x - 0.5) / scale + 0.5;
    }

    return result;
}

void main() {
    vec2 uv = containUv(vUv, uTextureSize, uPlaneSize);

    /*
     * Не рисуем область за границами текстуры.
     */
    if (
        uv.x < 0.0 || uv.x > 1.0 ||
        uv.y < 0.0 || uv.y > 1.0
    ) {
        discard;
    }

    vec2 centered = uv - 0.5;

    /*
     * Коррекция пропорций предотвращает растяжение волн по X.
     */
    float aspect = uTextureSize.x / uTextureSize.y;
    vec2 p = centered;
    p.x *= aspect;

    float radialDistance = length(p);

    /*
     * Маска уменьшает деформацию возле краев текстуры.
     * Так объект не будет обрезаться плоскостью.
     */
    float edgeMask = 1.0 - smoothstep(0.30, 0.72, radialDistance);

    /*
     * Два периодических поля создают domain warping.
     */
    float noiseX = loopNoise(
        p * uFrequency + vec2(2.1, -1.7),
        uPhase
    );

    float noiseY = loopNoise(
        p * (uFrequency * 0.91) + vec2(-3.4, 2.8),
        uPhase + 1.37
    );

    vec2 flow = vec2(noiseX, noiseY) - 0.5;

    /*
     * Крупная синусоидальная деформация добавляет ощущение
     * поверхностного натяжения, а не цифрового шума.
     */
    vec2 broadFlow = vec2(
        sin(p.y * 5.0 + uPhase) +
        sin((p.x + p.y) * 3.2 - uPhase),

        cos(p.x * 4.5 - uPhase) +
        cos((p.x - p.y) * 3.0 + uPhase)
    ) * 0.5;

    /*
     * Медленное периодическое скручивание вокруг центра.
     */
    vec2 tangent = vec2(-p.y, p.x);
    float swirl =
        sin(radialDistance * 12.0 - uPhase * 2.0) *
        cos(uPhase) *
        0.25;

    vec2 displacement =
        flow * 0.65 +
        broadFlow * 0.25 +
        tangent * swirl * 0.35;

    displacement *= uStrength * edgeMask;

    /*
     * Возвращаем коррекцию aspect ratio.
     */
    displacement.x /= aspect;

    vec2 distortedUv = uv + displacement;

    if (
        distortedUv.x < 0.0 || distortedUv.x > 1.0 ||
        distortedUv.y < 0.0 || distortedUv.y > 1.0
    ) {
        discard;
    }

    vec4 color = texture2D(uTexture, distortedUv);

    /*
     * Мягкое удаление почти прозрачных пикселей уменьшает
     * темный или светлый ореол вокруг PNG.
     */
    if (color.a < 0.01) {
        discard;
    }

    gl_FragColor = color;
}
`;

const LiquidMaterial = shaderMaterial(
    {
        uTexture: null,
        uPhase: 0,
        uStrength: 0.035,
        uFrequency: 2.4,
        uTextureSize: new THREE.Vector2(1, 1),
        uPlaneSize: new THREE.Vector2(1, 1),
    },
    vertexShader,
    fragmentShader
);

extend({ LiquidMaterial });

type LiquidMaterialInstance = THREE.ShaderMaterial & {
    uTexture: THREE.Texture;
    uPhase: number;
    uStrength: number;
    uFrequency: number;
    uTextureSize: THREE.Vector2;
    uPlaneSize: THREE.Vector2;
};

declare module "@react-three/fiber" {
    interface ThreeElements {
        liquidMaterial: React.JSX.IntrinsicElements["shaderMaterial"] & {
            ref?: React.Ref<LiquidMaterialInstance>;
            uTexture?: THREE.Texture;
            uPhase?: number;
            uStrength?: number;
            uFrequency?: number;
            uTextureSize?: THREE.Vector2;
            uPlaneSize?: THREE.Vector2;
            transparent?: boolean;
            depthWrite?: boolean;
            depthTest?: boolean;
            toneMapped?: boolean;
        };
    }
}

interface LiquidImageProps {
    src: string;
    /**
     * Полная длительность бесшовного цикла в секундах.
     */
    duration?: number;

    /**
     * Интенсивность деформации.
     * Рекомендуемый диапазон: 0.015–0.06.
     */
    strength?: number;

    /**
     * Пространственная частота волн.
     */
    frequency?: number;

    /**
     * Размер плоскости в мировых единицах.
     */
    width?: number;
    height?: number;
}

export function LiquidImage({
    src,
    duration = 8,
    strength = 0.035,
    frequency = 2.4,
    width = 2,
    height = 2,
}: LiquidImageProps) {
    const materialRef = useRef<LiquidMaterialInstance>(null);
    const texture = useTexture(src);

    const textureSize = useMemo(() => {
        const image = texture.image as
            | HTMLImageElement
            | ImageBitmap
            | undefined;

        return new THREE.Vector2(
            image?.width ?? 1,
            image?.height ?? 1
        );
    }, [texture]);

    const planeSize = useMemo(
        () => new THREE.Vector2(width, height),
        [width, height]
    );

    useFrame(({ clock }) => {
        if (!materialRef.current) {
            return;
        }

        /*
         * Нормализованная фаза строго циклична:
         *
         * 0 секунд        -> 0
         * duration секунд -> 2π, эквивалентно 0
         */
        const elapsed = clock.getElapsedTime();
        const normalizedTime =
            (elapsed % duration) / duration;

        materialRef.current.uPhase =
            normalizedTime * Math.PI * 2;
    });

    return (
        <mesh>
            <planeGeometry args={[width, height, 1, 1]} />

            <liquidMaterial
                ref={materialRef}
                uTexture={texture}
                uTextureSize={textureSize}
                uPlaneSize={planeSize}
                uStrength={strength}
                uFrequency={frequency}
                transparent
                depthWrite={false}
                depthTest={false}
                toneMapped={false}
            />
        </mesh>
    );
}