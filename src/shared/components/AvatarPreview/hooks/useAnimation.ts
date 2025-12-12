"use client"

import type React from "react"

import { useCallback } from "react"
import { gsap } from "gsap"

export function useCharacterAnimations(containerRef: React.RefObject<SVGSVGElement>) {
    // This allows animations to work with any SVG structure, including those from database

    const playIdleAnimation = useCallback(() => {
        if (!containerRef.current) return null

        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 3 })

        // Respiración suave del cuerpo
        const body = containerRef.current.querySelector('[data-part="body"]')
        if (body) {
            timeline.to(body, {
                y: -5,
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            })
        }

        // Parpadeo de ojos
        const eyes = containerRef.current.querySelector('[data-part="eyes"]')
        if (eyes) {
            gsap.to(eyes, {
                scaleY: 0.1,
                duration: 0.1,
                repeat: -1,
                repeatDelay: 4,
                yoyo: true,
            })
        }

        return timeline
    }, [containerRef])
    const playAttackAnimation = useCallback(() => {
        if (!containerRef.current) return null;

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        const armLeft1 = containerRef.current.querySelector('[data-part="arm-left-1"]');
        const armLeft = containerRef.current.querySelector('[data-part="arm-left-1"]');
        const armLeft2 = containerRef.current.querySelector('[data-part="arm-left-2"]');
        const armLeft3 = containerRef.current.querySelector('[data-part="arm-left-3"]');
        const weapon = containerRef.current.querySelector('[data-part="weapon"]');
        const body = containerRef.current.querySelector('[data-part="body"]');
        const legLeft = containerRef.current.querySelector('[data-part="leg-left"]');
        const legRight = containerRef.current.querySelector('[data-part="leg-right"]');

        // === 1) Anticipación (preparar golpe) ===
        tl.to(
            armLeft3,
            {
                duration: 0.10,
                translateX: 10,
                rotation: -15,
                translateY: 30,
                ease: "sine.out",
                transformOrigin: "top left",
            },
        );

        tl.to(armLeft2, {
            duration: 0.10,
            rotation: -20,
            translateY: 50,
            translateX: 15,
            ease: "sine.out",
            transformOrigin: "top left",
        },
            "<"
        );


        tl.to(
            armLeft1,
            {
                duration: 0.10,
                translateX: 50,
                rotation: -12,
                translateY: 35,
                ease: "sine.out",
                transformOrigin: "top left",
            },
            "<"
        );
        tl.to(
            weapon,
            {
                duration: 0.10,
                translateX: 50,
                rotation: -15,
                translateY: 34,
                ease: "sine.out",
                transformOrigin: "top left",
            },
            "<"
        );
        tl.to(armLeft2, {
            duration: 0.10,
            rotation: -60,
            translateY: 120,
            translateX: 45,
            ease: "sine.out",
            transformOrigin: "top left",
        },
            "<"
        );
        tl.to(
            armLeft1,
            {
                duration: 0.10,
                translateX: 160,
                rotation: -62,
                translateY: 85,
                ease: "sine.out",
                transformOrigin: "top left",
            },
            "<"
        );
        tl.to(
            weapon,
            {
                duration: 0.10,
                translateX: 180,
                rotation: -25,
                translateY: 10,
                ease: "sine.out",
                transformOrigin: "top left",
            },
            "<"
        );
        tl.to(
            armLeft3,
            {
                duration: 0.10,
                translateX: 10,
                rotation: -25,
                translateY: 30,
                ease: "sine.out",
                transformOrigin: "top left",
            },
            "<"
        );
        tl.to(armLeft2, {
            duration: 0.10,
            rotation: -70,
            translateY: 120,
            translateX: 65,
            ease: "sine.out",
            transformOrigin: "top left",
        },
            "<"
        );

        tl.to(
            armLeft1,
            {
                duration: 0.10,
                translateX: 180,
                rotation: -52,
                translateY: 45,
                ease: "sine.out",
                transformOrigin: "top left",
            },
            "<"
        );
        tl.to(
            weapon,
            {
                duration: 0.10,
                translateX: 180,
                rotation: -35,
                translateY: 10,
                ease: "sine.out",
                transformOrigin: "top left",
            },
            "<"
        );

        // === 2) Golpe ===
        // Aquí podrías animar weapon o brazo extendido si quieres

        // === 3) Recovery (volver a pose neutral) ===
        // NOTA: Solo incluimos las partes que sí deben volver a rotación 0
        tl.to([armLeft2, armLeft3, armLeft1, armLeft, weapon, body, legLeft, legRight], {
            duration: 0.25,
            rotation: 0,  // armLeft1 NO se toca
            x: 0,         // armLeft1 NO se toca
            translateY: 0,
            translateX: 0,
            ease: "power3.out",
        });

        return tl;
    }, [containerRef]);



    const playHurtAnimation = useCallback(() => {
        if (!containerRef.current) return null

        const timeline = gsap.timeline()
        const container = containerRef.current
        const body = container.querySelector('[data-part="body"]')
        const head = container.querySelector('[data-part="head"]')

        // Shake violento
        timeline.to(container, {
            x: -10,
            duration: 0.05,
            ease: "none",
        })

        timeline.to(container, {
            x: 10,
            duration: 0.05,
            ease: "none",
        })

        timeline.to(container, {
            x: -8,
            duration: 0.05,
            ease: "none",
        })

        timeline.to(container, {
            x: 8,
            duration: 0.05,
            ease: "none",
        })

        // Flash rojo
        timeline.to(
            container,
            {
                filter: "brightness(1.5) saturate(2)",
                duration: 0.1,
                yoyo: true,
                repeat: 1,
            },
            0,
        )

        // Retroceso
        const bodyHead = [body, head].filter(Boolean)
        if (bodyHead.length > 0) {
            timeline.to(
                bodyHead,
                {
                    x: -15,
                    duration: 0.2,
                    ease: "power2.out",
                },
                0,
            )
        }

        // Retorno a posición normal
        timeline.to([container, ...bodyHead], {
            x: 0,
            filter: "none",
            duration: 0.3,
            ease: "power2.out",
        })

        return timeline
    }, [containerRef])

    const playHealAnimation = useCallback(() => {
        if (!containerRef.current) return null

        const timeline = gsap.timeline()
        const container = containerRef.current
        const armLeft = container.querySelector('[data-part="arm-left"]')
        const armRight = container.querySelector('[data-part="arm-right"]')

        // Brillo verde suave
        timeline.to(container, {
            filter: "brightness(1.3) hue-rotate(90deg)",
            duration: 0.5,
            ease: "sine.inOut",
        })

        // Levitación suave
        timeline.to(
            container,
            {
                y: -20,
                duration: 1,
                ease: "sine.inOut",
            },
            0,
        )

        // Brazos levantados
        const arms = [armLeft, armRight].filter(Boolean)
        if (arms.length > 0) {
            timeline.to(
                arms,
                {
                    y: -15,
                    rotation: -10,
                    duration: 1,
                    ease: "sine.inOut",
                },
                0,
            )
        }

        // Retorno a posición normal
        timeline.to(container, {
            y: 0,
            filter: "none",
            duration: 0.5,
            ease: "sine.inOut",
        })

        if (arms.length > 0) {
            timeline.to(
                arms,
                {
                    y: 0,
                    rotation: 0,
                    duration: 0.5,
                    ease: "sine.inOut",
                },
                "-=0.5",
            )
        }

        return timeline
    }, [containerRef])

    const playVictoryAnimation = useCallback(() => {
        if (!containerRef.current) return null

        const timeline = gsap.timeline()
        const container = containerRef.current
        const armLeft = container.querySelector('[data-part="arm-left"]')
        const armRight = container.querySelector('[data-part="arm-right"]')

        // Salto de alegría
        timeline.to(container, {
            y: -40,
            duration: 0.3,
            ease: "power2.out",
        })

        // Brazos arriba
        const arms = [armLeft, armRight].filter(Boolean)
        if (arms.length > 0) {
            timeline.to(
                arms,
                {
                    y: -30,
                    rotation: -20,
                    duration: 0.3,
                    ease: "power2.out",
                },
                0,
            )
        }

        // Caída
        timeline.to(container, {
            y: 0,
            duration: 0.3,
            ease: "bounce.out",
        })

        // Repetir movimiento de brazos
        if (arms.length > 0) {
            timeline.to(arms, {
                y: -20,
                duration: 0.2,
                ease: "sine.inOut",
                repeat: 2,
                yoyo: true,
            })
        }

        // Retorno
        if (arms.length > 0) {
            timeline.to(arms, {
                y: 0,
                rotation: 0,
                duration: 0.3,
                ease: "power2.inOut",
            })
        }

        return timeline
    }, [containerRef])

    const playDefendAnimation = useCallback(() => {
        if (!containerRef.current) return null

        const timeline = gsap.timeline()
        const container = containerRef.current
        const armLeft = container.querySelector('[data-part="arm-left"]')
        const armRight = container.querySelector('[data-part="arm-right"]')
        const body = container.querySelector('[data-part="body"]')

        // Posición defensiva - brazos al frente
        const arms = [armLeft, armRight].filter(Boolean)
        if (arms.length > 0) {
            timeline.to(arms, {
                x: 20,
                y: -10,
                rotation: -15,
                duration: 0.2,
                ease: "power2.out",
            })
        }

        // Cuerpo agachado
        if (body) {
            timeline.to(
                body,
                {
                    y: 10,
                    scaleY: 0.95,
                    duration: 0.2,
                    ease: "power2.out",
                },
                0,
            )
        }

        // Mantener posición
        timeline.to({}, { duration: 0.5 })

        // Retorno a posición normal
        const elements = [...arms, body].filter(Boolean)
        if (elements.length > 0) {
            timeline.to(elements, {
                x: 0,
                y: 0,
                rotation: 0,
                scaleY: 1,
                duration: 0.3,
                ease: "power2.inOut",
            })
        }

        return timeline
    }, [containerRef])

    const playAnimation = useCallback(
        (animationType: "idle" | "attack" | "hurt" | "heal" | "victory" | "defend") => {
            if (!containerRef.current) return null

            // Detener todas las animaciones previas
            gsap.killTweensOf(containerRef.current)
            gsap.killTweensOf(containerRef.current.querySelectorAll("[data-part]"))

            switch (animationType) {
                case "idle":
                    return playIdleAnimation()
                case "attack":
                    return playAttackAnimation()
                case "hurt":
                    return playHurtAnimation()
                case "heal":
                    return playHealAnimation()
                case "victory":
                    return playVictoryAnimation()
                case "defend":
                    return playDefendAnimation()
                default:
                    return null
            }
        },
        [
            containerRef,
            playIdleAnimation,
            playAttackAnimation,
            playHurtAnimation,
            playHealAnimation,
            playVictoryAnimation,
            playDefendAnimation,
        ],
    )

    return {
        playAnimation,
    }
}
