import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createCharacter = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    gender: v.string(),
    hairItemId: v.optional(v.id("items")),
    outfitItemId: v.optional(v.id("items")),
    weaponItemId: v.optional(v.id("items")),
    hairColor: v.string(),
    skinColor: v.string(),
    eyeColor: v.string(),
    eyeStyle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if character already exists
    const existingCharacter = await ctx.db
      .query("characters")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()

    if (existingCharacter) {
      throw new Error("Character already exists")
    }

    // Create new character with default stats
    await ctx.db.insert("characters", {
      userId: args.userId,
      name: args.name,
      gender: args.gender,
      hairItemId: args.hairItemId,
      outfitItemId: args.outfitItemId,
      weaponItemId: args.weaponItemId,
      hairColor: args.hairColor,
      skinColor: args.skinColor,
      eyeColor: args.eyeColor,
      eyeStyle: args.eyeStyle,
      health: 5,
      energy: 5,
      money: 5,
      experience: 0,
      level: 1,
    })

    // Get all starter items
    const starterItems = await ctx.db
      .query("items")
      .filter((q) => q.eq(q.field("isStarterItem"), true))
      .collect()

    // Add each starter item to player's inventory
    for (const item of starterItems) {
      await ctx.db.insert("playerInventory", {
        userId: args.userId,
        itemId: item._id,
        quantity: 1, // or whatever default you want
        acquiredAt: Date.now(),
        source: "starter",
      });
    }


    return { success: true }
  },
})

export const getCharacter = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    if (!args.userId) return null

    const character = await ctx.db
      .query("characters")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()

    return character
  },
})

export const updateCharacter = mutation({
  args: {
    userId: v.string(),
    name: v.optional(v.string()),
    hairItemId: v.optional(v.id("items")),
    outfitItemId: v.optional(v.id("items")),
    weaponItemId: v.optional(v.id("items")),
    accessoryItemId: v.optional(v.id("items")),
    hairColor: v.optional(v.string()),
    skinColor: v.optional(v.string()),
    eyeColor: v.optional(v.string()),
    eyeStyle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const character = await ctx.db
      .query("characters")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()

    if (!character) {
      throw new Error("Character not found")
    }

    const updates: any = {}
    if (args.name !== undefined) updates.name = args.name
    if (args.hairItemId !== undefined) updates.hairItemId = args.hairItemId
    if (args.outfitItemId !== undefined) updates.outfitItemId = args.outfitItemId
    if (args.weaponItemId !== undefined) updates.weaponItemId = args.weaponItemId
    if (args.accessoryItemId !== undefined) updates.accessoryItemId = args.accessoryItemId
    if (args.hairColor !== undefined) updates.hairColor = args.hairColor
    if (args.skinColor !== undefined) updates.skinColor = args.skinColor
    if (args.eyeColor !== undefined) updates.eyeColor = args.eyeColor
    if (args.eyeStyle !== undefined) updates.eyeStyle = args.eyeStyle

    await ctx.db.patch(character._id, updates)

    return { success: true }
  },
})
