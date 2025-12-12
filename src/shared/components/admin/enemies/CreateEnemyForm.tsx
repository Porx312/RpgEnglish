"use client"

import type React from "react"
import { Id } from "../../../../../convex/_generated/dataModel"


interface CreateEnemyFormProps {
    form: any
    hairItems: any[]
    outfitItems: any[]
    weaponItems: any[]
    onChange: (form: any) => void
    onSubmit: (e: React.FormEvent) => void
    loading: boolean
}

export function CreateEnemyForm({
    form,
    hairItems,
    outfitItems,
    weaponItems,
    onChange,
    onSubmit,
    loading,
}: CreateEnemyFormProps) {
    return (
        <div className="bg-slate-800 border-2 border-red-600 rounded-xl p-6 mb-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-red-300">👹 Create New Enemy</h2>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold mb-2 text-red-200">Enemy Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                        placeholder="e.g., Goblin Warrior"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-red-200">Level</label>
                    <input
                        type="number"
                        value={form.level}
                        onChange={(e) => onChange({ level: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                        min="1"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-red-200">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => onChange({ description: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                        placeholder="Enemy description..."
                        rows={2}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-red-200">Base HP</label>
                    <input
                        type="number"
                        value={form.hp}
                        onChange={(e) => onChange({ hp: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                        min="1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-red-200">Attack Power</label>
                    <input
                        type="number"
                        value={form.attack}
                        onChange={(e) => onChange({ attack: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                        min="1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-red-200">Defense</label>
                    <input
                        type="number"
                        value={form.defense}
                        onChange={(e) => onChange({ defense: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">EXP Reward</label>
                    <input
                        type="number"
                        value={form.expReward}
                        onChange={(e) => onChange({ expReward: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Money Reward</label>
                    <input
                        type="number"
                        value={form.moneyReward}
                        onChange={(e) => onChange({ moneyReward: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-purple-200">Skin Color</label>
                    <input
                        type="color"
                        value={form.skinColor}
                        onChange={(e) => onChange({ skinColor: e.target.value })}
                        className="w-full h-10 bg-slate-700 border-2 border-slate-600 rounded-lg cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-purple-200">Eye Color</label>
                    <input
                        type="color"
                        value={form.eyeColor}
                        onChange={(e) => onChange({ eyeColor: e.target.value })}
                        className="w-full h-10 bg-slate-700 border-2 border-slate-600 rounded-lg cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-purple-200">Hair Color</label>
                    <input
                        type="color"
                        value={form.hairColor}
                        onChange={(e) => onChange({ hairColor: e.target.value })}
                        className="w-full h-10 bg-slate-700 border-2 border-slate-600 rounded-lg cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-purple-200">Hair Item</label>
                    <select
                        value={form.hairItemId || ""}
                        onChange={(e) => onChange({ hairItemId: e.target.value as Id<"items"> })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value="">None</option>
                        {hairItems.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-purple-200">Outfit Item</label>
                    <select
                        value={form.outfitItemId || ""}
                        onChange={(e) => onChange({ outfitItemId: e.target.value as Id<"items"> })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value="">None</option>
                        {outfitItems.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-purple-200">Weapon Item</label>
                    <select
                        value={form.weaponItemId || ""}
                        onChange={(e) => onChange({ weaponItemId: e.target.value as Id<"items"> })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value="">None</option>
                        {weaponItems.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 disabled:opacity-50 border-2 border-red-400"
                    >
                        {loading ? "Creating..." : "👹 Create Enemy"}
                    </button>
                </div>
            </form>
        </div>
    )
}
