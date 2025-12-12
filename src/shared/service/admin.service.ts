import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel"

export const useAdminService = () => {
    const createItem = useMutation(api.items.createItem)
    const deleteItem = useMutation(api.items.deleteItem)
    const createEnemy = useMutation(api.enemies.createEnemy)
    const deleteEnemy = useMutation(api.enemies.deleteEnemy)
    const addEnemyDrop = useMutation(api.enemies.addEnemyDrop)
    const seedInitialItems = useMutation(api.items.seedInitialItems)

    const createWorld = useMutation(api.worlds.createWorld)
    const deleteWorld = useMutation(api.worlds.deleteWorld)
    const createLevel = useMutation(api.levels.createLevel)
    const deleteLevel = useMutation(api.levels.deleteLevel)
    const createQuiz = useMutation(api.quizzes.createQuiz)
    const deleteQuiz = useMutation(api.quizzes.deleteQuiz)
    const seedWorlds = useMutation(api.worlds.seedWorlds)

    return {
        // Items
        createItem: async (data: any) => createItem(data),
        deleteItem: async (itemId: Id<"items">, adminUserId: string) => deleteItem({ itemId, adminUserId }),
        seedInitialItems: async (adminUserId: string) => seedInitialItems({ adminUserId }),

        // Enemies
        createEnemy: async (data: any) => createEnemy(data),
        deleteEnemy: async (enemyId: Id<"enemies">, adminUserId: string) => deleteEnemy({ enemyId, adminUserId }),
        addEnemyDrop: async (data: any) => addEnemyDrop(data),

        // Worlds
        createWorld: async (data: any) => createWorld(data),
        deleteWorld: async (worldId: Id<"worlds">, adminUserId: string) => deleteWorld({ worldId, adminUserId }),
        seedWorlds: async () => seedWorlds(),

        // Levels
        createLevel: async (data: any) => createLevel(data),
        deleteLevel: async (levelId: Id<"levels">, adminUserId: string) => deleteLevel({ levelId, adminUserId }),

        // Quizzes
        createQuiz: async (data: any) => createQuiz(data),
        deleteQuiz: async (quizId: Id<"quizzes">, adminUserId: string) => deleteQuiz({ quizId, adminUserId }),
    }
}

export const useAdminQueries = () => {
    const useIsAdmin = (userId?: string) => useQuery(api.users.isAdmin, userId ? { userId } : "skip")
    const useAllItems = () => useQuery(api.items.getAllItems)
    const useAllEnemies = () => useQuery(api.enemies.getAllEnemies)
    const useAllWorlds = () => useQuery(api.worlds.getAllWorlds)
    const useLevelsForWorld = (worldId?: string) => useQuery(api.levels.getLevelsForWorld, worldId ? { worldId } : "skip")
    const useQuizzesForLevel = (worldId?: string, levelNumber?: number) =>
        useQuery(api.quizzes.getQuizzesForLevel, worldId && levelNumber ? { worldId, levelNumber } : "skip")

    return {
        useIsAdmin,
        useAllItems,
        useAllEnemies,
        useAllWorlds,
        useLevelsForWorld,
        useQuizzesForLevel,
    }
}
