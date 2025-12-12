import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel"

export const useBattleService = (worldId?: string, levelNumber?: number) => {
    const levelData = useQuery(
        api.levels.getLevelData,
        worldId && levelNumber !== undefined ? { worldId, levelNumber } : "skip",
    )
    const quizzes = useQuery(
        api.quizzes.getQuizzesForLevel,
        worldId && levelNumber !== undefined ? { worldId, levelNumber } : "skip",
    )
    const enemy = useQuery(api.enemies.getById, levelData?.enemyId ? { id: levelData.enemyId as Id<"enemies"> } : "skip")
    const completeBattle = useMutation(api.battles.completeBattle)
    const addToInventory = useMutation(api.inventory.addToInventory)

    return {
        levelData,
        quizzes,
        enemy,
        completeBattle,
        addToInventory,
        isLoading: levelData === undefined || quizzes === undefined,
    }
}

export interface CompleteBattleParams {
    userId: string
    worldId: string
    levelNumber: number
    enemyId: Id<"enemies">
    score: number
    accuracy: number
    correctAnswers: number
    wordsLearned: number
    experienceGained: number
}
