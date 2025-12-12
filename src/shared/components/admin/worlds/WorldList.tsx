"use client"

import { Id } from "../../../../../convex/_generated/dataModel"


interface WorldsListProps {
    worlds: any[]
    levelsForWorld: any[]
    quizzesForLevel: any[]
    onDeleteWorld: (worldId: Id<"worlds">) => void
    onDeleteLevel: (levelId: Id<"levels">) => void
    onDeleteQuiz: (quizId: Id<"quizzes">) => void
}

export function WorldsList({
    worlds,
    levelsForWorld,
    quizzesForLevel,
    onDeleteWorld,
    onDeleteLevel,
    onDeleteQuiz,
}: WorldsListProps) {
    return (
        <div className="mt-6 bg-slate-800 border-2 border-blue-600 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">🌍 All Worlds ({worlds.length})</h2>
            {worlds.length === 0 ? (
                <p className="text-slate-400">No worlds found. Create your first world above!</p>
            ) : (
                <div className="space-y-4">
                    {worlds.map((world) => (
                        <div key={world._id} className="bg-slate-700 border-2 border-slate-600 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="font-bold text-xl text-white">{world.name}</h3>
                                    <p className="text-sm text-slate-400">ID: {world.worldId}</p>
                                </div>
                                <button
                                    onClick={() => onDeleteWorld(world._id)}
                                    className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 border border-red-400"
                                >
                                    🗑️ Delete World
                                </button>
                            </div>
                            <div className="text-sm text-slate-300 mb-3">
                                <p>{world.description}</p>
                                <p className="mt-1">
                                    <span className="font-semibold text-blue-300">Difficulty:</span> {world.difficulty} |{" "}
                                    <span className="font-semibold text-blue-300">Required Level:</span> {world.requiredLevel} |{" "}
                                    <span className="font-semibold text-blue-300">Total Levels:</span> {world.totalLevels}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
