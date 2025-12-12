import { Id } from "../../../convex/_generated/dataModel"

export interface ItemFormData {
    name: string
    type: string
    svgData: string
    category: string
    requiredLevel: number
    price: number
    rarity: string
}

export interface EnemyFormData {
    name: string
    description: string
    level: number
    hp: number
    attack: number
    defense: number
    expReward: number
    moneyReward: number
    skinColor: string
    eyeColor: string
    hairColor: string
    hairItemId?: Id<"items">
    outfitItemId?: Id<"items">
    weaponItemId?: Id<"items">
}

export interface DropFormData {
    enemyId: Id<"enemies">
    itemId: Id<"items">
    dropChance: number
    minQuantity: number
    maxQuantity: number
}

export interface WorldFormData {
    worldId: string
    name: string
    description: string
    difficulty: string
    requiredLevel: number
    totalLevels: number
    orderIndex: number
}

export interface LevelFormData {
    worldId: string
    levelNumber: number
    enemyId: Id<"enemies">
    playerMaxHP: number
    totalQuestions: number
    damagePerCorrect: number
    maxFailures: number
}

export interface QuizFormData {
    worldId: string
    levelNumber: number
    type: string
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
    orderIndex: number
    leftItems?: string[]
    rightItems?: string[]
    correctPairs?: { left: string; right: string }[]
}
