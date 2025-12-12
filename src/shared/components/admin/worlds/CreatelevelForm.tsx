"use client"

import type React from "react"
import { Id } from "../../../../../convex/_generated/dataModel"


interface CreateLevelFormProps {
    form: any
    worlds: any[]
    enemies: any[]
    onChange: (form: any) => void
    onSubmit: (e: React.FormEvent) => void
    loading: boolean
}

export function CreateLevelForm({ form, worlds, enemies, onChange, onSubmit, loading }: CreateLevelFormProps) {
    return (
        <div className="bg-slate-800 border-2 border-purple-600 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">📍 Create New Level</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-2 text-purple-200">Select World</label>
                    <select
                        value={form.selectedWorldId}
                        onChange={(e) => onChange({ selectedWorldId: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        required
                    >
                        <option value="">-- Select World --</option>
                        {worlds.map((world) => (
                            <option key={world._id} value={world.worldId}>
                                {world.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-purple-200">Level Number</label>
                        <input
                            type="number"
                            value={form.levelNumber}
                            onChange={(e) => onChange({ levelNumber: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-purple-200">Enemy</label>
                        <select
                            value={form.enemyId || ""}
                            onChange={(e) => onChange({ enemyId: e.target.value as Id<"enemies"> })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            required
                        >
                            <option value="">-- Select Enemy --</option>
                            {enemies.map((enemy) => (
                                <option key={enemy._id} value={enemy._id}>
                                    {enemy.name} (Lv.{enemy.level})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-purple-200">Player Max HP</label>
                        <input
                            type="number"
                            value={form.playerMaxHP}
                            onChange={(e) => onChange({ playerMaxHP: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-purple-200">Total Questions</label>
                        <input
                            type="number"
                            value={form.totalQuestions}
                            onChange={(e) => onChange({ totalQuestions: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-purple-200">Damage Per Correct</label>
                        <input
                            type="number"
                            value={form.damagePerCorrect}
                            onChange={(e) => onChange({ damagePerCorrect: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-purple-200">Max Failures</label>
                        <input
                            type="number"
                            value={form.maxFailures}
                            onChange={(e) => onChange({ maxFailures: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            min="1"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !form.selectedWorldId}
                    className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 disabled:opacity-50 border-2 border-purple-400"
                >
                    {loading ? "Creating..." : "📍 Create Level"}
                </button>
            </form>
        </div>
    )
}
