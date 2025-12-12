"use client"

import { Character } from "../interface/Character.interface"
import { useInventoryService } from "../service/inventory.service"
import { useShopStore } from "../store/use-shop.store"
import { Id } from "../../../convex/_generated/dataModel"

export const useShopLogic = (userId?: string, character?: Character | null) => {
    const { selectedCategory, selectedItem, isPurchasing, setSelectedItem, setIsPurchasing } = useShopStore()

    const { purchaseItem } = useInventoryService(userId)

    const handlePurchase = async (item: any) => {
        if (!userId) {
            alert("Please log in to purchase items!")
            return
        }
        if (!character) {
            alert("Character not found!")
            return
        }

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
            await purchaseItem({ userId, itemId: item._id as Id<"items"> })
            setSelectedItem(null)
            alert(`Successfully purchased ${item.name}!`)
        } catch (error: any) {
            alert(error.message || "Failed to purchase item")
        } finally {
            setIsPurchasing(false)
        }
    }

    return {
        selectedCategory,
        selectedItem,
        isPurchasing,
        setSelectedItem,
        handlePurchase,
    }
}
