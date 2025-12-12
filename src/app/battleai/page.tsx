"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export default function BattlePage() {
  const { user } = useUser()
  const router = useRouter()
  const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-600">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  if (character === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-600">
        <p className="text-white text-xl">Loading character...</p>
      </div>
    )
  }

  if (!character) {
    router.push("/character-creation")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-orange-600 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg border-2 border-white/40 transition-all"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-4 border-white/30 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Battle Arena</h1>
          <div className="text-6xl mb-6">⚔️</div>
          <p className="text-2xl text-white mb-8">Coming Soon!</p>
          <p className="text-lg text-white/90">
            Battle monsters and answer English questions to gain experience and rewards.
          </p>
        </div>
      </div>
    </div>
  )
}
