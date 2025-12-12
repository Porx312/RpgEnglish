"use client"

interface PurchaseModalProps {
    item: any
    character: any
    isPurchasing: boolean
    onPurchase: (item: any) => void
    onClose: () => void
}

export const PurchaseModal = ({ item, character, isPurchasing, onPurchase, onClose }: PurchaseModalProps) => {
    if (!item) return null

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-gradient-to-br from-slate-800 to-emerald-900 rounded-lg p-6 border-4 border-amber-600 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center mb-4">
                    <h3 className="text-3xl font-bold text-amber-300 mb-4" style={{ fontFamily: "serif" }}>
                        {item.name}
                    </h3>
                    <div className="flex justify-center mb-4">
                        <div
                            className="w-40 h-40 bg-slate-900/50 rounded-lg border-2 border-slate-700 p-4 flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: item.svgData }}
                        />
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4 border-2 border-slate-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-amber-100">Price:</span>
                            <span className="text-amber-400 font-bold text-xl">💰 {item.price} Gold</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-amber-100">Required Level:</span>
                            <span className="text-emerald-400 font-bold text-xl">⭐ {item.requiredLevel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-amber-100">Your Gold:</span>
                            <span
                                className={`font-bold text-xl ${character.money >= item.price ? "text-green-400" : "text-red-400"}`}
                            >
                                💰 {character.money}
                            </span>
                        </div>
                    </div>

                    {character.money >= item.price && character.level >= item.requiredLevel ? (
                        <button
                            onClick={() => onPurchase(item)}
                            disabled={isPurchasing}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-lg font-bold text-lg border-2 border-emerald-400 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPurchasing ? "PURCHASING..." : "💰 PURCHASE ITEM"}
                        </button>
                    ) : (
                        <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-4 text-red-300 font-bold">
                            {character.money < item.price && "❌ Not enough gold!"}
                            {character.money >= item.price &&
                                character.level < item.requiredLevel &&
                                `❌ Requires level ${item.requiredLevel}!`}
                        </div>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-amber-200 px-4 py-2 rounded-lg transition-all"
                >
                    Close
                </button>
            </div>
        </div>
    )
}
