"use client"

import type React from "react"

interface CreateWorldFormProps {
    form: any
    onChange: (form: any) => void
    onSubmit: (e: React.FormEvent) => void
    loading: boolean
}

export function CreateWorldForm({ form, onChange, onSubmit, loading }: CreateWorldFormProps) {
    return (
        <div className="bg-slate-800 border-2 border-blue-600 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">🌍 Create New World</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-2 text-blue-200">World ID (unique)</label>
                    <input
                        type="text"
                        value={form.worldId}
                        onChange={(e) => onChange({ worldId: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="e.g., beginner-forest"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-blue-200">World Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="e.g., Beginner Forest"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-blue-200">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => onChange({ description: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        rows={2}
                        placeholder="World description..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-blue-200">Difficulty</label>
                        <select
                            value={form.difficulty}
                            onChange={(e) => onChange({ difficulty: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-blue-200">Required Level</label>
                        <input
                            type="number"
                            value={form.requiredLevel}
                            onChange={(e) => onChange({ requiredLevel: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-blue-200">Total Levels</label>
                        <input
                            type="number"
                            value={form.totalLevels}
                            onChange={(e) => onChange({ totalLevels: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-blue-200">Order Index</label>
                        <input
                            type="number"
                            value={form.orderIndex}
                            onChange={(e) => onChange({ orderIndex: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            min="0"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 border-2 border-blue-400"
                >
                    {loading ? "Creating..." : "🌍 Create World"}
                </button>
            </form>
        </div>
    )
}
