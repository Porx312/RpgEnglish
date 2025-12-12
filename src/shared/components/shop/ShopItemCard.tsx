"use client"

interface ShopItemCardProps {
    item: {
        _id: string
        name: string
        svgData: string
        requiredLevel: number
        price: number
        type: string
    }
    canAfford: boolean
    canEquip: boolean
    onClick: () => void
}

export const ShopItemCard = ({ item, canAfford, canEquip, onClick }: ShopItemCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`bg-gradient-to-br from-slate-800/90 to-emerald-900/90 rounded-lg p-4 border-4 transition-all cursor-pointer hover:scale-105 ${canAfford && canEquip
                ? "border-amber-500 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/30"
                : "border-slate-600 opacity-70"
                }`}
        >
            <div
                className="aspect-square w-52 h-52 bg-slate-900/50 rounded-lg p-3 mb-3 border-2 border-slate-700 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: item.svgData }}
            />
            <h3 className="text-amber-300 font-bold text-sm mb-2 text-center truncate">{item.name}</h3>
            <div className="flex items-center justify-between text-xs">
                <span className={`font-bold ${canAfford ? "text-amber-400" : "text-red-400"}`}>💰 {item.price}</span>
                <span className={`font-bold ${canEquip ? "text-emerald-400" : "text-red-400"}`}>⭐ {item.requiredLevel}</span>
            </div>
            {(!canAfford || !canEquip) && (
                <div className="mt-2 text-center text-xs text-red-400 font-bold">
                    {!canAfford && "Need more gold!"}
                    {canAfford && !canEquip && `Requires Lv ${item.requiredLevel}`}
                </div>
            )}
        </div>
    )
}
