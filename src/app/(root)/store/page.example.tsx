"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { useState } from "react"
import type { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api"

export default function ShopPage() {
  const { user } = useUser()
  const router = useRouter()
  const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")
  const itemsWithOwnership = useQuery(api.inventory.getAllItemsWithOwnership, user?.id ? { userId: user.id } : "skip")
  const purchaseItem = useMutation(api.inventory.purchaseItem)

  const [selectedCategory, setSelectedCategory] = useState<"all" | "hair" | "outfit" | "weapon" | "accessory">("all")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isPurchasing, setIsPurchasing] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-emerald-900 to-slate-900">
        <div className="text-amber-300 text-xl font-bold animate-pulse">Loading...</div>
      </div>
    )
  }

  if (character === undefined || itemsWithOwnership === undefined) {
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

  const handlePurchase = async (item: any) => {
    if (!user?.id) return
    if (character.money < item.price) {
      alert("Not enough gold!")
      return
    }
    if (character.level < item.requiredLevel) {
      alert(`Requires level ${item.requiredLevel}!`)
      return
    }

    setIsPurchasing(true)
    try {
      await purchaseItem({ userId: user.id, itemId: item._id })
      setSelectedItem(null)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b">
      {/* Fantasy background effects */}


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-bold text-amber-300 mb-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
            style={{ fontFamily: "serif" }}
          >
            Store 🏪
          </h1>
          <p className="text-amber-100 text-lg">Welcome, brave adventurer! Browse our finest wares.</p>

        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {(
            [
              { value: "all", icon: "🛍️", label: "All Items" },
              { value: "weapon", icon: "⚔️", label: "Weapons" },
              { value: "outfit", icon: "👕", label: "Armor" },
              { value: "accessory", icon: "💍", label: "Accessories" },
              { value: "hair", icon: "💇", label: "Hairstyles" },
            ] as const
          ).map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
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

        {/* Shop grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map(
            (item: {
              _id: Id<"items">
              name: string
              svgData: string
              requiredLevel: number
              price: number
              type: string
            }) => {
              const canAfford = character.money >= item.price
              const canEquip = character.level >= item.requiredLevel

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
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
                    <span className={`font-bold ${canAfford ? "text-amber-400" : "text-red-400"}`}>
                      💰 {item.price}
                    </span>
                    <span className={`font-bold ${canEquip ? "text-emerald-400" : "text-red-400"}`}>
                      ⭐ {item.requiredLevel}
                    </span>
                  </div>
                  {(!canAfford || !canEquip) && (
                    <div className="mt-2 text-center text-xs text-red-400 font-bold">
                      {!canAfford && "Need more gold!"}
                      {canAfford && !canEquip && `Requires Lv ${item.requiredLevel}`}
                    </div>
                  )}
                </div>
              )
            },
          )}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-amber-200 text-xl">You already own all items in this category!</p>
          </div>
        )}
      </div>

      {/* Purchase modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-gradient-to-br from-slate-800 to-emerald-900 rounded-lg p-6 border-4 border-amber-600 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold text-amber-300 mb-4" style={{ fontFamily: "serif" }}>
                {selectedItem.name}
              </h3>
              <div className="flex justify-center mb-4">
                <div
                  className="w-40 h-40 bg-slate-900/50 rounded-lg border-2 border-slate-700 p-4 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: selectedItem.svgData }}
                />
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 mb-4 border-2 border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-100">Price:</span>
                  <span className="text-amber-400 font-bold text-xl">💰 {selectedItem.price} Gold</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-100">Required Level:</span>
                  <span className="text-emerald-400 font-bold text-xl">⭐ {selectedItem.requiredLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-100">Your Gold:</span>
                  <span
                    className={`font-bold text-xl ${character.money >= selectedItem.price ? "text-green-400" : "text-red-400"}`}
                  >
                    💰 {character.money}
                  </span>
                </div>
              </div>

              {character.money >= selectedItem.price && character.level >= selectedItem.requiredLevel ? (
                <button
                  onClick={() => handlePurchase(selectedItem)}
                  disabled={isPurchasing}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-lg font-bold text-lg border-2 border-emerald-400 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPurchasing ? "PURCHASING..." : "💰 PURCHASE ITEM"}
                </button>
              ) : (
                <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-4 text-red-300 font-bold">
                  {character.money < selectedItem.price && "❌ Not enough gold!"}
                  {character.money >= selectedItem.price &&
                    character.level < selectedItem.requiredLevel &&
                    `❌ Requires level ${selectedItem.requiredLevel}!`}
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-amber-200 px-4 py-2 rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
