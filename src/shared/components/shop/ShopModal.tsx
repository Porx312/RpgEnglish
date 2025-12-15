"use client"

import { PurchaseModal } from "@/shared/components/shop/PurchaseModal"
import { ShopCategoryFilter } from "@/shared/components/shop/ShopCategoryFilter"
import { ShopItemCard } from "@/shared/components/shop/ShopItemCard"
import { useCharacter } from "@/shared/hooks/use-character"
import { useShopLogic } from "@/shared/hooks/use-shop-logic"
import { useShopStore } from "@/shared/store/use-shop.store"
import { useQuery } from "convex/react"
import { useEffect } from "react"
import { api } from "../../../../convex/_generated/api"
import { GameModalLayout } from "@/shared/layout/inventoryShop/GameModalLayout"

interface ShopModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShopModal({ isOpen, onClose }: ShopModalProps) {
  const { character, user, isLoading } = useCharacter()
  const { selectedCategory, setSelectedCategory } = useShopStore()
  const { selectedItem, isPurchasing, setSelectedItem, handlePurchase } = useShopLogic(user?.id, character)
  const itemsWithOwnership = useQuery(api.inventory.getAllItemsWithOwnership, user?.id ? { userId: user.id } : "skip")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!user || isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="text-amber-300 text-xl font-bold animate-pulse">Loading shop...</div>
      </div>
    )
  }

  if (!character) {
    return null
  }

  const shopItems = itemsWithOwnership?.filter((item: { isOwned: boolean }) => !item.isOwned) || []
  const filteredItems =
    selectedCategory === "all"
      ? shopItems
      : shopItems.filter((item: { type: string }) => item.type === selectedCategory)

  return (
    <GameModalLayout isOpen={isOpen} onClose={onClose} title="Store">
      <div className="text-center mb-8">
        <p className="text-amber-800 text-lg font-semibold">Welcome, brave adventurer! Browse our finest wares.</p>
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
          <p className="text-amber-800 text-xl font-semibold">You already own all items in this category!</p>
        </div>
      )}

      <PurchaseModal
        item={selectedItem}
        character={character}
        isPurchasing={isPurchasing}
        onPurchase={handlePurchase}
        onClose={() => setSelectedItem(null)}
      />
    </GameModalLayout>
  )
}
