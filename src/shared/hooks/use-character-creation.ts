"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { api } from "../../../convex/_generated/api"
import { useCharacterCreationStore } from "../store/use-character-creation.store"

export const useCharacterCreation = () => {
    const { user } = useUser()
    const router = useRouter()
    const createCharacter = useMutation(api.characters.createCharacter)
    const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")
    const items = useQuery(api.items.getAllItems)

    const store = useCharacterCreationStore()

    // Auto-select first items
    useEffect(() => {
        if (items && items.length > 0 && !store.selectedHairItemId) {
            const hairItems = items.filter((item) => item.type === "hair")
            const outfitItems = items.filter((item) => item.type === "outfit")
            const weaponItems = items.filter((item) => item.type === "weapon")

            if (hairItems[0]) store.setSelectedHairItemId(hairItems[0]._id)
            if (outfitItems[0]) store.setSelectedOutfitItemId(outfitItems[0]._id)
            if (weaponItems[0]) store.setSelectedWeaponItemId(weaponItems[0]._id)
        }
    }, [items, store.selectedHairItemId])

    // Redirect if character exists
    useEffect(() => {
        if (character !== undefined && character !== null) {
            router.push("/dashboard")
        }
    }, [character, router])

    const handleCreateCharacter = async () => {
        if (!store.characterName.trim() || !user?.id) return

        store.setIsCreating(true)
        try {
            await createCharacter({
                userId: user.id,
                name: store.characterName,
                gender: store.gender,
                hairItemId: store.selectedHairItemId,
                outfitItemId: store.selectedOutfitItemId,
                weaponItemId: store.selectedWeaponItemId,
                hairColor: store.selectedHairColor,
                skinColor: store.selectedSkinColor,
                eyeColor: store.selectedEyeColor,
            })
            router.push("/dashboard")
        } catch (error) {
            console.error("Error creating character:", error)
            alert("Failed to create character")
        } finally {
            store.setIsCreating(false)
        }
    }

    return {
        user,
        items,
        character,
        handleCreateCharacter,
    }
}
