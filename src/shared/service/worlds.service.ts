import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel"

export const useWorldsService = (userId?: string) => {
    const worlds = useQuery(api.worlds.getAllWorlds)
    const seedWorlds = useMutation(api.worlds.seedWorlds)
    const createWorld = useMutation(api.worlds.createWorld)
    const deleteWorld = useMutation(api.worlds.deleteWorld)

    return {
        worlds,
        seedWorlds,
        createWorld,
        deleteWorld,
        isLoading: worlds === undefined,
    }
}

export const useUserProgress = (userId?: string, worldId?: Id<"worlds">) => {
    const progress = useQuery(api.worlds.getUserProgress, userId && worldId ? { userId, worldId } : "skip")

    return {
        progress,
        isLoading: progress === undefined,
    }
}
