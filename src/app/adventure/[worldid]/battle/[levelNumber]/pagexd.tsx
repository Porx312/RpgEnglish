"use client"

import { useUser } from "@clerk/nextjs"
import { useQuery, useMutation } from "convex/react"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { api } from "../../../../../../convex/_generated/api"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { CharacterPreview } from "@/shared/components/AvatarPreview/CharacterPreview"
import CharacterCard from "../../../../../shared/layout/adventure/playerCard"
import QuizCard from "../../../../../shared/layout/adventure/quizzCard"
import TittleSvg from "@/shared/lib/svgAssets/TittleSvg"
import MarcSvg from "@/shared/lib/svgAssets/MarcSvg"

export default function BattlePage() {
  const { user } = useUser()
  const router = useRouter()
  const params = useParams()
  const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")
  const items = useQuery(api.items.getAllItems)

  const worldId = decodeURIComponent(params.worldid as string)
  const levelNumber = Number.parseInt(params.levelNumber as string)

  console.log("[v0] Battle params (raw):", { rawWorldId: params.worldid, worldId, levelNumber })

  const levelData = useQuery(api.levels.getLevelData, { worldId, levelNumber })
  const quizzes = useQuery(api.quizzes.getQuizzesForLevel, { worldId, levelNumber })

  console.log("[v0] Level data:", levelData)
  console.log("[v0] Quizzes:", quizzes)

  const enemy = useQuery(api.enemies.getById, levelData?.enemyId ? { id: levelData.enemyId as Id<"enemies"> } : "skip")

  console.log("[v0] Enemy:", enemy)

  const allWorlds = useQuery(api.worlds.getAllWorlds)
  console.log("[v0] All worlds:", allWorlds)

  const completeBattle = useMutation(api.battles.completeBattle)
  const addToInventory = useMutation(api.inventory.addToInventory)

  const [playerHP, setPlayerHP] = useState(100)
  const [enemyHP, setEnemyHP] = useState(100)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [playerAnimation, setPlayerAnimation] = useState<"idle" | "attack" | "hurt">("idle")
  const [enemyAnimation, setEnemyAnimation] = useState<"idle" | "attack" | "hurt">("idle")
  const [battleStatus, setBattleStatus] = useState<"active" | "won" | "lost">("active")
  const [message, setMessage] = useState("⚔️ Battle Start!")
  const [score, setScore] = useState(0)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [failuresCount, setFailuresCount] = useState(0)
  const [drops, setDrops] = useState<any[]>([])
  const [quizType, setQuizType] = useState<string>("multiple-choice")
  const [userAnswer, setUserAnswer] = useState<string>("")
  const [matchingAnswers, setMatchingAnswers] = useState<{ [key: string]: string }>({})

  const currentQuiz = quizzes && quizzes[currentQuizIndex]

  const damagePerCorrect = levelData?.damagePerCorrect || 34
  const maxFailures = levelData?.maxFailures || 2
  const damagePerFailure = levelData?.playerMaxHP ? Math.ceil(levelData.playerMaxHP / (maxFailures + 1)) : 34
  useEffect(() => {
    if (
      battleStatus === "won" &&
      enemy &&
      user &&
      drops.length === 0 // evitar volver a correr
    ) {
      const droppedItems: any[] = []

      enemy.drops?.forEach((drop: any) => {
        const random = Math.random() * 100

        if (random <= drop.dropChance) {
          droppedItems.push({
            itemId: drop.itemId,
            quantity: drop.quantity,
          })

          addToInventory({
            userId: user.id,
            itemId: drop.itemId,
            quantity: drop.quantity,
          })
        }
      })

      setDrops(droppedItems)
    }
  }, [battleStatus, enemy, user, addToInventory])

  useEffect(() => {
    if (failuresCount >= maxFailures + 1) {
      setBattleStatus("lost")
      setMessage("💀 Defeat! The enemy was too strong!")
    } else if (enemyHP <= 0) {
      setBattleStatus("won")
      setMessage("🎉 Victory! You've mastered this level!")

      if (user && quizzes && levelData?.enemyId) {
        const accuracy = (correctAnswersCount / quizzes.length) * 100
        completeBattle({
          userId: user.id,
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
    user,
    worldId,
    levelNumber,
    score,
    correctAnswersCount,
    quizzes,
    completeBattle,
    levelData,
  ])

  useEffect(() => {
    if (currentQuiz) {
      setQuizType(currentQuiz.type)
      setUserAnswer("")
      setMatchingAnswers({})
    }
  }, [currentQuizIndex, currentQuiz])

  const handleAnswer = (selectedAnswer: string) => {
    if (!currentQuiz) return
    const quiz = currentQuiz

    const isCorrect = selectedAnswer.trim().toLowerCase() === quiz.correctAnswer.trim().toLowerCase()

    console.log("[v0] Answer check:", {
      selectedAnswer,
      correctAnswer: quiz.correctAnswer,
      isCorrect,
    })

    if (isCorrect) {
      setPlayerAnimation("attack")
      setEnemyHP((prev) => Math.max(0, prev - damagePerCorrect))
      setScore((prev) => prev + 20)
      setCorrectAnswersCount((prev) => prev + 1)
      setMessage(`✨ Correct! You dealt ${damagePerCorrect} damage!`)

      setTimeout(() => {
        setPlayerAnimation("idle")
        setEnemyAnimation("hurt")
        setTimeout(() => {
          setEnemyAnimation("idle")
          if (enemyHP - damagePerCorrect > 0 && quizzes && currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex((prev) => prev + 1)
          }
        }, 400)
      }, 600)
    } else {
      setEnemyAnimation("attack")
      setFailuresCount((prev) => prev + 1)
      setPlayerHP((prev) => Math.max(0, prev - damagePerFailure))
      setMessage(`❌ Wrong! Enemy dealt ${damagePerFailure} damage! (${failuresCount + 1}/${maxFailures + 1} failures)`)

      setTimeout(() => {
        setEnemyAnimation("idle")
        setPlayerAnimation("hurt")
        setTimeout(() => {
          setPlayerAnimation("idle")
          if (failuresCount < maxFailures && quizzes && currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex((prev) => prev + 1)
          }
        }, 400)
      }, 600)
    }
  }

  const handleMatchingSubmit = () => {
    if (!currentQuiz) return
    const quiz = currentQuiz

    // Check if all items are matched
    const allMatched = quiz.leftItems?.every((item: string) => matchingAnswers[item])
    if (!allMatched) {
      setMessage("⚠️ Please match all items before submitting!")
      return
    }

    // Check if matches are correct using correctPairs field
    const correctPairs = quiz.correctPairs as { left: string; right: string }[]

    console.log("[v0] Matching verification:", {
      userAnswers: matchingAnswers,
      correctPairs: correctPairs,
    })

    const allCorrect = correctPairs.every((pair) => {
      const userAnswer = matchingAnswers[pair.left]
      const isCorrect = userAnswer === pair.right
      console.log(`[v0] Checking pair: ${pair.left} -> ${pair.right}, User: ${userAnswer}, Correct: ${isCorrect}`)
      return isCorrect
    })

    console.log("[v0] All matches correct:", allCorrect)
    handleAnswer(allCorrect ? "correct" : "incorrect")
  }

  if (character === null) {
    router.push("/character-creation")
    return null
  }

  if (!user || character === undefined || items === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2d1f15]">
        <div className="text-center">
          <p className="text-amber-200 text-xl font-bold animate-pulse mb-2">⚔️ Loading Battle...</p>
          <p className="text-amber-600 text-sm">
            User: {user ? "✓" : "✗"} | Character:{" "}
            {character === undefined ? "Loading..." : character === null ? "None" : "✓"} | Items:{" "}
            {items === undefined ? "Loading..." : "✓"}
          </p>
        </div>
      </div>
    )
  }

  if (!levelData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2d1f15]">
        <div className="text-center">
          <p className="text-amber-200 text-xl font-bold animate-pulse mb-2">⚔️ Loading Level Data...</p>
          <p className="text-amber-600 text-sm mb-2">
            World: {worldId} | Level: {levelNumber}
          </p>
          <div className="mt-4 p-4 bg-[#3a2718] rounded border-2 border-amber-700 max-w-md mx-auto">
            <p className="text-amber-400 text-xs mb-2">Debug Info:</p>
            <p className="text-amber-600 text-xs">Raw worldId: {params.worldid as string}</p>
            <p className="text-amber-600 text-xs">Decoded worldId: {worldId}</p>
            <p className="text-amber-600 text-xs">Available worlds: {allWorlds?.map((w) => w.worldId).join(", ")}</p>
          </div>
          <button
            onClick={() => router.push("/adventure")}
            className="mt-4 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg"
          >
            Back to Adventure
          </button>
        </div>
      </div>
    )
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2d1f15]">
        <div className="text-center">
          <p className="text-red-400 text-xl font-bold mb-2">❌ No quizzes found for this level</p>
          <p className="text-amber-600 text-sm mb-4">
            World: {worldId} | Level: {levelNumber}
          </p>
          <button
            onClick={() => router.push("/adventure")}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg"
          >
            Back to Adventure
          </button>
        </div>
      </div>
    )
  }

  if (!enemy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2d1f15]">
        <div className="text-center">
          <p className="text-amber-200 text-xl font-bold animate-pulse mb-2">⚔️ Loading Enemy...</p>
          <p className="text-amber-600 text-sm">Enemy ID: {levelData.enemyId}</p>
        </div>
      </div>
    )
  }

  const hairItem = items.find((item) => item._id === character.hairItemId)
  const outfitItem = items.find((item) => item._id === character.outfitItemId)
  const weaponItem = items.find((item) => item._id === character.weaponItemId)
  const accessoryItem = items.find((item) => item._id === character.accessoryItemId)

  const enemyHairItem = items.find((item) => item._id === enemy.hairItemId)
  const enemyOutfitItem = items.find((item) => item._id === enemy.outfitItemId)
  const enemyWeaponItem = items.find((item) => item._id === enemy.weaponItemId)

  if (battleStatus !== "active") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2d1f15] to-[#1a110d] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-[#4a3728] rounded-2xl border-4 border-[#6b4423] shadow-2xl p-8">
          <div className="text-center">
            <div className="text-8xl mb-4">{battleStatus === "won" ? "🏆" : "💀"}</div>
            <h1 className="text-4xl font-bold text-amber-200 mb-2">
              {battleStatus === "won" ? "VICTORY!" : "DEFEAT!"}
            </h1>
            <p className="text-xl text-amber-400 mb-6">{message}</p>

            <div className="bg-[#3a2718] rounded-lg p-6 mb-6 border-2 border-[#5a3a23]">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-amber-700 text-sm">Score</p>
                  <p className="text-2xl font-bold text-amber-200">{score}</p>
                </div>
                <div>
                  <p className="text-amber-700 text-sm">Accuracy</p>
                  <p className="text-2xl font-bold text-amber-200">
                    {Math.round((correctAnswersCount / quizzes.length) * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-amber-700 text-sm">Correct Answers</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    {correctAnswersCount}/{quizzes.length}
                  </p>
                </div>
                <div>
                  <p className="text-amber-700 text-sm">EXP Gained</p>
                  <p className="text-2xl font-bold text-blue-400">+{50 + correctAnswersCount * 10}</p>
                </div>
              </div>
            </div>

            {battleStatus === "won" && drops.length > 0 && (
              <div className="bg-amber-900/30 rounded-lg p-4 mb-6 border-2 border-amber-700">
                <h3 className="text-lg font-bold text-amber-200 mb-3">💎 Drops Received!</h3>
                <div className="grid grid-cols-2 gap-2">
                  {drops.map((drop, index) => {
                    const item = items.find((i) => i._id === drop.itemId)
                    return (
                      <div key={index} className="bg-[#4a3728] rounded p-2 border border-amber-700">
                        <p className="text-amber-200 font-bold">{item?.name || "Item"}</p>
                        <p className="text-amber-400 text-sm">x{drop.quantity}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => router.push("/adventure")}
                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-lg border-2 border-amber-800 transition-all"
              >
                Back to Adventure
              </button>
              {battleStatus === "lost" && (
                <button
                  onClick={() => {
                    setPlayerHP(100)
                    setEnemyHP(100)
                    setCurrentQuizIndex(0)
                    setBattleStatus("active")
                    setScore(0)
                    setCorrectAnswersCount(0)
                    setFailuresCount(0)
                    setMessage("⚔️ Battle Start!")
                    setDrops([])
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg border-2 border-red-800 transition-all"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d1f15] to-[#1a110d] flex items-center justify-center ">
      <div className="bg-[#4a3728] w-full min-h-screen rounded-lg border-4 border-[#6b4423] shadow-2xl flex item-center justify-between flex-col">
        <div className="relative min-w-full  px-8 py-10 bg-gradient-to-br  to-amber-950  shadow-2xl max-w-4xl mx-auto overflow-hidden">

          <div className="relative flex  items-center justify-center">

            <TittleSvg className="absolute w-[100%]" />
            <div className="text-center z-10">
              <h1 className="text-2xl z-10 font-bold text-amber-200 mb-1">
                {worldId.toUpperCase().replace("-", " ")} - LEVEL {levelNumber}
              </h1>
              <p className="text-amber-400 z-10 font-bold text-lg">{message}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mb-4">
          {/* Player Card */}

          <CharacterCard character={{ name: character.name }} playerHP={playerHP}>
            <CharacterPreview
              skinColor={character.skinColor}
              eyeColor={character.eyeColor}
              hairColor={character.hairColor}
              hairSvg={hairItem?.svgData}
              outfitSvg={outfitItem?.svgData}
              weaponSvg={weaponItem?.svgData}
              accesorysvg={accessoryItem?.svgData}
              animation={playerAnimation}
              className="w-64 h-64"
            />
          </CharacterCard>
          {/* Quiz Card */}
          {currentQuiz && (
            <QuizCard currentQuizIndex={currentQuizIndex} quizzes={quizzes} currentQuiz={currentQuiz}>


              {currentQuiz.type === "multiple-choice" && (
                <div className="space-y-3">
                  {currentQuiz.options?.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-lg border-2 border-amber-800 transition-all text-left"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentQuiz.type === "true-false" && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer("True")}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-lg border-2 border-green-800 transition-all"
                  >
                    ✓ True
                  </button>
                  <button
                    onClick={() => handleAnswer("False")}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-lg border-2 border-red-800 transition-all"
                  >
                    ✗ False
                  </button>
                </div>
              )}

              {(currentQuiz.type === "fill-blank" || currentQuiz.type === "translation") && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && userAnswer.trim()) {
                        handleAnswer(userAnswer)
                      }
                    }}
                    placeholder={
                      currentQuiz.type === "fill-blank" ? "Type your answer..." : "Type the translation..."
                    }
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-amber-600 rounded-lg text-white text-lg focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleAnswer(userAnswer)}
                    disabled={!userAnswer.trim()}
                    className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg border-2 border-amber-800 transition-all"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {currentQuiz.type === "matching" && (
                <div className="space-y-4">
                  <p className="text-amber-400 text-sm text-center mb-4">Match the items from left to right</p>
                  {currentQuiz.leftItems?.map((leftItem: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-800 border-2 border-amber-600 rounded-lg px-4 py-2 text-amber-200 font-bold">
                        {leftItem}
                      </div>
                      <span className="text-amber-600 text-xl">→</span>
                      <select
                        value={matchingAnswers[leftItem] || ""}
                        onChange={(e) => setMatchingAnswers({ ...matchingAnswers, [leftItem]: e.target.value })}
                        className="flex-1 px-4 py-2 bg-slate-800 border-2 border-amber-600 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="">Select...</option>
                        {currentQuiz.rightItems?.map((rightItem: string, ridx: number) => (
                          <option key={ridx} value={rightItem}>
                            {rightItem}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  <button
                    onClick={handleMatchingSubmit}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-lg border-2 border-amber-800 transition-all mt-4"
                  >
                    Submit Matches
                  </button>
                </div>
              )}

              {currentQuiz.explanation && (
                <div className="mt-4 p-3 bg-amber-900/30 rounded border border-amber-700">
                  <p className="text-amber-300 text-sm">💡 {currentQuiz.explanation}</p>
                </div>
              )}
            </QuizCard>

          )}

          {/* Enemy Card */}
          <CharacterCard character={{ name: enemy.name }} playerHP={enemyHP}>
            <div className="transform scale-x-[-1]">
              <CharacterPreview
                skinColor={enemy.skinColor}
                eyeColor={enemy.eyeColor}
                hairColor={enemy.hairColor || "#000000"}
                hairSvg={enemyHairItem?.svgData}
                outfitSvg={enemyOutfitItem?.svgData}
                weaponSvg={enemyWeaponItem?.svgData}
                animation={enemyAnimation}
                className="w-64 h-64"
              />
            </div>
          </CharacterCard>
        </div>
        <div className="relative min-w-full h-[250px]  px-8 py-10 bg-gradient-to-br  flex items-center justify-center to-amber-950  shadow-2xl max-w-4xl mx-auto overflow-hidden">
          <MarcSvg className="absolute" />
          {/* Progress Indicators */}
          <div className="relative z-10 flex flex-col items-center gap-4">

            {/* PROGRESS SECTION */}
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 text-lg font-extrabold drop-shadow-md tracking-wide">
                QUEST PROGRESS:
              </span>

              <div className="flex items-center gap-2">
                {quizzes.map((_: any, i: number) => (
                  <div
                    key={i}
                    className={`
              w-6 h-6 rounded-md border-2 transition-all 
              shadow-md
              ${i < currentQuizIndex
                        ? "bg-green-500 border-green-400 shadow-green-700"
                        : i === currentQuizIndex
                          ? "bg-yellow-500 border-yellow-400 animate-pulse"
                          : "bg-[#3a2718] border-[#5a3a23]"
                      }
            `}
                  />
                ))}
              </div>
            </div>

            {/* FAIL COUNT */}
            <div className="text-center">
              <span className="text-red-400 text-md font-bold drop-shadow-sm">
                💔 FAILURES: {failuresCount}/{maxFailures + 1}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}
