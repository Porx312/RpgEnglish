import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Create a new enemy (admin only)
export const createEnemy = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        bodyItemId: v.optional(v.id("items")),
        faceItemId: v.optional(v.id("items")),
        hairItemId: v.optional(v.id("items")),
        outfitItemId: v.optional(v.id("items")),
        weaponItemId: v.optional(v.id("items")),
        accessoryItemId: v.optional(v.id("items")),
        skinColor: v.string(),
        eyeColor: v.string(),
        hairColor: v.optional(v.string()),
        baseHP: v.number(),
        attackPower: v.number(),
        defense: v.number(),
        experienceReward: v.number(),
        moneyReward: v.number(),
        level: v.number(),
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

        const enemyId = await ctx.db.insert("enemies", {
            name: args.name,
            description: args.description,
            bodyItemId: args.bodyItemId,
            faceItemId: args.faceItemId,
            hairItemId: args.hairItemId,
            outfitItemId: args.outfitItemId,
            weaponItemId: args.weaponItemId,
            accessoryItemId: args.accessoryItemId,
            skinColor: args.skinColor,
            eyeColor: args.eyeColor,
            hairColor: args.hairColor,
            baseHP: args.baseHP,
            attackPower: args.attackPower,
            defense: args.defense,
            experienceReward: args.experienceReward,
            moneyReward: args.moneyReward,
            level: args.level,
            createdAt: Date.now(),
        })

        return { success: true, enemyId }
    },
})

// Get all enemies
export const getAllEnemies = query({
    handler: async (ctx) => {
        return await ctx.db.query("enemies").collect()
    },
})

// Get enemy by ID with items
export const getEnemyWithItems = query({
    args: { enemyId: v.id("enemies") },
    handler: async (ctx, args) => {
        const enemy = await ctx.db.get(args.enemyId)
        if (!enemy) return null

        const [bodyItem, faceItem, hairItem, outfitItem, weaponItem, accessoryItem] = await Promise.all([
            enemy.bodyItemId ? ctx.db.get(enemy.bodyItemId) : null,
            enemy.faceItemId ? ctx.db.get(enemy.faceItemId) : null,
            enemy.hairItemId ? ctx.db.get(enemy.hairItemId) : null,
            enemy.outfitItemId ? ctx.db.get(enemy.outfitItemId) : null,
            enemy.weaponItemId ? ctx.db.get(enemy.weaponItemId) : null,
            enemy.accessoryItemId ? ctx.db.get(enemy.accessoryItemId) : null,
        ])

        return {
            ...enemy,
            bodyItem,
            faceItem,
            hairItem,
            outfitItem,
            weaponItem,
            accessoryItem,
        }
    },
})

// Add drop to enemy
export const addEnemyDrop = mutation({
    args: {
        enemyId: v.id("enemies"),
        itemId: v.id("items"),
        dropChance: v.number(),
        minQuantity: v.number(),
        maxQuantity: v.number(),
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

        const dropId = await ctx.db.insert("enemyDrops", {
            enemyId: args.enemyId,
            itemId: args.itemId,
            dropChance: args.dropChance,
            minQuantity: args.minQuantity,
            maxQuantity: args.maxQuantity,
        })

        return { success: true, dropId }
    },
})

// Get enemy drops
export const getEnemyDrops = query({
    args: { enemyId: v.id("enemies") },
    handler: async (ctx, args) => {
        const drops = await ctx.db
            .query("enemyDrops")
            .withIndex("by_enemy", (q) => q.eq("enemyId", args.enemyId))
            .collect()

        const dropsWithItems = await Promise.all(
            drops.map(async (drop) => {
                const item = await ctx.db.get(drop.itemId)
                return { ...drop, item }
            }),
        )

        return dropsWithItems
    },
})

// Roll for drops after defeating enemy
export const rollEnemyDrops = mutation({
    args: {
        userId: v.string(),
        enemyId: v.id("enemies"),
    },
    handler: async (ctx, args) => {
        const drops = await ctx.db
            .query("enemyDrops")
            .withIndex("by_enemy", (q) => q.eq("enemyId", args.enemyId))
            .collect()

        const receivedItems: any[] = []

        for (const drop of drops) {
            const roll = Math.random() * 100
            if (roll <= drop.dropChance) {
                const quantity = Math.floor(Math.random() * (drop.maxQuantity - drop.minQuantity + 1)) + drop.minQuantity

                // Add to player inventory
                const existing = await ctx.db
                    .query("playerInventory")
                    .withIndex("by_user_and_item", (q) => q.eq("userId", args.userId).eq("itemId", drop.itemId))
                    .first()

                if (existing) {
                    await ctx.db.patch(existing._id, {
                        quantity: existing.quantity + quantity,
                    })
                } else {
                    await ctx.db.insert("playerInventory", {
                        userId: args.userId,
                        itemId: drop.itemId,
                        quantity,
                        acquiredAt: Date.now(),
                        source: "drop",
                    })
                }

                const item = await ctx.db.get(drop.itemId)
                receivedItems.push({ item, quantity })
            }
        }

        return { receivedItems }
    },
})

// Delete enemy (admin only)
export const deleteEnemy = mutation({
    args: {
        enemyId: v.id("enemies"),
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

        await ctx.db.delete(args.enemyId)
        return { success: true }
    },
})

// Get enemy by ID for battle page
export const getById = query({
    args: { id: v.id("enemies") },
    handler: async (ctx, args) => {
        const enemy = await ctx.db.get(args.id)
        if (!enemy) return null

        // Get drops for this enemy
        const drops = await ctx.db
            .query("enemyDrops")
            .withIndex("by_enemy", (q) => q.eq("enemyId", args.id))
            .collect()

        return {
            ...enemy,
            drops,
        }
    },
})
