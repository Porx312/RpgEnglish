"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { useCharacterService } from "../service/character.service"
import { useItemsService } from "../service/items.service"
import { useCharacterStore } from "../store/use-character.store"

export const useCharacter = () => {
    const { user } = useUser()
    const userId = user?.id

    const { character, isLoading: characterLoading } = useCharacterService(userId)
    const { items, isLoading: itemsLoading } = useItemsService()
    const { setCharacter } = useCharacterStore()

    // Sync character with store
    useEffect(() => {
        if (character) {
            setCharacter(character)
        }
    }, [character, setCharacter])

    const getEquippedItems = () => {
        if (!character || !items) return {}

        return {
            hairItem: items.find((item) => item._id === character.hairItemId),
            outfitItem: items.find((item) => item._id === character.outfitItemId),
            weaponItem: items.find((item) => item._id === character.weaponItemId),
            accessoryItem: items.find((item) => item._id === character.accessoryItemId),
        }
    }

    return {
        character,
        items,
        user,
        isLoading: characterLoading || itemsLoading,
        equippedItems: getEquippedItems(),
    }
}
