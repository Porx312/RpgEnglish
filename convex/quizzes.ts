import { v } from "convex/values"
import { query, mutation } from "./_generated/server"

export const createQuiz = mutation({
    args: {
        worldId: v.string(),
        levelNumber: v.number(),
        type: v.string(),
        question: v.string(),
        options: v.optional(v.array(v.string())),
        correctAnswer: v.string(), // Changed to string for consistency
        explanation: v.optional(v.string()),
        orderIndex: v.number(),
        adminUserId: v.string(),
        leftItems: v.optional(v.array(v.string())),
        rightItems: v.optional(v.array(v.string())),
        correctPairs: v.optional(v.array(v.object({ left: v.string(), right: v.string() }))),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_user_id", (q) => q.eq("userId", args.adminUserId))
            .first()

        if (!user?.isAdmin) {
            throw new Error("Unauthorized: Admin access required")
        }

        const { adminUserId, ...quizData } = args

        const quizId = await ctx.db.insert("quizzes", quizData)

        return quizId
    },
})

export const getQuizzesForLevel = query({
    args: { worldId: v.string(), levelNumber: v.number() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("quizzes")
            .withIndex("by_world_and_level", (q) => q.eq("worldId", args.worldId).eq("levelNumber", args.levelNumber))
            .order("asc")
            .collect()
    },
})

export const deleteQuiz = mutation({
    args: {
        quizId: v.id("quizzes"),
        adminUserId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_user_id", (q) => q.eq("userId", args.adminUserId))
            .first()

        if (!user?.isAdmin) {
            throw new Error("Unauthorized: Admin access required")
        }

        await ctx.db.delete(args.quizId)
    },
})
