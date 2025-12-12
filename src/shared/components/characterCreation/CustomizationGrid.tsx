"use client"

import { Id } from "../../../../convex/_generated/dataModel"


interface Item {
    _id: Id<"items">
    name: string
    type: string
    svgData: string
}

interface CustomizationGridProps {
    hairItems: Item[]
    outfitItems: Item[]
    hairColors: { color: string }[]
    skinColors: { color: string }[]
    selectedHairId?: Id<"items">
    selectedOutfitId?: Id<"items">
    selectedHairColor: string
    selectedSkinColor: string
    onSelectHair: (id: Id<"items">) => void
    onSelectOutfit: (id: Id<"items">) => void
    onSelectHairColor: (color: string) => void
    onSelectSkinColor: (color: string) => void
    currentSkinColor: string
}

export function CustomizationGrid({
    hairItems,
    outfitItems,
    hairColors,
    skinColors,
    selectedHairId,
    selectedOutfitId,
    selectedHairColor,
    selectedSkinColor,
    onSelectHair,
    onSelectOutfit,
    onSelectHairColor,
    onSelectSkinColor,
    currentSkinColor,
}: CustomizationGridProps) {
    return (
        <div style={{ maxHeight: "600px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Hairstyle */}
                <div className="space-y-2">
                    <h3 className="text-xl text-center text-white">hairstyle</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {hairItems.map((item) => (
                            <button
                                key={item._id}
                                onClick={() => onSelectHair(item._id)}
                                className={`aspect-square rounded-lg transition-all flex items-center justify-center ${selectedHairId === item._id
                                    ? "bg-white border-4 border-blue-600 shadow-lg scale-105"
                                    : "bg-white/80 border-2 border-gray-400 hover:border-blue-400"
                                    }`}
                            >
                                <svg width="50" height="50" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="20" fill={currentSkinColor} />
                                    <g dangerouslySetInnerHTML={{ __html: item.svgData }} />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hair Color */}
                <div className="space-y-2">
                    <h3 className="text-xl text-center text-white">Hair Color</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {hairColors.map((color) => (
                            <button
                                key={color.color}
                                onClick={() => onSelectHairColor(color.color)}
                                className={`aspect-square rounded-lg transition-all ${selectedHairColor === color.color
                                    ? "border-4 border-blue-600 shadow-lg scale-105"
                                    : "border-2 border-gray-400 hover:border-blue-400"
                                    }`}
                                style={{ backgroundColor: color.color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Skin Color */}
                <div className="space-y-2">
                    <h3 className="text-xl text-center text-white">Skin Color</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {skinColors.map((color) => (
                            <button
                                key={color.color}
                                onClick={() => onSelectSkinColor(color.color)}
                                className={`aspect-square rounded-lg transition-all ${selectedSkinColor === color.color
                                    ? "border-4 border-blue-600 shadow-lg scale-105"
                                    : "border-2 border-gray-400 hover:border-blue-400"
                                    }`}
                                style={{ backgroundColor: color.color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Outfit */}
                <div className="space-y-2">
                    <h3 className="text-xl text-center text-white">Outfit</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {outfitItems.map((item) => (
                            <button
                                key={item._id}
                                onClick={() => onSelectOutfit(item._id)}
                                className={`aspect-square rounded-lg transition-all flex items-center justify-center ${selectedOutfitId === item._id
                                    ? "bg-white border-4 border-blue-600 shadow-lg scale-105"
                                    : "bg-white/80 border-2 border-gray-400 hover:border-blue-400"
                                    }`}
                            >
                                <svg width="50" height="50" viewBox="0 0 100 100">
                                    <g dangerouslySetInnerHTML={{ __html: item.svgData }} />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
