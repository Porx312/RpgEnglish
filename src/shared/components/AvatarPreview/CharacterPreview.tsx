"use client"

import { useEffect, useRef } from "react"
import HairAvatar from "./AvatarParts/HairAvatar"
import { ArmLeft } from "./AvatarParts/ArmLeft"
import { Filters } from "./AvatarParts/Filters"
import { HeadAvatar } from "./AvatarParts/HeadAvatar"
import { Body } from "./AvatarParts/Body"
import { ArmRight } from "./AvatarParts/ArmRight"
import { LegRight } from "./AvatarParts/LegRight"
import { LegLeft } from "./AvatarParts/LegLeft"
import type { CharacterAnimationsProps } from "@/shared/interface/AnimationType.interface"
import { useCharacterAnimations } from "./hooks/useAnimation"

export function CharacterPreview({
  skinColor,
  eyeColor,
  hairColor,
  hairSvg,
  outfitSvg,
  weaponSvg,
  animation = "idle",
  className,
  accesorysvg,
}: CharacterAnimationsProps) {
  const containerRef = useRef<SVGSVGElement>(null)
  const { playAnimation } = useCharacterAnimations(containerRef)

  useEffect(() => {
    playAnimation(animation)
  }, [animation, playAnimation])

  return (
    <svg
      ref={containerRef}
      width="280"
      height="350"
      viewBox="0 0 790 974"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || "w-full h-full"}
    >
      {/* Left Leg and Boot */}
      <g data-part="leg-left">
        <LegLeft />
      </g>

      {/* Right Leg and Boot */}
      <g data-part="leg-right">
        <LegRight />
      </g>

      {/* Right Arm Details */}

      <ArmRight skinColor={skinColor} />


      {/* Torso/Body - Outfit Layer */}
      <g data-part="body">{outfitSvg ? <g dangerouslySetInnerHTML={{ __html: outfitSvg }} /> : <Body />}</g>

      {/* Head/Face */}
      <g data-part="head">
        <HeadAvatar skinColor={skinColor} />

        {/* Eyes */}
        <path
          d="M560.198 392.811C560.198 423.186 543.185 447.811 522.198 447.811C501.211 447.811 484.198 423.186 484.198 392.811C484.198 362.435 501.211 337.811 522.198 337.811C543.185 337.811 560.198 362.435 560.198 392.811Z"
          fill={eyeColor}
        />
        <path
          d="M675.698 392.811C675.698 423.186 660.698 443.312 648.698 443.312C634.198 443.312 620.198 423.186 620.198 392.811C620.198 362.435 633.198 342.812 648.698 341.312C660.698 341.312 675.698 362.435 675.698 392.811Z"
          fill={eyeColor}
        />

        {/* Hair */}
        {hairSvg ? (
          <g dangerouslySetInnerHTML={{ __html: hairSvg }} fill={hairColor} strokeWidth="11" />
        ) : (
          <HairAvatar hairColor={hairColor} />
        )}
      </g>

      {/* Weapon Layer with attack animation */}
      {weaponSvg && <g data-part="weapon" dangerouslySetInnerHTML={{ __html: weaponSvg }} />}

      {/* Left Arm */}
      <g data-part="arm-left">
        <ArmLeft skinColor={skinColor} />
      </g>

      {/* Accessory */}
      {accesorysvg && <g data-part="accessory" dangerouslySetInnerHTML={{ __html: accesorysvg }} />}

      <Filters />
    </svg>
  )
}

