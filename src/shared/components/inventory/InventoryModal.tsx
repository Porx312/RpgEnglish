"use client"

import { CharacterPreview } from "@/shared/components/AvatarPreview/CharacterPreview"
import { CharacterStats } from "@/shared/components/dashboard/CharacterStats"
import { InventoryItemGrid } from "@/shared/components/inventory/InventoryItemsGrid"
import { InventoryTypeTabs } from "@/shared/components/inventory/InventoryTypeTabs"
import { useCharacter } from "@/shared/hooks/use-character"
import { useInventoryLogic } from "@/shared/hooks/use-inventory"
import { GameModalLayout } from "@/shared/layout/inventoryShop/GameModalLayout"
import { useInventoryStore } from "@/shared/store/use-inventory-store"

interface InventoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InventoryModal({ isOpen, onClose }: InventoryModalProps) {
  const { character, user, isLoading, equippedItems } = useCharacter()
  const { selectedType, setSelectedType } = useInventoryStore()
  const { selectedItem, setSelectedItem, handleEquip, isEquipped, itemsWithOwnership } = useInventoryLogic(
    user?.id,
    character,
  )

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="text-amber-300 text-xl font-bold animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!character) {
    return null
  }

  const filteredItems = itemsWithOwnership?.filter((item: { type: string }) => item.type === selectedType) || []

  return (
    <GameModalLayout isOpen={isOpen} onClose={onClose} title="Inventory">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
      
            <CharacterPreview
              skinColor={character?.skinColor || "#D4A574"}
              eyeColor={character?.eyeColor || "#000000"}
              hairColor={character?.hairColor || "#8B4513"}
              hairSvg={equippedItems.hairItem?.svgData}
              outfitSvg={equippedItems.outfitItem?.svgData}
              weaponSvg={equippedItems.weaponItem?.svgData}
              accesorysvg={equippedItems.accessoryItem?.svgData}
              animation="idle"
              className="w-96 h-96"
            />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#4a3728] h rounded-lg p-6 border-4 border-[#6b4423] shadow-xl">
            <InventoryTypeTabs selectedType={selectedType} onTypeChange={setSelectedType} />
            <InventoryItemGrid items={filteredItems} isEquipped={isEquipped} onItemClick={setSelectedItem} />
          </div>
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[#4a3728] rounded-lg p-6 border-4 border-[#6b4423] max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-amber-200 mb-2" style={{ fontFamily: "serif" }}>
                {selectedItem.name}
              </h3>
              <div className="flex justify-center mb-4">
                <div
                  className="w-32 h-32 bg-[#3a2718] rounded-lg border-2 border-[#5a3a23] p-4 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: selectedItem.svgData }}
                />
              </div>
              <div className="text-amber-700 mb-4">
                <p className="text-sm">
                  Required Level: <span className="text-amber-300 font-bold">{selectedItem.requiredLevel}</span>
                </p>
                <p className="text-sm">
                  Value: <span className="text-amber-300 font-bold">{selectedItem.price} 💰</span>
                </p>
              </div>
              {isEquipped(selectedItem._id) ? (
                <div className="bg-amber-500 text-[#2d1f15] px-4 py-2 rounded-lg font-bold">✓ EQUIPPED</div>
              ) : (
                <button
                  onClick={() => handleEquip(selectedItem._id)}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-bold border-2 border-amber-400 transition-all"
                >
                  EQUIP ITEM
                </button>
              )}
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full mt-4 bg-[#3a2718] hover:bg-[#4a3728] text-amber-200 px-4 py-2 rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </GameModalLayout>
  )
}
