"use client"

import { Id } from "../../../../../convex/_generated/dataModel"


interface DropConfigurationProps {
    enemies: any[]
    items: any[]
    dropForm: any
    onChange: (form: any) => void
    onSubmit: () => void
    loading: boolean
}

export function DropConfiguration({ enemies, items, dropForm, onChange, onSubmit, loading }: DropConfigurationProps) {
    return (
        <div className="bg-slate-800 border-2 border-amber-600 rounded-xl p-6 mb-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-amber-300">💎 Configure Enemy Drops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Select Enemy</label>
                    <select
                        value={dropForm.enemyId || ""}
                        onChange={(e) => onChange({ enemyId: e.target.value as Id<"enemies"> })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                        <option value="">Choose enemy...</option>
                        {enemies.map((enemy) => (
                            <option key={enemy._id} value={enemy._id}>
                                {enemy.name} (Lv.{enemy.level})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Select Item</label>
                    <select
                        value={dropForm.itemId || ""}
                        onChange={(e) => onChange({ itemId: e.target.value as Id<"items"> })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                        <option value="">Choose item...</option>
                        {items.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name} ({item.type})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Drop Chance (%)</label>
                    <input
                        type="number"
                        value={dropForm.dropChance}
                        onChange={(e) => onChange({ dropChance: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        min="0"
                        max="100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Min Quantity</label>
                    <input
                        type="number"
                        value={dropForm.minQuantity}
                        onChange={(e) => onChange({ minQuantity: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        min="1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Max Quantity</label>
                    <input
                        type="number"
                        value={dropForm.maxQuantity}
                        onChange={(e) => onChange({ maxQuantity: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        min="1"
                    />
                </div>

                <div className="flex items-end">
                    <button
                        onClick={onSubmit}
                        disabled={!dropForm.enemyId || !dropForm.itemId || loading}
                        className="w-full px-6 py-2 bg-amber-600 text-white font-bold rounded-lg shadow-lg hover:bg-amber-700 disabled:opacity-50 border-2 border-amber-400"
                    >
                        💎 Add Drop
                    </button>
                </div>
            </div>
        </div>
    )
}
