"use client"

import type React from "react"

interface CreateItemFormProps {
    form: {
        name: string
        type: string
        svgData: string
        category: string
        requiredLevel: number
        price: number
        rarity: string
    }
    onChange: (form: any) => void
    onSubmit: (e: React.FormEvent) => void
    loading: boolean
}

export function CreateItemForm({ form, onChange, onSubmit, loading }: CreateItemFormProps) {
    return (
        <div className="bg-slate-800 border-2 border-emerald-600 rounded-xl p-6 mb-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300">✨ Create New Item</h2>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold mb-2 text-emerald-200">Item Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., Dragon Sword"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-emerald-200">Item Type</label>
                    <select
                        value={form.type}
                        onChange={(e) => onChange({ type: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                        <option value="hair">Hair</option>
                        <option value="outfit">Outfit</option>
                        <option value="weapon">Weapon</option>
                        <option value="accessory">Accessory</option>
                        <option value="body">Body</option>
                        <option value="face">Face</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-emerald-200">Category</label>
                    <input
                        type="text"
                        value={form.category}
                        onChange={(e) => onChange({ category: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., Male, Female, Heavy"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-emerald-200">Rarity</label>
                    <select
                        value={form.rarity}
                        onChange={(e) => onChange({ rarity: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                        <option value="legendary">Legendary</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-emerald-200">Required Level</label>
                    <input
                        type="number"
                        value={form.requiredLevel}
                        onChange={(e) => onChange({ requiredLevel: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        min="1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-emerald-200">Price (Gold)</label>
                    <input
                        type="number"
                        value={form.price}
                        onChange={(e) => onChange({ price: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        min="0"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-emerald-200">SVG Content</label>
                    <textarea
                        value={form.svgData}
                        onChange={(e) => onChange({ svgData: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono text-sm"
                        placeholder="Paste SVG code here..."
                        rows={8}
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-700 disabled:opacity-50 border-2 border-emerald-400"
                    >
                        {loading ? "Creating..." : "✨ Create Item"}
                    </button>
                </div>
            </form>
        </div>
    )
}
