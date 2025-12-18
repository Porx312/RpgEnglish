"use client"

import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { useRouter, useParams } from "next/navigation"
import { api } from "../../../../convex/_generated/api"

export default function LevelsPage() {
    const { user } = useUser()
    const router = useRouter()
    const params = useParams()
    const worldId = params.worldid as string

    const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")
    const world = useQuery(api.worlds.getWorldById, worldId ? { worldId } : "skip")
    const worlds = useQuery(api.worlds.getAllWorlds)

    const progress = useQuery(api.worlds.getUserProgress, user?.id && worldId ? { userId: user.id, worldId } : "skip")

    interface Progress {
        completed: boolean
        levelNumber: number
    }

    const completedLevels: number[] =
        (progress as Progress[] | undefined)?.filter((p) => p.completed).map((p) => p.levelNumber) || []

    const startBattle = (levelNumber: number) => {
        router.push(`/adventure/${worldId}/${levelNumber}`)
    }

    if (character === null) {
        router.push("/character-creation")
        return null
    }

    if (!user || character === undefined || world === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-green-300 text-xl font-bold tracking-wide">Loading World...</p>
                </div>
            </div>
        )
    }

    if (world === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
                <div className="text-center space-y-4">
                    <p className="text-red-400 text-2xl font-bold">World not found</p>
                    <p className="text-gray-300">World ID: {worldId}</p>
                    <button
                        onClick={() => router.push("/adventure")}
                        className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
                    >
                        Back to Worlds
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            className="min-h-screen w-full h-full bg-[length:2000px_auto] bg-center bg-no-repeat relative overflow-hidden"
            style={{
                backgroundImage: "url('https://res.cloudinary.com/dq0pfesxe/image/upload/v1765809751/game_background_3_dyvuvk.png')",
                backgroundPosition: "center",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex flex-col min-h-screen p-8">
                {/* World Title */}
                <div className="text-center mb-12">
                    <h1 className="text-white text-6xl md:text-7xl font-black uppercase tracking-tight drop-shadow-2xl">
                        {world.name}
                    </h1>
                </div>

                {/* Level Buttons Grid */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-6 max-w-4xl">
                        {Array.from({ length: world.totalLevels }, (_, i) => i + 1).map((levelNum) => {
                            const isCompleted = completedLevels.includes(levelNum)
                            const isCurrent = levelNum === completedLevels.length + 1
                            const isLocked = levelNum > completedLevels.length + 1

                            return (
                                <button
                                    key={levelNum}
                                    onClick={() => !isLocked && startBattle(levelNum)}
                                    disabled={isLocked}
                                    className={`relative group ${!isLocked ? "hover:scale-110" : "opacity-60 cursor-not-allowed"
                                        } transition-all duration-200`}
                                >
                                    <div
                                        className={`w-32 h-32 rounded-3xl border-8 border-black shadow-2xl flex items-center justify-center ${isCompleted
                                            ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                                            : "bg-gradient-to-br from-green-500 to-green-600"
                                            }`}
                                    >
                                        <span className="text-white text-6xl font-black drop-shadow-lg">
                                            {isCompleted ? "✓" : isLocked ? "🔒" : levelNum}
                                        </span>
                                    </div>

                                    {/* Glow effect for current level */}
                                    {isCurrent && (
                                        <div className="absolute inset-0 bg-green-400 rounded-3xl blur-xl opacity-50 animate-pulse -z-10" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <button
                        onClick={() => router.push("/adventure")}
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
            </div>
        </div>
    )
}
