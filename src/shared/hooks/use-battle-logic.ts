"use client"

import { useEffect } from "react"
import { useBattleStore } from "../store/use-battle.store"
import { useBattleService } from "../service/battle.service"
import { Id } from "../../../convex/_generated/dataModel"

interface UseBattleLogicProps {
    userId?: string
    worldId: string
    levelNumber: number
}

export const useBattleLogic = ({ userId, worldId, levelNumber }: UseBattleLogicProps) => {
    const {
        playerHP,
        enemyHP,
        failuresCount,
        battleStatus,
        currentQuizIndex,
        score,
        correctAnswersCount,
        matchingAnswers,
        setPlayerAnimation,
        setEnemyAnimation,
        setEnemyHP,
        setPlayerHP,
        setMessage,
        incrementScore,
        incrementCorrectAnswers,
        incrementFailures,
        setCurrentQuizIndex,
        setBattleStatus,
        setDrops,
        setUserAnswer,
        setMatchingAnswers,
        drops,
    } = useBattleStore()

    const { levelData, quizzes, enemy, completeBattle, addToInventory, isLoading } = useBattleService(
        worldId,
        levelNumber,
    )

    const damagePerCorrect = levelData?.damagePerCorrect || 34
    const maxFailures = levelData?.maxFailures || 2
    const damagePerFailure = levelData?.playerMaxHP ? Math.ceil(levelData.playerMaxHP / (maxFailures + 1)) : 34

    // Handle drops when battle is won
    useEffect(() => {
        if (battleStatus === "won" && enemy && userId && drops.length === 0) {
            const droppedItems: any[] = []

            enemy.drops?.forEach((drop: any) => {
                const random = Math.random() * 100

                if (random <= drop.dropChance) {
                    droppedItems.push({
                        itemId: drop.itemId,
                        quantity: drop.quantity,
                    })

                    addToInventory({
                        userId,
                        itemId: drop.itemId,
                        quantity: drop.quantity,
                    })
                }
            })

            setDrops(droppedItems)
        }
    }, [battleStatus, enemy, userId, addToInventory, drops.length, setDrops])

    // Handle battle end conditions
    useEffect(() => {
        if (failuresCount >= maxFailures + 1 && battleStatus === "active") {
            setBattleStatus("lost")
            setMessage("💀 Defeat! The enemy was too strong!")
        } else if (enemyHP <= 0 && battleStatus === "active") {
            setBattleStatus("won")
            setMessage("🎉 Victory! You've mastered this level!")

            if (userId && quizzes && levelData?.enemyId) {
                const accuracy = (correctAnswersCount / quizzes.length) * 100
                completeBattle({
                    userId,
                    worldId,
                    levelNumber,
                    enemyId: levelData.enemyId as Id<"enemies">,
                    score,
                    accuracy,
                    correctAnswers: correctAnswersCount,
                    wordsLearned: correctAnswersCount * 2,
                    experienceGained: 50 + correctAnswersCount * 10,
                })
            }
        }
    }, [
        failuresCount,
        enemyHP,
        maxFailures,
        userId,
        worldId,
        levelNumber,
        score,
        correctAnswersCount,
        quizzes,
        completeBattle,
        levelData,
        battleStatus,
        setBattleStatus,
        setMessage,
    ])

    const handleAnswer = (selectedAnswer: string) => {
        const currentQuiz = quizzes?.[currentQuizIndex]
        if (!currentQuiz || !quizzes) return

        const isCorrect = selectedAnswer.trim().toLowerCase() === currentQuiz.correctAnswer.trim().toLowerCase()

        if (isCorrect) {
            setPlayerAnimation("attack")
            setEnemyHP(Math.max(0, enemyHP - damagePerCorrect))
            incrementScore(20)
            incrementCorrectAnswers()
            setMessage(`✨ Correct! You dealt ${damagePerCorrect} damage!`)

            setTimeout(() => {
                setPlayerAnimation("idle")
                setEnemyAnimation("hurt")
                setTimeout(() => {
                    setEnemyAnimation("idle")
                    if (enemyHP - damagePerCorrect > 0 && currentQuizIndex < quizzes.length - 1) {
                        setCurrentQuizIndex(currentQuizIndex + 1)
                    }
                }, 400)
            }, 600)
        } else {
            setEnemyAnimation("attack")
            incrementFailures()
            setPlayerHP(Math.max(0, playerHP - damagePerFailure))
            setMessage(`❌ Wrong! Enemy dealt ${damagePerFailure} damage! (${failuresCount + 1}/${maxFailures + 1} failures)`)

            setTimeout(() => {
                setEnemyAnimation("idle")
                setPlayerAnimation("hurt")
                setTimeout(() => {
                    setPlayerAnimation("idle")
                    if (failuresCount < maxFailures && currentQuizIndex < quizzes.length - 1) {
                        setCurrentQuizIndex(currentQuizIndex + 1)
                    }
                }, 400)
            }, 600)
        }
    }

    const handleMatchingSubmit = () => {
        const currentQuiz = quizzes?.[currentQuizIndex]
        if (!currentQuiz) return

        const allMatched = currentQuiz.leftItems?.every((item: string) => matchingAnswers[item])
        if (!allMatched) {
            setMessage("⚠️ Please match all items before submitting!")
            return
        }

        const correctPairs = currentQuiz.correctPairs as { left: string; right: string }[]
        const allCorrect = correctPairs.every((pair) => {
            const userAnswer = matchingAnswers[pair.left]
            return userAnswer === pair.right
        })

        handleAnswer(allCorrect ? "correct" : "incorrect")
    }

    return {
        levelData,
        quizzes,
        enemy,
        isLoading,
        handleAnswer,
        handleMatchingSubmit,
        damagePerCorrect,
        damagePerFailure,
        maxFailures,
    }
}
