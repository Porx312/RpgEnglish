import { v } from "convex/values"
import { query, mutation } from "./_generated/server"

export const getAllWorlds = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("worlds").order("asc").collect()
  },
})

export const getWorldById = query({
  args: { worldId: v.string() },
  handler: async (ctx, { worldId }) => {
    return await ctx.db
      .query("worlds")
      .filter((q) => q.eq(q.field("worldId"), worldId))
      .first()
  },
})

export const getUserProgress = query({
  args: { userId: v.string(), worldId: v.string() },
  handler: async (ctx, { userId, worldId }) => {
    return await ctx.db
      .query("battleProgress")
      .withIndex("by_user_and_world", (q) => q.eq("userId", userId).eq("worldId", worldId))
      .collect()
  },
})

export const seedWorlds = mutation({
  handler: async (ctx) => {
    const existingWorlds = await ctx.db.query("worlds").collect()
    if (existingWorlds.length > 0) {
      return { message: "Worlds already seeded" }
    }

    // Create beginner world
    await ctx.db.insert("worlds", {
      worldId: "beginner-forest",
      name: "Beginner Forest",
      description: "A peaceful forest perfect for learning the basics",
      difficulty: "Easy",
      requiredLevel: 1,
      totalLevels: 10,
      orderIndex: 0,
    })

    // Create intermediate world
    await ctx.db.insert("worlds", {
      worldId: "dark-cavern",
      name: "Dark Cavern",
      description: "Mysterious caves filled with challenging foes",
      difficulty: "Medium",
      requiredLevel: 5,
      totalLevels: 15,
      orderIndex: 1,
    })

    // Create advanced world
    await ctx.db.insert("worlds", {
      worldId: "dragon-peak",
      name: "Dragon Peak",
      description: "The ultimate challenge awaits at the mountain summit",
      difficulty: "Hard",
      requiredLevel: 10,
      totalLevels: 20,
      orderIndex: 2,
    })

    return { success: true, message: "Worlds seeded successfully" }
  },
})

export const createWorld = mutation({
  args: {
    worldId: v.string(),
    name: v.string(),
    description: v.string(),
    difficulty: v.string(),
    requiredLevel: v.number(),
    totalLevels: v.number(),
    orderIndex: v.number(),
    adminUserId: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.adminUserId))
      .first()

    if (!user?.isAdmin) {
      throw new Error("Unauthorized: Admin access required")
    }

    const worldId = await ctx.db.insert("worlds", {
      worldId: args.worldId,
      name: args.name,
      description: args.description,
      difficulty: args.difficulty,
      requiredLevel: args.requiredLevel,
      totalLevels: args.totalLevels,
      orderIndex: args.orderIndex,
    })

    return worldId
  },
})

export const deleteWorld = mutation({
  args: {
    worldId: v.id("worlds"),
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

    await ctx.db.delete(args.worldId)
  },
})
