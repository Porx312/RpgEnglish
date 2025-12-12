
import { create } from "zustand"

interface ShopStore {
    selectedCategory: "all" | "hair" | "outfit" | "weapon" | "accessory"
    selectedItem: any | null
    isPurchasing: boolean

    setSelectedCategory: (category: "all" | "hair" | "outfit" | "weapon" | "accessory") => void
    setSelectedItem: (item: any | null) => void
    setIsPurchasing: (value: boolean) => void
}

export const useShopStore = create<ShopStore>((set) => ({
    selectedCategory: "all",
    selectedItem: null,
    isPurchasing: false,

    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setSelectedItem: (item) => set({ selectedItem: item }),
    setIsPurchasing: (value) => set({ isPurchasing: value }),
}))
