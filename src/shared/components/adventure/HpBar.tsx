import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import HpSvg from "@/shared/lib/svgAssets/HpSvg";

interface HealthBarProps {
    hp: number; // 0-100
}

export const HealthBar = ({ hp }: HealthBarProps) => {
    const greenBarRef = useRef<SVGRectElement | null>(null);

    useEffect(() => {
        if (!greenBarRef.current) return;

        const fullWidth = 206.127; // ancho original del rect verde en el SVG

        gsap.to(greenBarRef.current, {
            attr: { width: (hp / 100) * fullWidth },
            duration: 0.6,
            ease: "power2.out",
        });
    }, [hp]);

    return (
        <div className="w-48 h-3 overflow-hidden">
            <HpSvg
                className="w-full h-full"
                ref={(svg) => {
                    if (!svg) return;
                    const greenRect = svg.querySelectorAll("rect")[1];
                    if (greenRect) greenBarRef.current = greenRect as SVGRectElement;
                }}
            />
        </div>
    );
};
