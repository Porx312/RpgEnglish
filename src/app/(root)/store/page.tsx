"use client"

import { PurchaseModal } from "@/shared/components/shop/PurchaseModal"
import { ShopCategoryFilter } from "@/shared/components/shop/ShopCategoryFilter"
import { ShopItemCard } from "@/shared/components/shop/ShopItemCard"
import { useCharacter } from "@/shared/hooks/use-character"
import { useShopLogic } from "@/shared/hooks/use-shop-logic"
import { useShopStore } from "@/shared/store/use-shop.store"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { api } from "../../../../convex/_generated/api"

export default function ShopPage() {
    const router = useRouter()
    const { character, user, isLoading } = useCharacter()
    const { selectedCategory, setSelectedCategory } = useShopStore()
    const { selectedItem, isPurchasing, setSelectedItem, handlePurchase } = useShopLogic(user?.id, character)
    const itemsWithOwnership = useQuery(api.inventory.getAllItemsWithOwnership, user?.id ? { userId: user.id } : "skip")



    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-emerald-900 to-slate-900">
                <div className="text-amber-300 text-xl font-bold animate-pulse">Loading...</div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-amber-300 text-xl font-bold animate-pulse">Loading shop...</div>
            </div>
        )
    }

    if (!character) {
        router.push("/character-creation")
        return null
    }

    const shopItems = itemsWithOwnership?.filter((item: { isOwned: boolean }) => !item.isOwned) || []
    const filteredItems =
        selectedCategory === "all"
            ? shopItems
            : shopItems.filter((item: { type: string }) => item.type === selectedCategory)

    return (
        <div className="min-h-screen bg-gradient-to-b p-8">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-8">
                    <h1
                        className="text-5xl font-bold text-amber-300 mb-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                        style={{ fontFamily: "serif" }}
                    >
                        Store 🏪
                    </h1>
                    <p className="text-amber-100 text-lg">Welcome, brave adventurer! Browse our finest wares.</p>
                </div>

                <ShopCategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredItems.map((item: any) => {
                        const canAfford = character.money >= item.price
                        const canEquip = character.level >= item.requiredLevel

                        return (
                            <ShopItemCard
                                key={item._id}
                                item={item}
                                canAfford={canAfford}
                                canEquip={canEquip}
                                onClick={() => setSelectedItem(item)}
                            />
                        )
                    })}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📦</div>
                        <p className="text-amber-200 text-xl">You already own all items in this category!</p>
                    </div>
                )}
            </div>

            <PurchaseModal
                item={selectedItem}
                character={character}
                isPurchasing={isPurchasing}
                onPurchase={handlePurchase}
                onClose={() => setSelectedItem(null)}
            />
        </div>
    )
}
