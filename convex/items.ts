import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Create a new item (admin only)
export const createItem = mutation({
  args: {
    name: v.string(),
    type: v.string(), // "hair", "outfit", "weapon", "accessory", "body", "face"
    svgData: v.string(),
    category: v.optional(v.string()),
    requiredLevel: v.number(),
    price: v.number(),
    isStarterItem: v.boolean(),
    rarity: v.optional(v.string()),
    adminUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.adminUserId))
      .first()

    if (!user || !user.isAdmin) {
      throw new Error("Unauthorized: Admin access required")
    }

    const itemId = await ctx.db.insert("items", {
      name: args.name,
      type: args.type,
      svgData: args.svgData,
      category: args.category,
      requiredLevel: args.requiredLevel,
      price: args.price,
      isStarterItem: args.isStarterItem,
      rarity: args.rarity,
      createdAt: Date.now(),
    })

    return { success: true, itemId }
  },
})

// Get all items by type
export const getItemsByType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("items")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect()

    return items
  },
})

// Get all items (for admin panel)
export const getAllItems = query({
  handler: async (ctx) => {
    const items = await ctx.db.query("items").collect()
    return items
  },
})

// Delete an item (admin only)
export const deleteItem = mutation({
  args: {
    itemId: v.id("items"),
    adminUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.adminUserId))
      .first()

    if (!user || !user.isAdmin) {
      throw new Error("Unauthorized: Admin access required")
    }

    await ctx.db.delete(args.itemId)
    return { success: true }
  },
})

// Get a single item by ID
export const getItemById = query({
  args: { itemId: v.id("items") },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.itemId)
    return item
  },
})

export const seedInitialItems = mutation({
  args: {
    adminUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.adminUserId))
      .first()

    if (!user || !user.isAdmin) {
      throw new Error("Unauthorized: Admin access required")
    }

    const existingItems = await ctx.db.query("items").collect()
    if (existingItems.length > 0) {
      return { success: false, message: "Items already seeded" }
    }

    // Seed hair items
    await ctx.db.insert("items", {
      name: "Wild Spiky Hair",
      type: "hair",
      svgData: `<g filter="url(#filter11_i_225_17)"><path d="M653.698 253.312C658.898 253.312 728.698 340.812 734.198 343.812C739.697 346.812 727.365 248.146 730.698 250.812C734.031 253.479 776.698 284.812 783.198 282.312C789.698 279.812 741.698 194.812 684.698 170.812C609.698 150.812 526.698 179.312 479.198 199.812C400.798 221.012 277.198 334.979 225.198 389.312C224.032 401.812 210.698 459.811 213.198 457.812C215.698 455.812 239.198 444.312 241.698 441.312C244.198 438.311 252.198 504.311 253.698 502.312C255.198 500.312 278.198 470.811 278.198 473.312C278.198 475.812 304.698 523.311 304.698 521.312C304.698 519.312 338.198 477.312 338.198 477.312C338.198 477.312 302.568 467 284.198 432.812C266.198 399.312 299.699 367.313 301.698 366.312C303.698 365.312 307.197 412.311 308.198 410.312C309.198 408.312 329.697 373.811 331.198 373.312C332.698 372.812 360.198 404.312 361.198 406.812C362.197 409.311 383.197 313.811 384.698 316.312C386.198 318.812 399.198 338.312 401.198 339.812C403.197 341.311 452.698 278.812 453.198 274.812C453.697 270.811 466.698 322.312 469.698 319.812C472.698 317.312 520.698 256.811 521.198 258.812C521.698 260.812 542.031 312.145 547.198 300.812C552.365 289.479 565.698 255.312 566.198 253.312C566.698 251.312 621.698 322.312 625.698 319.812C629.698 317.312 650.698 264.312 653.698 253.312Z" fill="currentColor"/></g><path d="M653.698 253.312C658.898 253.312 728.698 340.812 734.198 343.812C739.697 346.812 727.365 248.146 730.698 250.812C734.031 253.479 776.698 284.812 783.198 282.312C789.698 279.812 741.698 194.812 684.698 170.812C609.698 150.812 526.698 179.312 479.198 199.812C400.798 221.012 277.198 334.979 225.198 389.312C224.032 401.812 210.698 459.811 213.198 457.812C215.698 455.812 239.198 444.312 241.698 441.312C244.198 438.311 252.198 504.311 253.698 502.312C255.198 500.312 278.198 470.811 278.198 473.312C278.198 475.812 304.698 523.311 304.698 521.312C304.698 519.312 338.198 477.312 338.198 477.312C338.198 477.312 302.568 467 284.198 432.812C266.1... <truncated>
      category: "male",
      requiredLevel: 1,
      price: 0,
      isStarterItem: true,
      rarity: "common",
      createdAt: Date.now(),
    })

    // Seed outfit items
    await ctx.db.insert("items", {
      name: "Adventurer Tunic",
      type: "outfit",
      svgData: \`<g filter="url(#filter4_i_225_17)"><path d="M364.698 483.812C374.298 472.212 493.365 522.655 538.698 532.322L590.198 532.32C610.198 530.32 604.698 703.32 604.698 728.82C620.698 740.82 617.198 769.32 610.198 781.82C486.698 836.82 300.397 780.639 318.698 775.32C336.999 770 364.698 502.313 364.698 483.812Z" fill="#965716"/></g><path d="M364.698 483.812C374.298 472.212 493.365 522.655 538.698 532.322L590.198 532.32C610.198 530.32 604.698 703.32 604.698 728.82C620.698 740.82 617.198 769.32 610.198 781.82C486.698 836.82 300.397 780.639 318.698 775.32C336.999 770 364.698 502.313 364.698 483.812Z" stroke="black" strokeWidth="11"/>`,
      category: "male",
      requiredLevel: 1,
      price: 0,
      isStarterItem: true,
      rarity: "common",
      createdAt: Date.now(),
    })

    return { success: true, message: "Initial items seeded successfully" }
  },
})

