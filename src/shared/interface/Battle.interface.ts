import { Id } from "../../../convex/_generated/dataModel"

export interface Quiz {
    _id: Id<"quizzes">
    type: "multiple-choice" | "true-false" | "fill-blank" | "translation" | "matching"
    question: string
    correctAnswer: string
    options?: string[]
    leftItems?: string[]
    rightItems?: string[]
    correctPairs?: { left: string; right: string }[]
    explanation?: string
}

export interface Enemy {
    _id: Id<"enemies">
    name: string
    skinColor: string
    eyeColor: string
    hairColor?: string
    hairItemId?: Id<"items">
    outfitItemId?: Id<"items">
    weaponItemId?: Id<"items">
    drops?: {
        itemId: Id<"items">
        quantity: number
        dropChance: number
    }[]
}

export interface BattleStats {
    score: number
    accuracy: number
    correctAnswers: number
    totalQuestions: number
    experienceGained: number
}
