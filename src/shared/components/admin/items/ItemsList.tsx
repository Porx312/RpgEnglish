"use client"

import { Id } from "../../../../../convex/_generated/dataModel"


interface ItemsListProps {
    items: any[]
    onDelete: (itemId: Id<"items">) => void
}

export function ItemsList({ items, onDelete }: ItemsListProps) {
    return (
        <div className="bg-slate-800 border-2 border-emerald-600 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300">📦 All Items ({items.length})</h2>
            {items.length === 0 ? (
                <p className="text-slate-400">No items found. Create your first item above!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="bg-slate-700 border-2 border-slate-600 rounded-lg p-4 hover:border-emerald-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-lg text-white">{item.name}</h3>
                                <button
                                    onClick={() => onDelete(item._id)}
                                    className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 border border-red-400"
                                >
                                    🗑️
                                </button>
                            </div>
                            <div className="text-sm text-slate-300 mb-2 space-y-1">
                                <p>
                                    <span className="font-semibold text-emerald-300">Type:</span> {item.type}
                                </p>
                                {item.category && (
                                    <p>
                                        <span className="font-semibold text-emerald-300">Category:</span> {item.category}
                                    </p>
                                )}
                                <p>
                                    <span className="font-semibold text-emerald-300">Level:</span> {item.requiredLevel}
                                </p>
                                <p>
                                    <span className="font-semibold text-amber-300">Price:</span> {item.price}g
                                </p>
                                {item.rarity && (
                                    <p>
                                        <span className="font-semibold text-purple-300">Rarity:</span> {item.rarity}
                                    </p>
                                )}
                            </div>
                            <div
                                className="bg-slate-900 p-4 rounded flex items-center justify-center h-32 border border-slate-600"
                                dangerouslySetInnerHTML={{ __html: item.svgData }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
