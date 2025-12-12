
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel"

export const useInventoryService = (userId?: string) => {
    const itemsWithOwnership = useQuery(api.inventory.getAllItemsWithOwnership, userId ? { userId } : "skip")
    const inventory = useQuery(api.inventory.getPlayerInventory, userId ? { userId } : "skip")
    const purchaseItem = useMutation(api.inventory.purchaseItem)
    const equipItem = useMutation(api.inventory.equipItem)
    const addToInventory = useMutation(api.inventory.addToInventory)

    return {
        itemsWithOwnership,
        inventory,
        purchaseItem,
        equipItem,
        addToInventory,
        isLoading: itemsWithOwnership === undefined || inventory === undefined,
    }
}

export interface PurchaseItemParams {
    userId: string
    itemId: Id<"items">
}

export interface EquipItemParams {
    userId: string
    itemId: Id<"items">
}

export interface AddToInventoryParams {
    userId: string
    itemId: Id<"items">
}
