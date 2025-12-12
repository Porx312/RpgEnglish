"use client"

import { Id } from "../../../../../convex/_generated/dataModel"


interface EnemiesListProps {
    enemies: any[]
    onDelete: (enemyId: Id<"enemies">) => void
}

export function EnemiesList({ enemies, onDelete }: EnemiesListProps) {
    return (
        <div className="bg-slate-800 border-2 border-red-600 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-red-300">👹 All Enemies ({enemies.length})</h2>
            {enemies.length === 0 ? (
                <p className="text-slate-400">No enemies found. Create your first enemy above!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enemies.map((enemy) => (
                        <div
                            key={enemy._id}
                            className="bg-slate-700 border-2 border-slate-600 rounded-lg p-4 hover:border-red-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-lg text-white">{enemy.name}</h3>
                                <button
                                    onClick={() => onDelete(enemy._id)}
                                    className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 border border-red-400"
                                >
                                    🗑️
                                </button>
                            </div>
                            <div className="text-sm text-slate-300 space-y-1">
                                {enemy.description && <p className="text-slate-400 italic">{enemy.description}</p>}
                                <p>
                                    <span className="font-semibold text-red-300">Level:</span> {enemy.level}
                                </p>
                                <p>
                                    <span className="font-semibold text-red-300">HP:</span> {enemy.baseHP}
                                </p>
                                <p>
                                    <span className="font-semibold text-red-300">Attack:</span> {enemy.attackPower}
                                </p>
                                <p>
                                    <span className="font-semibold text-red-300">Defense:</span> {enemy.defense}
                                </p>
                                <p>
                                    <span className="font-semibold text-amber-300">Rewards:</span> {enemy.experienceReward} EXP,{" "}
                                    {enemy.moneyReward}g
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
