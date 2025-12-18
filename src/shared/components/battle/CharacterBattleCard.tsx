import type React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HealthBar } from "../adventure/HpBar";

interface CharacterBattleCardProps {
    name: string;
    hp: number; // asumimos 0-100
    children: React.ReactNode;
    isEnemy?: boolean;
}

export const CharacterBattleCard = ({
    name,
    hp,
    children,
    isEnemy,
}: CharacterBattleCardProps) => {
    const barRef = useRef<HTMLDivElement>(null);

    // Convertimos hp a ratio 0-1
    const hpRatio = Math.max(0, Math.min(1, hp / 100));

    useEffect(() => {
        if (!barRef.current) return;

        gsap.to(barRef.current, {
            scaleX: hpRatio,
            duration: 0.6,
            ease: "power2.out",
            transformOrigin: "left center",
        });
    }, [hpRatio]);

    return (
        <div className="flex flex-col items-center justify-end relative">
            {/* HP Bar */}
            <div ref={barRef} className="w-48 h-3 overflow-hidden">
                <HealthBar hp={100} /> {/* siempre renderizamos la barra llena, GSAP hace el scale */}
            </div>

            {/* Character */}
            <div className={`flex justify-center items-end ${isEnemy ? "scale-x-[-1]" : ""}`}>
                {children}
            </div>
        </div>
    );
};
