import { useMutation, useQuery } from "convex/react"
import { Id } from "../../../convex/_generated/dataModel"
import { api } from "../../../convex/_generated/api"

export interface CreateCharacterParams {
    userId: string
    name: string
    gender: string
    hairItemId?: Id<"items">
    outfitItemId?: Id<"items">
    weaponItemId?: Id<"items">
    hairColor: string
    skinColor: string
    eyeColor: string
}

export const useCharacterService = (userId?: string) => {
    const character = useQuery(api.characters.getCharacter, userId ? { userId } : "skip")
    const createCharacter = useMutation(api.characters.createCharacter)
    const updateCharacter = useMutation(api.characters.updateCharacter)


    return {
        character,
        createCharacter,
        updateCharacter,
        isLoading: character === undefined,
    }
}
