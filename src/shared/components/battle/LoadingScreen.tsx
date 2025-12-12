"use client"

import { useRouter } from "next/navigation"

interface LoadingScreenProps {
    type: "battle" | "level" | "quizzes" | "enemy"
    worldId?: string
    levelNumber?: number
    user?: boolean
    character?: boolean | null | object
    items?: boolean
    enemyId?: string
    allWorlds?: string[]
}

export const BattleLoadingScreen = ({
    type,
    worldId,
    levelNumber,
    user,
    character,
    items,
    enemyId,
    allWorlds,
}: LoadingScreenProps) => {
    const router = useRouter()

    const getMessage = () => {
        switch (type) {
            case "battle":
                return "⚔️ Loading Battle..."
            case "level":
                return "⚔️ Loading Level Data..."
            case "quizzes":
                return "❌ No quizzes found for this level"
            case "enemy":
                return "⚔️ Loading Enemy..."
            default:
                return "Loading..."
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2d1f15]">
            <div className="text-center">
                <p className={`text-xl font-bold animate-pulse mb-2 ${type === "quizzes" ? "text-red-400" : "text-amber-200"}`}>
                    {getMessage()}
                </p>

                {type === "battle" && (
                    <p className="text-amber-600 text-sm">
                        User: {user ? "✓" : "✗"} | Character:{" "}
                        {character === undefined ? "Loading..." : character === null ? "None" : "✓"} | Items:{" "}
                        {items ? "✓" : "Loading..."}
                    </p>
                )}

                {type === "level" && worldId && levelNumber !== undefined && (
                    <>
                        <p className="text-amber-600 text-sm mb-2">
                            World: {worldId} | Level: {levelNumber}
                        </p>
                        {allWorlds && (
                            <div className="mt-4 p-4 bg-[#3a2718] rounded border-2 border-amber-700 max-w-md mx-auto">
                                <p className="text-amber-400 text-xs mb-2">Debug Info:</p>
                                <p className="text-amber-600 text-xs">Decoded worldId: {worldId}</p>
                                <p className="text-amber-600 text-xs">Available worlds: {allWorlds.join(", ")}</p>
                            </div>
                        )}
                    </>
                )}

                {type === "enemy" && enemyId && <p className="text-amber-600 text-sm">Enemy ID: {enemyId}</p>}

                {(type === "level" || type === "quizzes") && (
                    <button
                        onClick={() => router.push("/adventure")}
                        className="mt-4 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg"
                    >
                        Back to Adventure
                    </button>
                )}
            </div>
        </div>
    )
}
