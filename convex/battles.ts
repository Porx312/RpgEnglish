import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const completeBattle = mutation({
  args: {
    userId: v.string(),
    worldId: v.string(),
    levelNumber: v.number(),
    score: v.number(),
    accuracy: v.number(),
    correctAnswers: v.number(),
    wordsLearned: v.number(),
    experienceGained: v.number(),
    enemyId: v.id("enemies"),
  },
  handler: async (ctx, args) => {
    const { userId, worldId, levelNumber, score, accuracy, correctAnswers, wordsLearned, experienceGained, enemyId } =
      args

    // Check if progress exists
    const existingProgress = await ctx.db
      .query("battleProgress")
      .withIndex("by_user_world_level", (q) =>
        q.eq("userId", userId).eq("worldId", worldId).eq("levelNumber", levelNumber),
      )
      .first()

    if (existingProgress) {
      await ctx.db.patch(existingProgress._id, {
        completed: true,
        score: Math.max(existingProgress.score, score),
        accuracy: Math.max(existingProgress.accuracy, accuracy),
        attempts: existingProgress.attempts + 1,
        completedAt: Date.now(),
      })
    } else {
      await ctx.db.insert("battleProgress", {
        userId,
        worldId,
        levelNumber,
        completed: true,
        score,
        accuracy,
        attempts: 1,
        completedAt: Date.now(),
      })
    }

    // Get enemy for rewards
    const enemy = await ctx.db.get(enemyId)

    // Update character stats
    const character = await ctx.db
      .query("characters")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first()

    if (character && enemy) {
      const newExperience = character.experience + experienceGained + enemy.experienceReward
      const newLevel = Math.floor(newExperience / 100) + 1
      const newMoney = character.money + enemy.moneyReward

      await ctx.db.patch(character._id, {
        experience: newExperience,
        level: newLevel,
        money: newMoney,
        stats: {
          createdAt: character.stats?.createdAt || Date.now(),
          wordsLearned: (character.stats?.wordsLearned || 0) + wordsLearned,
          botsDefeated: (character.stats?.botsDefeated || 0) + 1,
          quizzesCompleted: (character.stats?.quizzesCompleted || 0) + 1,
          correctAnswers: (character.stats?.correctAnswers || 0) + correctAnswers,
          totalAnswers: (character.stats?.totalAnswers || 0) + 5,
          currentStreak: character.stats?.currentStreak || 0,
          longestStreak: character.stats?.longestStreak || 0,
          totalPlayTimeMinutes: character.stats?.totalPlayTimeMinutes || 0,
          lastPlayedAt: Date.now(),
        },
      })
    }

    return { success: true }
  },
})

export const getBattleProgress = query({
  args: { userId: v.string(), worldId: v.string(), levelNumber: v.number() },
  handler: async (ctx, { userId, worldId, levelNumber }) => {
    return await ctx.db
      .query("battleProgress")
      .withIndex("by_user_world_level", (q) =>
        q.eq("userId", userId).eq("worldId", worldId).eq("levelNumber", levelNumber),
      )
      .first()
  },
})
