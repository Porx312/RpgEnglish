"use client"

interface ShopCategoryFilterProps {
    selectedCategory: "all" | "hair" | "outfit" | "weapon" | "accessory"
    onCategoryChange: (category: "all" | "hair" | "outfit" | "weapon" | "accessory") => void
}

export const ShopCategoryFilter = ({ selectedCategory, onCategoryChange }: ShopCategoryFilterProps) => {
    const categories = [
        { value: "all" as const, icon: "🛍️", label: "All Items" },
        { value: "weapon" as const, icon: "⚔️", label: "Weapons" },
        { value: "outfit" as const, icon: "👕", label: "Armor" },
        { value: "accessory" as const, icon: "💍", label: "Accessories" },
        { value: "hair" as const, icon: "💇", label: "Hairstyles" },
    ]

    return (
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => onCategoryChange(cat.value)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all border-2 ${selectedCategory === cat.value
                        ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-500/50"
                        : "bg-slate-800/70 text-amber-200 border-slate-600 hover:bg-slate-700"
                        }`}
                >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.label}
                </button>
            ))}
        </div>
    )
}
