"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

export default function LandingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")

  useEffect(() => {
    if (isLoaded && user) {
      if (character !== undefined) {
        if (character === null) {
          router.push("/character-creation")
        } else {
          router.push("/dashboard")
        }
      }
    }
  }, [isLoaded, user, character, router])

  if (!isLoaded || (user && character === undefined)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 text-white px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight">Quest English</h1>
          <p className="text-2xl font-medium">Learn English Through Adventure</p>
        </div>

        {/* Description */}
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">
          Embark on an epic journey where every battle teaches you English. Create your character, fight monsters,
          complete quests, and become a master of the English language!
        </p>

        {/* Features */}
    {/*     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-3">⚔️</div>
            <h3 className="text-lg font-semibold mb-2">Battle Monsters</h3>
            <p className="text-sm">Answer English questions to defeat enemies</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Complete Quests</h3>
            <p className="text-sm">Go on adventures and earn rewards</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-lg font-semibold mb-2">Customize Character</h3>
            <p className="text-sm">Create your unique RPG hero</p>
          </div>
        </div> */}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <SignUpButton mode="modal">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg">
              Start Your Quest
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors border-2 border-white/30">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  )
}
