"use client"

import { CharacterPreview } from "@/shared/components/AvatarPreview/CharacterPreview"
import { useCharacter } from "@/shared/hooks/use-character"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Dashboard() {
  const router = useRouter()
  const { character, items, isLoading, equippedItems } = useCharacter()
  const [currentAnimation, setCurrentAnimation] = useState<"idle" | "attack" | "hurt">("idle")

  if (character === null) {
    router.push("/character-creation")
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/images/figma2.png')] bg-cover bg-center">
        <p className="text-white text-xl font-bold">Loading Dashboard...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      <div className="relative z-10 flex flex-wrap items-center justify-evenly mt-24 px-2">
        <div className="mb-24 scale-150">
          <CharacterPreview
            skinColor={character?.skinColor || "#D4A574"}
            eyeColor={character?.eyeColor || "#000000"}
            hairColor={character?.hairColor || "#8B4513"}
            hairSvg={equippedItems.hairItem?.svgData}
            outfitSvg={equippedItems.outfitItem?.svgData}
            weaponSvg={equippedItems.weaponItem?.svgData}
            animation={currentAnimation}
            accesorysvg={equippedItems.accessoryItem?.svgData}
          />
        </div>
      </div>
    </div>
  )
}
