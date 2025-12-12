
import { create } from "zustand"

interface InventoryStore {
    selectedType: "hair" | "outfit" | "weapon" | "accessory"
    selectedItem: any | null

    setSelectedType: (type: "hair" | "outfit" | "weapon" | "accessory") => void
    setSelectedItem: (item: any | null) => void
}

export const useInventoryStore = create<InventoryStore>((set) => ({
    selectedType: "weapon",
    selectedItem: null,

    setSelectedType: (type) => set({ selectedType: type }),
    setSelectedItem: (item) => set({ selectedItem: item }),
}))
