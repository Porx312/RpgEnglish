import { Id } from "../../../convex/_generated/dataModel"

export interface Character {
    _id: Id<"characters">
    userId: string
    name: string
    gender: string
    skinColor: string
    eyeColor: string
    hairColor: string
    hairItemId?: Id<"items">
    outfitItemId?: Id<"items">
    weaponItemId?: Id<"items">
    accessoryItemId?: Id<"items">
    level: number
    experience: number
    health: number
    energy: number
    money: number
}

export interface Item {
    _id: Id<"items">
    name: string
    svgData: string
    type: "hair" | "outfit" | "weapon" | "accessory" | "body" | "face"
    requiredLevel: number
    price: number
    category?: string
    isStarterItem: boolean
    rarity: string
}