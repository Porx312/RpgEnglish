"use client"

import { Id } from "../../../convex/_generated/dataModel"
import { Character } from "../interface/Character.interface"
import { useInventoryService } from "../service/inventory.service"
import { useInventoryStore } from "../store/use-inventory-store"


export const useInventoryLogic = (userId?: string, character?: Character | null) => {
    const { selectedType, selectedItem, setSelectedItem } = useInventoryStore()

    const { equipItem, itemsWithOwnership } = useInventoryService(userId)

    const handleEquip = async (itemId: Id<"items">) => {
        if (!userId) {
            alert("Please log in to equip items!")
            return
        }
        if (!selectedType) {
            alert("No slot selected!")
            return
        }

        try {
            await equipItem({
                userId,
                itemId,
            })
            setSelectedItem(null)
        } catch (error: any) {
            console.error(error)
        }
    }

    const isEquipped = (itemId: Id<"items">) => {
        if (!character) return false
        if (selectedType === "hair") return character.hairItemId === itemId
        if (selectedType === "outfit") return character.outfitItemId === itemId
        if (selectedType === "weapon") return character.weaponItemId === itemId
        if (selectedType === "accessory") return character.accessoryItemId === itemId
        return false
    }

    return {
        selectedType,
        selectedItem,
        setSelectedItem,
        handleEquip,
        isEquipped,
        itemsWithOwnership,
    }
}
