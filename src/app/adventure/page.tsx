"use client"

import { useUser } from "@clerk/nextjs"
import { useQuery, useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { api } from "../../../convex/_generated/api"
export default function AdventurePage() {
  const { user } = useUser()
  const router = useRouter()
  const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")
  const worlds = useQuery(api.worlds.getAllWorlds)

  const seedWorlds = useMutation(api.worlds.seedWorlds)
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    if (!seeded && worlds && worlds.length === 0) {
      seedWorlds().then(() => setSeeded(true))
    }
  }, [worlds, seeded, seedWorlds])

  const startBattle = (worldId: string, levelNumber: number) => {
    router.push(`/adventure/${worldId}/battle/${levelNumber}`)
  }

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
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <button
              onClick={() => router.push("/dashboard")}
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg border-2 border-amber-950 transition-all shadow-lg hover:shadow-amber-900/50 hover:scale-105"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="flex items-center gap-6 bg-gradient-to-r from-amber-900/60 to-orange-900/60 backdrop-blur-sm px-6 py-4 rounded-xl border-2 border-amber-700/50 shadow-xl">

            {/* LEVEL */}
            <div className="text-center">
              <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider">Level</p>
              <p className="text-white text-2xl font-bold">{character.level}</p>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-amber-700/50" />

            {/* CHARACTER NAME */}
            <div className="text-center">
              <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider">Character</p>
              <p className="text-white text-lg font-bold">{character.name || "Hero"}</p>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-amber-700/50" />

            {/* GOLD */}
            <div className="flex items-center gap-2">
              <img
                src="/icons/money.png"
                alt="gold"
                className="w-12 h-12 drop-shadow-md"
              />
              <div>
                <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider">Gold</p>
                <p className="text-yellow-300 text-xl font-bold">{character.money}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-amber-700/50" />

            {/* LIVES */}
            <div className="flex items-center gap-2">
              <img
                src="/icons/health.png"
                alt="gold"
                className="w-12 h-12 drop-shadow-md"
              />
              <div>
                <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider">Lives</p>
                <p className="text-white text-xl font-bold">{character.health}</p>
              </div>
            </div>

          </div>

        </div>

        <div className="mb-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 mb-3 drop-shadow-lg tracking-tight">
            Choose Your Adventure
          </h1>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {worlds.map((world: any) => (
            <WorldCard
              key={world.worldId}
              world={world}
              characterLevel={character.level}
              userId={user.id}
              onStartBattle={startBattle}
            />
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
  onStartBattle,
}: {
  world: any
  characterLevel: number
  userId: string
  onStartBattle: (worldId: string, levelNumber: number) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const progress = useQuery(api.worlds.getUserProgress, { userId, worldId: world.worldId })

  interface Progress {
    completed: boolean
    levelNumber: number
  }

  const completedLevels: number[] =
    (progress as Progress[] | undefined)?.filter((p) => p.completed).map((p) => p.levelNumber) || []
  const isUnlocked = characterLevel >= world.requiredLevel

  const difficultyConfig = {
    Easy: {
      gradient: "from-emerald-700/30 to-teal-800/30",
      headerGradient: "from-emerald-900/60 via-emerald-800/50 to-emerald-900/60",
      badge: "bg-emerald-950/40 text-emerald-300 border-emerald-700/60",
      border: "border-emerald-700/40",
      glow: "shadow-emerald-900/30",
      ornament: "bg-emerald-700/20",
    },
    Medium: {
      gradient: "from-amber-700/30 to-orange-800/30",
      headerGradient: "from-amber-900/60 via-amber-800/50 to-amber-900/60",
      badge: "bg-amber-950/40 text-amber-300 border-amber-700/60",
      border: "border-amber-700/40",
      glow: "shadow-amber-900/30",
      ornament: "bg-amber-700/20",
    },
    Hard: {
      gradient: "from-red-700/30 to-rose-900/30",
      headerGradient: "from-red-950/60 via-red-900/50 to-red-950/60",
      badge: "bg-red-950/40 text-red-300 border-red-700/60",
      border: "border-red-700/40",
      glow: "shadow-red-900/30",
      ornament: "bg-red-700/20",
    },
  }

  const config = difficultyConfig[world.difficulty as keyof typeof difficultyConfig]

  return (
    <div
      className={`relative bg-black/20 backdrop-blur-md rounded-lg border-2 ${config.border} ${config.glow} overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:border-amber-600/60 hover:shadow-xl group`}
    >
      <div
        className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 ${config.border} rounded-tl-lg ${config.ornament}`}
      />
      <div
        className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 ${config.border} rounded-tr-lg ${config.ornament}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 ${config.border} rounded-bl-lg ${config.ornament}`}
      />
      <div
        className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 ${config.border} rounded-br-lg ${config.ornament}`}
      />

      <div
        className={`bg-gradient-to-br ${config.headerGradient} backdrop-blur-sm p-6 border-b-2 ${config.border} relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent`} />
            <div className={`w-2 h-2 rotate-45 ${config.border} border-2`} />
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent`} />
          </div>

          <h2
            className="text-2xl font-bold text-amber-100 mb-2 drop-shadow-2xl text-center tracking-wide uppercase"
            style={{ textShadow: "0 0 20px rgba(0,0,0,0.8)" }}
          >
            {world.name}
          </h2>
          <p className="text-amber-200/80 text-sm leading-relaxed text-center italic">{world.description}</p>
        </div>
      </div>

      <div className="p-6 space-y-4 bg-gradient-to-b from-black/10 to-black/20">
        <div className="flex items-center justify-between">
          <span className="text-amber-400/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1 h-1 bg-amber-500 rounded-full" />
            Difficulty
            <span className="w-1 h-1 bg-amber-500 rounded-full" />
          </span>
          <span
            className={`px-4 py-1.5 rounded text-xs font-bold border-2 backdrop-blur-sm ${config.badge} uppercase tracking-wide`}
          >
            {world.difficulty}
          </span>
        </div>

        {!isUnlocked ? (
          <div className="text-center py-10 space-y-3">
            <div className="relative inline-block">
              <div className="text-6xl mb-4 opacity-30">🔒</div>
              <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} blur-2xl opacity-50`} />
            </div>
            <p className="text-amber-400 font-bold text-lg uppercase tracking-wide">
              Level {world.requiredLevel} Required
            </p>
            <div className="bg-black/30 border-2 border-amber-800/40 rounded px-4 py-2 inline-block backdrop-blur-sm">
              <p className="text-amber-500/80 text-sm">
                Your level: <span className="text-amber-300 font-bold">{characterLevel}</span>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="text-base">★</span>
                  Progress
                </span>
                <span className="text-amber-200 font-bold tabular-nums text-sm">
                  {completedLevels.length}/{world.totalLevels}
                </span>
              </div>
              <div className="relative">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-amber-800/40 border border-amber-700/60" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-amber-800/40 border border-amber-700/60" />
                <div className="relative w-full bg-black/40 backdrop-blur-sm rounded h-4 border-2 border-amber-900/40 overflow-hidden shadow-inner">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 transition-all duration-500 ease-out"
                    style={{ width: `${(completedLevels.length / world.totalLevels) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full bg-gradient-to-b from-amber-800/40 to-amber-900/40 hover:from-amber-700/50 hover:to-amber-800/50 backdrop-blur-sm text-amber-200 font-bold py-3 px-4 rounded border-2 border-amber-700/60 transition-all shadow-lg hover:shadow-amber-900/40 hover:border-amber-600 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/10 to-transparent group-hover:via-amber-500/20 transition-all" />
              <span className="flex items-center justify-center gap-2 relative z-10">
                <span className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>▼</span>
                <span className="uppercase tracking-wider text-sm">{expanded ? "Hide Levels" : "Show Levels"}</span>
              </span>
            </button>

            {expanded && (
              <div className="mt-4 grid grid-cols-5 gap-2 animate-[fadeIn_0.3s_ease-out]">
                {Array.from({ length: world.totalLevels }, (_, i) => i + 1).map((levelNum) => {
                  const isCompleted = completedLevels.includes(levelNum)
                  const isCurrent = levelNum === completedLevels.length + 1
                  const isLocked = levelNum > completedLevels.length + 1

                  return (
                    <button
                      key={levelNum}
                      onClick={() => !isLocked && onStartBattle(world.worldId, levelNum)}
                      disabled={isLocked}
                      className={`aspect-square rounded font-bold text-base border-2 transition-all duration-200 backdrop-blur-sm relative overflow-hidden ${isCompleted
                        ? "bg-emerald-900/40 border-emerald-600/60 text-emerald-300 shadow-lg shadow-emerald-900/30"
                        : isCurrent
                          ? "bg-amber-800/40 border-amber-600/60 text-amber-200 hover:bg-amber-700/50 shadow-lg shadow-amber-900/30 animate-pulse hover:scale-110"
                          : "bg-black/30 border-stone-700/40 text-stone-600 cursor-not-allowed"
                        }`}
                    >
                      {isCompleted && (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-emerald-900/20" />
                      )}
                      {isCurrent && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-amber-900/20" />
                      )}
                      <span className="relative z-10">{isCompleted ? "✓" : isLocked ? "🔒" : levelNum}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}