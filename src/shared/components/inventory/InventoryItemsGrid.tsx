"use client"

import { Id } from "../../../../convex/_generated/dataModel"

interface InventoryItemGridProps {
    items: any[]
    isEquipped: (itemId: Id<"items">) => boolean
    onItemClick: (item: any) => void
}

export const InventoryItemGrid = ({ items, isEquipped, onItemClick }: InventoryItemGridProps) => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 min-h-[400px]">
            {items.map((item) => {
                const equipped = isEquipped(item._id)
                const locked = !item.isOwned

                return (
                    <div
                        key={item._id}
                        onClick={() => item.isOwned && onItemClick(item)}
                        className={`relative aspect-square rounded-lg p-3 border-4 transition-all cursor-pointer bg-no-repeat bg-center bg-contain ${equipped
                            ? "bg-amber-600 border-amber-400 shadow-lg"
                            : locked
                                ? "bg-[#3a2718] border-[#5a3a23] opacity-40"
                                : item.isOwned
                                    ? "bg-[#3a2718] border-[#5a3a23] hover:border-amber-500"
                                    : "bg-[#2d1f15] border-[#4a3728] opacity-60"
                            }`}
                        style={{ backgroundImage: "url('/assets/marco.svg')" }}
                    >
                        {equipped && (
                            <div className="absolute -top-2 -right-2 bg-amber-400 text-[#2d1f15] text-xs font-bold px-2 py-1 rounded-full">
                                E
                            </div>
                        )}
                        {locked && <div className="absolute inset-0 flex items-center justify-center text-4xl">🔒</div>}
                        <div
                            className="w-full h-full flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: item.svgData }}
                        />
                    </div>
                )
            })}
        </div>
    )
}
