
import { create } from "zustand"
import type { Character } from "../interface/Character.interface"

interface CharacterStore {
    character: Character | null | undefined
    setCharacter: (character: Character | null | undefined) => void
    updateCharacter: (updates: Partial<Character>) => void
}

export const useCharacterStore = create<CharacterStore>((set) => ({
    character: undefined,
    setCharacter: (character) => set({ character }),
    updateCharacter: (updates) =>
        set((state) => ({
            character: state.character ? { ...state.character, ...updates } : null,
        })),
}))
