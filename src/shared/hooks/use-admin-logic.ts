"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useAdminQueries, useAdminService } from "../service/admin.service"
import { useAdminStore } from "../store/use-admin.store"

export const useAdminLogic = () => {
    const { user } = useUser()
    const router = useRouter()
    const service = useAdminService()
    const queries = useAdminQueries()
    const store = useAdminStore()

    const isAdmin = queries.useIsAdmin(user?.id)
    const allItems = queries.useAllItems()
    const allEnemies = queries.useAllEnemies()
    const allWorlds = queries.useAllWorlds()
    const levelsForWorld = queries.useLevelsForWorld(store.levelForm.selectedWorldId)
    const quizzesForLevel = queries.useQuizzesForLevel(store.quizForm.selectedWorldId, store.quizForm.levelNumber)

    const handleItemSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!store.itemForm.name || !store.itemForm.svgData || !user) return

        store.setLoading(true)
        store.setMessage("")

        try {
            await service.createItem({
                ...store.itemForm,
                category: store.itemForm.category || undefined,
                isStarterItem: false,
                adminUserId: user.id,
            })
            store.setMessage("Item created successfully!")
            store.resetItemForm()
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        } finally {
            store.setLoading(false)
        }
    }

    const handleEnemySubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!store.enemyForm.name || !user) return

        store.setLoading(true)
        store.setMessage("")

        try {
            await service.createEnemy({
                name: store.enemyForm.name,
                description: store.enemyForm.description || undefined,
                hairItemId: store.enemyForm.hairItemId,
                outfitItemId: store.enemyForm.outfitItemId,
                weaponItemId: store.enemyForm.weaponItemId,
                skinColor: store.enemyForm.skinColor,
                eyeColor: store.enemyForm.eyeColor,
                hairColor: store.enemyForm.hairColor || undefined,
                baseHP: store.enemyForm.hp,
                attackPower: store.enemyForm.attack,
                defense: store.enemyForm.defense,
                experienceReward: store.enemyForm.expReward,
                moneyReward: store.enemyForm.moneyReward,
                level: store.enemyForm.level,
                adminUserId: user.id,
            })
            store.setMessage("Enemy created successfully!")
            store.resetEnemyForm()
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        } finally {
            store.setLoading(false)
        }
    }

    const handleAddDrop = async () => {
        if (!store.dropForm.enemyId || !store.dropForm.itemId || !user) return

        store.setLoading(true)
        store.setMessage("")

        try {
            await service.addEnemyDrop({
                enemyId: store.dropForm.enemyId,
                itemId: store.dropForm.itemId,
                dropChance: store.dropForm.dropChance,
                minQuantity: store.dropForm.minQuantity,
                maxQuantity: store.dropForm.maxQuantity,
                adminUserId: user.id,
            })
            store.setMessage("Drop added successfully!")
            store.resetDropForm()
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        } finally {
            store.setLoading(false)
        }
    }

    const handleWorldSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!store.worldForm.worldId || !store.worldForm.name || !user) return

        store.setLoading(true)
        store.setMessage("")

        try {
            await service.createWorld({
                ...store.worldForm,
                adminUserId: user.id,
            })
            store.setMessage("World created successfully!")
            store.resetWorldForm()
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        } finally {
            store.setLoading(false)
        }
    }

    const handleLevelSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!store.levelForm.selectedWorldId || !store.levelForm.enemyId || !user) return

        store.setLoading(true)
        store.setMessage("")

        try {
            await service.createLevel({
                worldId: store.levelForm.selectedWorldId,
                levelNumber: store.levelForm.levelNumber,
                enemyId: store.levelForm.enemyId,
                playerMaxHP: store.levelForm.playerMaxHP,
                totalQuestions: store.levelForm.totalQuestions,
                damagePerCorrect: store.levelForm.damagePerCorrect,
                maxFailures: store.levelForm.maxFailures,
                adminUserId: user.id,
            })
            store.setMessage("Level created successfully!")
            store.setLevelForm({ levelNumber: store.levelForm.levelNumber + 1 })
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        } finally {
            store.setLoading(false)
        }
    }

    const handleQuizSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user?.id) return

        store.setLoading(true)
        try {
            let correctAnswerText = ""
            const form = store.quizForm

            if (form.type === "multiple-choice" || form.type === "true-false") {
                correctAnswerText = form.options[form.correctAnswer] || ""
            } else if (form.type === "fill-blank" || form.type === "translation") {
                correctAnswerText = form.options[0] || ""
            } else if (form.type === "matching") {
                correctAnswerText = JSON.stringify(form.correctPairs)
            }

            await service.createQuiz({
                worldId: form.selectedWorldId,
                levelNumber: form.levelNumber,
                type: form.type,
                question: form.question,
                options: form.type === "matching" ? undefined : form.options.filter((o) => o !== ""),
                correctAnswer: correctAnswerText,
                explanation: form.explanation || undefined,
                orderIndex: form.orderIndex,
                adminUserId: user.id,
                leftItems: form.type === "matching" ? form.leftItems.filter((i) => i !== "") : undefined,
                rightItems: form.type === "matching" ? form.rightItems.filter((i) => i !== "") : undefined,
                correctPairs: form.type === "matching" ? form.correctPairs.filter((p) => p.left && p.right) : undefined,
            })

            alert("Quiz created successfully!")
            store.resetQuizForm()
        } catch (error) {
            console.error("Error creating quiz:", error)
            alert("Failed to create quiz")
        } finally {
            store.setLoading(false)
        }
    }

    const handleDeleteItem = async (itemId: any) => {
        if (!user || !confirm("Are you sure you want to delete this item?")) return
        try {
            await service.deleteItem(itemId, user.id)
            store.setMessage("Item deleted successfully!")
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        }
    }

    const handleDeleteEnemy = async (enemyId: any) => {
        if (!user || !confirm("Are you sure you want to delete this enemy?")) return
        try {
            await service.deleteEnemy(enemyId, user.id)
            store.setMessage("Enemy deleted successfully!")
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        }
    }

    const handleDeleteWorld = async (worldId: any) => {
        if (!user || !confirm("Are you sure? This will also delete all levels and quizzes in this world!")) return
        try {
            await service.deleteWorld(worldId, user.id)
            store.setMessage("World deleted successfully!")
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        }
    }

    const handleDeleteLevel = async (levelId: any) => {
        if (!user || !confirm("Are you sure you want to delete this level?")) return
        try {
            await service.deleteLevel(levelId, user.id)
            store.setMessage("Level deleted successfully!")
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        }
    }

    const handleDeleteQuiz = async (quizId: any) => {
        if (!user || !confirm("Are you sure you want to delete this quiz?")) return
        try {
            await service.deleteQuiz(quizId, user.id)
            store.setMessage("Quiz deleted successfully!")
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        }
    }

    const handleSeed = async () => {
        if (!user || !confirm("This will add initial items. Continue?")) return
        store.setLoading(true)
        store.setMessage("")
        try {
            const result = await service.seedInitialItems(user.id)
            store.setMessage(result.message)
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        } finally {
            store.setLoading(false)
        }
    }

    const handleSeedWorlds = async () => {
        if (!user || !confirm("This will create default worlds. Continue?")) return
        store.setLoading(true)
        store.setMessage("")
        try {
            const result = await service.seedWorlds()
            store.setMessage(result.message || "Worlds seeded!")
        } catch (error) {
            store.setMessage(`Error: ${error}`)
        } finally {
            store.setLoading(false)
        }
    }

    return {
        user,
        router,
        isAdmin,
        allItems,
        allEnemies,
        allWorlds,
        levelsForWorld,
        quizzesForLevel,
        store,
        handlers: {
            handleItemSubmit,
            handleEnemySubmit,
            handleAddDrop,
            handleWorldSubmit,
            handleLevelSubmit,
            handleQuizSubmit,
            handleDeleteItem,
            handleDeleteEnemy,
            handleDeleteWorld,
            handleDeleteLevel,
            handleDeleteQuiz,
            handleSeed,
            handleSeedWorlds,
        },
    }
}
