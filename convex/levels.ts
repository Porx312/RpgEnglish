import { v } from "convex/values"
import { query, mutation } from "./_generated/server"

export const getLevelData = query({
  args: { worldId: v.string(), levelNumber: v.number() },
  handler: async (ctx, args) => {
    const level = await ctx.db
      .query("levels")
      .withIndex("by_world_and_level", (q) => q.eq("worldId", args.worldId).eq("levelNumber", args.levelNumber))
      .first()

    if (!level) return null

    // Get enemy data
    const enemy = await ctx.db.get(level.enemyId)

    return {
      ...level,
      enemy,
    }
  },
})

export const getQuizzesForLevel = query({
  args: { worldId: v.string(), levelNumber: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("quizzes")
      .withIndex("by_world_and_level", (q) => q.eq("worldId", args.worldId).eq("levelNumber", args.levelNumber))
      .collect()
  },
})

export const createLevel = mutation({
  args: {
    worldId: v.string(),
    levelNumber: v.number(),
    enemyId: v.id("enemies"),
    playerMaxHP: v.number(),
    totalQuestions: v.number(),
    damagePerCorrect: v.number(),
    maxFailures: v.number(),
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

    const levelId = await ctx.db.insert("levels", {
      worldId: args.worldId,
      levelNumber: args.levelNumber,
      enemyId: args.enemyId,
      playerMaxHP: args.playerMaxHP,
      totalQuestions: args.totalQuestions,
      damagePerCorrect: args.damagePerCorrect,
      maxFailures: args.maxFailures,
    })

    return levelId
  },
})

export const getLevelsForWorld = query({
  args: { worldId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("levels")
      .withIndex("by_world", (q) => q.eq("worldId", args.worldId))
      .order("asc")
      .collect()
  },
})

export const deleteLevel = mutation({
  args: {
    levelId: v.id("levels"),
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

    await ctx.db.delete(args.levelId)
  },
})
