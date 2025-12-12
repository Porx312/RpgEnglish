import { create } from "zustand"
import { Id } from "../../../convex/_generated/dataModel"

interface CharacterCreationStore {
    characterName: string
    setCharacterName: (name: string) => void

    gender: "male" | "female"
    setGender: (gender: "male" | "female") => void

    selectedHairItemId?: Id<"items">
    setSelectedHairItemId: (id: Id<"items"> | undefined) => void

    selectedOutfitItemId?: Id<"items">
    setSelectedOutfitItemId: (id: Id<"items"> | undefined) => void

    selectedWeaponItemId?: Id<"items">
    setSelectedWeaponItemId: (id: Id<"items"> | undefined) => void

    selectedHairColor: string
    setSelectedHairColor: (color: string) => void

    selectedSkinColor: string
    setSelectedSkinColor: (color: string) => void

    selectedEyeColor: string
    setSelectedEyeColor: (color: string) => void

    isCreating: boolean
    setIsCreating: (creating: boolean) => void

    reset: () => void
}

const initialState = {
    characterName: "",
    gender: "male" as const,
    selectedHairColor: "#8B4513",
    selectedSkinColor: "#D4A574",
    selectedEyeColor: "#000000",
    isCreating: false,
}

export const useCharacterCreationStore = create<CharacterCreationStore>((set) => ({
    ...initialState,

    setCharacterName: (name) => set({ characterName: name }),
    setGender: (gender) => set({ gender }),
    setSelectedHairItemId: (id) => set({ selectedHairItemId: id }),
    setSelectedOutfitItemId: (id) => set({ selectedOutfitItemId: id }),
    setSelectedWeaponItemId: (id) => set({ selectedWeaponItemId: id }),
    setSelectedHairColor: (color) => set({ selectedHairColor: color }),
    setSelectedSkinColor: (color) => set({ selectedSkinColor: color }),
    setSelectedEyeColor: (color) => set({ selectedEyeColor: color }),
    setIsCreating: (creating) => set({ isCreating: creating }),

    reset: () => set(initialState),
}))
