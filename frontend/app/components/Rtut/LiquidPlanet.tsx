import { Canvas } from "@react-three/fiber";
import { LiquidImage } from "./LiquidImage";
import rtut from "../../assets/images/rtut.png";
import "./LiquidPlanet.css";

interface ImageProps {
    src?: string;
    className?: string;
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

export function LiquidPlanet({
    src,
    className = "",
    duration = 7,
    strength = 0.055,
    frequency = 2.6,
    width = 3.2,
    height = 3.2,
} : ImageProps) {
    return (
        <div className={["liquidPlanet", className].filter(Boolean).join(" ")}>
            <Canvas
                orthographic
                camera={{
                    position: [0, 0, 15],
                    zoom: 200,
                }}
                gl={{
                    alpha: true,
                    antialias: true,
                    premultipliedAlpha: true,
                }}
                dpr={[1, 2]}
            >
                <LiquidImage
                    src={src ? src : rtut}
                    duration={duration}
                    strength={strength}
                    frequency={frequency}
                    width={width}
                    height={height}
                />
            </Canvas>
        </div>
    );
}
