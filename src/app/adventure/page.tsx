"use client"

import { useUser } from "@clerk/nextjs"
import { useQuery, useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { api } from "../../../convex/_generated/api"
import { CharacterPreview } from "@/shared/components/AvatarPreview/CharacterPreview"
import { useCharacter } from "@/shared/hooks/use-character"

export default function WorldsPage() {
  const { user } = useUser()
  const router = useRouter()
  const { character, items, isLoading, equippedItems } = useCharacter()
  const worlds = useQuery(api.worlds.getAllWorlds)
  const seedWorlds = useMutation(api.worlds.seedWorlds)
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    if (!seeded && worlds && worlds.length === 0) {
      seedWorlds().then(() => setSeeded(true))
    }
  }, [worlds, seeded, seedWorlds])

  if (character === null) {
    router.push("/character-creation")
    return null
  }

  if (!user || character === undefined || worlds === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-amber-300 text-xl font-bold tracking-wide">Loading Adventure...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="group flex items-center gap-0 transition-all hover:scale-110"
          >
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-pink-800 rounded-2xl transform rotate-12 shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center border-4 border-pink-900 shadow-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transform -rotate-12 shadow-lg">
                    <span className="text-3xl text-pink-600 font-black">←</span>
                  </div>
                  <span className="text-white text-2xl font-black uppercase tracking-tight drop-shadow-lg">back</span>
                </div>
              </div>
            </div>
          </button>
        </div>


        {/* Worlds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {worlds.map((world: any) => (
            <WorldCard
              key={world.worldId}
              world={world}
              characterLevel={character.level}
              userId={user.id}
              onSelectWorld={(worldId) => router.push(`/adventure/${worldId}`)}
            >
              <CharacterPreview
                skinColor={character?.skinColor || "#D4A574"}
                eyeColor={character?.eyeColor || "#000000"}
                hairColor={character?.hairColor || "#8B4513"}
                hairSvg={equippedItems.hairItem?.svgData}
                outfitSvg={equippedItems.outfitItem?.svgData}
                weaponSvg={equippedItems.weaponItem?.svgData}
                accesorysvg={equippedItems.accessoryItem?.svgData}
                className="w-24 h-24"
              />
            </WorldCard>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorldCard({
  world,
  characterLevel,
  userId,
  onSelectWorld,
  children
}: {
  world: any
  characterLevel: number
  userId: string
  onSelectWorld: (worldId: string) => void,
  children: React.ReactNode
}) {

  const progress = useQuery(api.worlds.getUserProgress, { userId, worldId: world.worldId })

  interface Progress {
    completed: boolean
    levelNumber: number
  }

  const completedLevels: number[] =
    (progress as Progress[] | undefined)?.filter((p) => p.completed).map((p) => p.levelNumber) || []
  const isUnlocked = characterLevel >= world.requiredLevel

  const difficultyColors = {
    Easy: "from-green-500 to-green-600",
    Medium: "from-orange-500 to-orange-600",
    Hard: "from-gray-500 to-gray-600",
  }

  const bgGradient =
    difficultyColors[world.difficulty as keyof typeof difficultyColors] || "from-green-500 to-green-600"

  return (
    <button
      onClick={() => isUnlocked && onSelectWorld(world.worldId)}
      disabled={!isUnlocked}
      className={`relative group ${!isUnlocked ? "opacity-50 cursor-not-allowed" : "hover:scale-105 transition-transform duration-200"
        }`}
    >
      {/* Card Container */}
      <div
        className={`relative bg-gradient-to-br ${bgGradient} rounded-3xl p-8 border-8 border-black shadow-2xl overflow-hidden`}
      >
        {/* Top Pattern */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* World Title */}
          <h2 className="text-white text-3xl font-black uppercase tracking-tight drop-shadow-lg text-center leading-tight">
            {world.name}
          </h2>

          {/* Icons Section */}
          <div className="flex items-center justify-between gap-4">
            {/* Sword Icon */}
            <div className="w-24 h-24 bg-blue-900 border-4 border-black rounded-xl flex items-center justify-center shadow-xl">
              <span className="text-5xl">⚔️</span>
            </div>

            {/* Characters */}
            {children}
          </div>
        </div>

        {/* Lock Overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm rounded-3xl">
            <div className="text-center space-y-2">
              <div className="text-6xl">🔒</div>
              <p className="text-white font-bold text-lg">Level {world.requiredLevel} Required</p>
            </div>
          </div>
        )}
      </div>
    </button>
  )
}
