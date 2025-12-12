import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    userId: v.string(), // clerkId
    email: v.string(),
    name: v.string(),
    isPro: v.boolean(),
    isAdmin: v.optional(v.boolean()),
    lemonSqueezyCustomerId: v.optional(v.string()),
    lemonSqueezyOrderId: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  items: defineTable({
    name: v.string(),
    type: v.string(), // "hair", "outfit", "weapon", "accessory", "face", "body"
    svgData: v.string(),
    category: v.optional(v.string()),
    requiredLevel: v.number(),
    price: v.number(),
    isStarterItem: v.boolean(),
    rarity: v.optional(v.string()), // "common", "uncommon", "rare", "epic", "legendary"
    stats: v.optional(
      v.object({
        healthBonus: v.optional(v.number()),
        energyBonus: v.optional(v.number()),
        attackBonus: v.optional(v.number()),
        defenseBonus: v.optional(v.number()),
      }),
    ),
    createdAt: v.number(),
  }).index("by_type", ["type"]),

  enemies: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    // Enemy appearance using items (body parts)
    bodyItemId: v.optional(v.id("items")), // Base body
    faceItemId: v.optional(v.id("items")), // Face/eyes
    hairItemId: v.optional(v.id("items")),
    outfitItemId: v.optional(v.id("items")),
    weaponItemId: v.optional(v.id("items")),
    accessoryItemId: v.optional(v.id("items")),
    // Colors
    skinColor: v.string(),
    eyeColor: v.string(),
    hairColor: v.optional(v.string()),
    // Stats
    baseHP: v.number(),
    attackPower: v.number(),
    defense: v.number(),
    experienceReward: v.number(),
    moneyReward: v.number(),
    // Metadata
    level: v.number(),
    createdAt: v.number(),
  }).index("by_level", ["level"]),

  enemyDrops: defineTable({
    enemyId: v.id("enemies"),
    itemId: v.id("items"),
    dropChance: v.number(), // 0-100 percentage
    minQuantity: v.number(),
    maxQuantity: v.number(),
  })
    .index("by_enemy", ["enemyId"])
    .index("by_item", ["itemId"]),

  playerInventory: defineTable({
    userId: v.string(),
    itemId: v.id("items"),
    quantity: v.number(), // Added quantity for stackable items
    acquiredAt: v.number(),
    source: v.string(), // "purchase", "level_unlock", "starter", "drop", "reward"
  })
    .index("by_user_id", ["userId"])
    .index("by_item_id", ["itemId"])
    .index("by_user_and_item", ["userId", "itemId"]),

  characters: defineTable({
    userId: v.string(),
    name: v.string(),
    gender: v.string(),
    hairItemId: v.optional(v.id("items")),
    outfitItemId: v.optional(v.id("items")),
    weaponItemId: v.optional(v.id("items")),
    accessoryItemId: v.optional(v.id("items")),
    hairColor: v.string(),
    skinColor: v.string(),
    eyeColor: v.string(),
    eyeStyle: v.optional(v.string()),
    health: v.number(),
    energy: v.number(),
    money: v.number(),
    experience: v.number(),
    level: v.number(),
    stats: v.optional(
      v.object({
        wordsLearned: v.number(),
        botsDefeated: v.number(),
        quizzesCompleted: v.number(),
        correctAnswers: v.number(),
        totalAnswers: v.number(),
        currentStreak: v.number(),
        longestStreak: v.number(),
        totalPlayTimeMinutes: v.number(),
        lastPlayedAt: v.number(),
        createdAt: v.number(),
      }),
    ),
  }).index("by_user_id", ["userId"]),

  dailyActivity: defineTable({
    userId: v.string(),
    date: v.string(),
    quizzesCompleted: v.number(),
    wordsLearned: v.number(),
    minutesPlayed: v.number(),
    experienceGained: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_user_and_date", ["userId", "date"]),

  worlds: defineTable({
    worldId: v.string(),
    name: v.string(),
    description: v.string(),
    difficulty: v.string(),
    requiredLevel: v.number(),
    totalLevels: v.number(),
    orderIndex: v.number(),
  }).index("by_world_id", ["worldId"]),

  levels: defineTable({
    worldId: v.string(),
    levelNumber: v.number(),
    enemyId: v.id("enemies"), // Now references enemies table
    playerMaxHP: v.number(),
    totalQuestions: v.number(),
    damagePerCorrect: v.number(),
    maxFailures: v.number(),
  })
    .index("by_world", ["worldId"])
    .index("by_world_and_level", ["worldId", "levelNumber"])
    .index("by_enemy", ["enemyId"]),

  quizzes: defineTable({
    worldId: v.string(),
    levelNumber: v.number(),
    type: v.string(), // "multiple-choice", "true-false", "fill-blank", "translation", "matching"
    question: v.string(),
    options: v.optional(v.array(v.string())),
    correctAnswer: v.string(), // Changed from union to always string for consistency
    explanation: v.optional(v.string()),
    orderIndex: v.number(),
    leftItems: v.optional(v.array(v.string())), // For matching quizzes
    rightItems: v.optional(v.array(v.string())), // For matching quizzes
    correctPairs: v.optional(v.array(v.object({ left: v.string(), right: v.string() }))), // For matching
  })
    .index("by_world_and_level", ["worldId", "levelNumber"])
    .index("by_world_level_order", ["worldId", "levelNumber", "orderIndex"]),

  battleProgress: defineTable({
    userId: v.string(),
    worldId: v.string(),
    levelNumber: v.number(),
    completed: v.boolean(),
    score: v.number(),
    accuracy: v.number(),
    attempts: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user_id", ["userId"])
    .index("by_user_and_world", ["userId", "worldId"])
    .index("by_user_world_level", ["userId", "worldId", "levelNumber"]),
})
