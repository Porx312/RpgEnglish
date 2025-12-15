"use client"

import HairAvatar from "./AvatarParts/HairAvatar"
import { Filters } from "./AvatarParts/Filters"
import { HeadAvatar } from "./AvatarParts/HeadAvatar"
import type { CharacterAnimationsProps } from "@/shared/interface/AnimationType.interface"

export function ProfilePreview({
  skinColor,
  eyeColor,
  hairColor,
  hairSvg,
  className,
  accesorysvg,
}: CharacterAnimationsProps) {

  return (
    <svg
      width="280"
      height="350"
      viewBox="0 0 790 974"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || "w-full h-full"}
    >
      {/* Left Leg and Boot */}


      {/* Right Leg and Boot */}


      {/* Right Arm Details */}



      {/* Torso/Body - Outfit Layer */}

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


      {/* Left Arm */}


      {/* Accessory */}
      {accesorysvg && <g data-part="accessory" dangerouslySetInnerHTML={{ __html: accesorysvg }} />}

      <Filters />
    </svg>
  )
}

