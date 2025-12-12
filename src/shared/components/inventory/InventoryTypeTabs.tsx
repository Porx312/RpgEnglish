"use client"

interface InventoryTypeTabsProps {
    selectedType: "hair" | "outfit" | "weapon" | "accessory"
    onTypeChange: (type: "hair" | "outfit" | "weapon" | "accessory") => void
}

export const InventoryTypeTabs = ({ selectedType, onTypeChange }: InventoryTypeTabsProps) => {
    const tabs = [
        { type: "weapon" as const, icon: "⚔️", label: "Weapons" },
        { type: "outfit" as const, icon: "👕", label: "Armor" },
        { type: "accessory" as const, icon: "💍", label: "Accessories" },
        { type: "hair" as const, icon: "💇", label: "Hairstyles" },
    ]

    return (
        <div className="grid grid-cols-4 gap-2 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.type}
                    onClick={() => onTypeChange(tab.type)}
                    className={`px-4 py-3 rounded-lg font-bold transition-all border-2 ${selectedType === tab.type
                            ? "bg-amber-600 text-white border-amber-500"
                            : "bg-[#3a2718] text-amber-200 border-[#5a3a23] hover:bg-[#4a3728]"
                        }`}
                >
                    <div className="text-2xl mb-1">{tab.icon}</div>
                    <div className="text-xs">{tab.label}</div>
                </button>
            ))}
        </div>
    )
}
