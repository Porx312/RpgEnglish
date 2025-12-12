import { Id } from "../../../convex/_generated/dataModel"

export interface CharacterCreationFormData {
    name: string
    gender: "male" | "female"
    hairItemId?: Id<"items">
    outfitItemId?: Id<"items">
    weaponItemId?: Id<"items">
    hairColor: string
    skinColor: string
    eyeColor: string
}

export interface CharacterCustomization {
    skinColor: string
    eyeColor: string
    hairColor: string
    hairSvg?: string
    outfitSvg?: string
    weaponSvg?: string
}
