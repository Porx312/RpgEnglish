import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get player's inventory
export const getPlayerInventory = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const inventoryItems = await ctx.db
            .query("playerInventory")
            .withIndex("by_user_id")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect()

        // Fetch full item details for each inventory item
        const itemsWithDetails = await Promise.all(
            inventoryItems.map(async (invItem) => {
                const item = await ctx.db.get(invItem.itemId)
                return {
                    ...invItem,
                    item,
                }
            }),
        )

        return itemsWithDetails
    },
})

// Check if player owns an item
export const hasItem = query({
    args: { userId: v.string(), itemId: v.id("items") },
    handler: async (ctx, args) => {
        const inventoryItem = await ctx.db
            .query("playerInventory")
            .withIndex("by_user_and_item")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .filter((q) => q.eq(q.field("itemId"), args.itemId))
            .first()

        return !!inventoryItem
    },
})

// Get all items with ownership status
export const getAllItemsWithOwnership = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const allItems = await ctx.db.query("items").collect()
        const playerInventory = await ctx.db
            .query("playerInventory")
            .withIndex("by_user_id")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect()

        const ownedItemIds = new Set(playerInventory.map((inv) => inv.itemId))

        return allItems.map((item) => ({
            ...item,
            isOwned: ownedItemIds.has(item._id),
        }))
    },
})

// Purchase an item
export const purchaseItem = mutation({
    args: {
        userId: v.string(),
        itemId: v.id("items"),
    },
    handler: async (ctx, args) => {
        // Get character
        const character = await ctx.db
            .query("characters")
            .withIndex("by_user_id")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .first()

        if (!character) {
            throw new Error("Character not found")
        }

        // Get item
        const item = await ctx.db.get(args.itemId)
        if (!item) {
            throw new Error("Item not found")
        }

        // Check if player already owns the item
        const alreadyOwned = await ctx.db
            .query("playerInventory")
            .withIndex("by_user_and_item")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .filter((q) => q.eq(q.field("itemId"), args.itemId))
            .first()

        if (alreadyOwned) {
            throw new Error("You already own this item")
        }

        // Check level requirement
        if (character.level < item.requiredLevel) {
            throw new Error(`Level ${item.requiredLevel} required`)
        }

        // Check if player has enough money
        if (character.money < item.price) {
            throw new Error("Not enough money")
        }

        // Deduct money from character
        await ctx.db.patch(character._id, {
            money: character.money - item.price,
        })

        // Add item to inventory
        await ctx.db.insert("playerInventory", {
            userId: args.userId,
            itemId: args.itemId,
            quantity: 1, // ★ REQUIRED FIELD ★
            acquiredAt: Date.now(),
            source: "purchase",
        })

        return { success: true }
    },
})

// Equip an item
export const equipItem = mutation({
    args: {
        userId: v.string(),
        itemId: v.id("items"),
    },
    handler: async (ctx, args) => {
        // Check if player owns the item
        const inventoryItem = await ctx.db
            .query("playerInventory")
            .withIndex("by_user_and_item")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .filter((q) => q.eq(q.field("itemId"), args.itemId))
            .first()

        if (!inventoryItem) {
            throw new Error("You don't own this item")
        }

        // Get item details
        const item = await ctx.db.get(args.itemId)
        if (!item) {
            throw new Error("Item not found")
        }

        // Get character
        const character = await ctx.db
            .query("characters")
            .withIndex("by_user_id")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .first()

        if (!character) {
            throw new Error("Character not found")
        }

        // Update character based on item type
        const updates: any = {}
        if (item.type === "hair") {
            updates.hairItemId = args.itemId
        } else if (item.type === "outfit") {
            updates.outfitItemId = args.itemId
        } else if (item.type === "weapon") {
            updates.weaponItemId = args.itemId
        } else if (item.type === "accessory") {
            updates.accessoryItemId = args.itemId
        }

        await ctx.db.patch(character._id, updates)

        return { success: true }
    },
})

// Initialize starter items for a new character
export const initializeStarterItems = mutation({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        // Get all starter items
        const starterItems = await ctx.db
            .query("items")
            .filter((q) => q.eq(q.field("isStarterItem"), true))
            .collect()

        // Add each starter item to player's inventory
        for (const item of starterItems) {
            const alreadyOwned = await ctx.db
                .query("playerInventory")
                .withIndex("by_user_and_item")
                .filter((q) => q.eq(q.field("userId"), args.userId))
                .filter((q) => q.eq(q.field("itemId"), item._id))
                .first()

            if (!alreadyOwned) {
                await ctx.db.insert("playerInventory", {
                    userId: args.userId,
                    itemId: item._id,
                    quantity: 1, // ★ REQUIRED PROPERTY ADDED ★
                    acquiredAt: Date.now(),
                    source: "starter",
                })
            }
        }

        return { success: true }
    },
})

export const addToInventory = mutation({
    args: {
        userId: v.string(),
        itemId: v.id("items"),
        quantity: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const quantity = args.quantity || 1

        // Check if item already exists in inventory
        const existing = await ctx.db
            .query("playerInventory")
            .withIndex("by_user_and_item")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .filter((q) => q.eq(q.field("itemId"), args.itemId))
            .first()

        if (existing) {
            // Update quantity
            await ctx.db.patch(existing._id, {
                quantity: (existing.quantity || 1) + quantity,
            })
        } else {
            // Add new item to inventory
            await ctx.db.insert("playerInventory", {
                userId: args.userId,
                itemId: args.itemId,
                quantity,
                acquiredAt: Date.now(),
                source: "drop",
            })
        }

        return { success: true }
    },
})
