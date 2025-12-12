"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel"

export default function AdminPanel() {
  const { user } = useUser()
  const router = useRouter()
  const isAdmin = useQuery(api.users.isAdmin, user ? { userId: user.id } : "skip")
  const allItems = useQuery(api.items.getAllItems)
  const allEnemies = useQuery(api.enemies.getAllEnemies)
  const allWorlds = useQuery(api.worlds.getAllWorlds)

  const createItem = useMutation(api.items.createItem)
  const deleteItem = useMutation(api.items.deleteItem)
  const createEnemy = useMutation(api.enemies.createEnemy)
  const deleteEnemy = useMutation(api.enemies.deleteEnemy)
  const addEnemyDrop = useMutation(api.enemies.addEnemyDrop)
  const seedInitialItems = useMutation(api.items.seedInitialItems)

  const createWorld = useMutation(api.worlds.createWorld)
  const deleteWorld = useMutation(api.worlds.deleteWorld)
  const createLevel = useMutation(api.levels.createLevel)
  const deleteLevel = useMutation(api.levels.deleteLevel)
  const createQuiz = useMutation(api.quizzes.createQuiz)
  const deleteQuiz = useMutation(api.quizzes.deleteQuiz)
  const seedWorlds = useMutation(api.worlds.seedWorlds)

  const [activeTab, setActiveTab] = useState<"items" | "enemies" | "worlds">("items")

  // Item form states
  const [name, setName] = useState("")
  const [type, setType] = useState("hair")
  const [svgData, setSvgData] = useState("")
  const [category, setCategory] = useState("")
  const [requiredLevel, setRequiredLevel] = useState(1)
  const [price, setPrice] = useState(0)
  const [rarity, setRarity] = useState("common")

  const [enemyName, setEnemyName] = useState("")
  const [enemyDescription, setEnemyDescription] = useState("")
  const [enemyLevel, setEnemyLevel] = useState(1)
  const [enemyHP, setEnemyHP] = useState(100)
  const [enemyAttack, setEnemyAttack] = useState(10)
  const [enemyDefense, setEnemyDefense] = useState(5)
  const [enemyExpReward, setEnemyExpReward] = useState(50)
  const [enemyMoneyReward, setEnemyMoneyReward] = useState(10)
  const [enemySkinColor, setEnemySkinColor] = useState("#D4A574")
  const [enemyEyeColor, setEnemyEyeColor] = useState("#000000")
  const [enemyHairColor, setEnemyHairColor] = useState("#8B4513")
  const [selectedHairItem, setSelectedHairItem] = useState<Id<"items"> | undefined>()
  const [selectedOutfitItem, setSelectedOutfitItem] = useState<Id<"items"> | undefined>()
  const [selectedWeaponItem, setSelectedWeaponItem] = useState<Id<"items"> | undefined>()

  const [dropEnemyId, setDropEnemyId] = useState<Id<"enemies"> | undefined>()
  const [dropItemId, setDropItemId] = useState<Id<"items"> | undefined>()
  const [dropChance, setDropChance] = useState(50)
  const [dropMinQty, setDropMinQty] = useState(1)
  const [dropMaxQty, setDropMaxQty] = useState(1)

  // world form states
  const [worldId, setWorldId] = useState("")
  const [worldName, setWorldName] = useState("")
  const [worldDescription, setWorldDescription] = useState("")
  const [worldDifficulty, setWorldDifficulty] = useState("Easy")
  const [worldRequiredLevel, setWorldRequiredLevel] = useState(1)
  const [worldTotalLevels, setWorldTotalLevels] = useState(10)
  const [worldOrderIndex, setWorldOrderIndex] = useState(0)

  // level form states
  const [selectedWorldForLevel, setSelectedWorldForLevel] = useState<string>("")
  const [levelNumber, setLevelNumber] = useState(1)
  const [levelEnemyId, setLevelEnemyId] = useState<Id<"enemies"> | undefined>()
  const [levelPlayerMaxHP, setLevelPlayerMaxHP] = useState(100)
  const [levelTotalQuestions, setLevelTotalQuestions] = useState(10)
  const [levelDamagePerCorrect, setLevelDamagePerCorrect] = useState(10)
  const [levelMaxFailures, setLevelMaxFailures] = useState(3)

  // quiz form states
  const [selectedWorldForQuiz, setSelectedWorldForQuiz] = useState<string>("")
  const [quizLevelNumber, setQuizLevelNumber] = useState(1)
  const [quizType, setQuizType] = useState("multiple-choice")
  const [quizQuestion, setQuizQuestion] = useState("")
  const [quizOptions, setQuizOptions] = useState(["", "", "", ""])
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState(0)
  const [quizExplanation, setQuizExplanation] = useState("")
  const [quizOrderIndex, setQuizOrderIndex] = useState(0)

  // New states for matching quiz type
  const [quizLeftItems, setQuizLeftItems] = useState<string[]>(["", "", "", ""])
  const [quizRightItems, setQuizRightItems] = useState<string[]>(["", "", "", ""])
  const [quizCorrectPairs, setQuizCorrectPairs] = useState<{ left: string; right: string }[]>([])

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Get levels for selected world
  const levelsForWorld = useQuery(
    api.levels.getLevelsForWorld,
    selectedWorldForLevel ? { worldId: selectedWorldForLevel } : "skip",
  )

  // Get quizzes for selected world and level
  const quizzesForLevel = useQuery(
    api.quizzes.getQuizzesForLevel,
    selectedWorldForQuiz && quizLevelNumber ? { worldId: selectedWorldForQuiz, levelNumber: quizLevelNumber } : "skip",
  )

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-emerald-400">
        <p className="text-white text-xl">Please sign in to access admin panel</p>
      </div>
    )
  }

  if (isAdmin === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-emerald-400">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-emerald-400">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Unauthorized: Admin access required</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-amber-400 text-amber-900 font-bold rounded-lg shadow-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !svgData || !user) return

    setLoading(true)
    setMessage("")

    try {
      await createItem({
        name,
        type,
        svgData,
        category: category || undefined,
        requiredLevel,
        price,
        isStarterItem: false,
        rarity,
        adminUserId: user.id,
      })
      setMessage("Item created successfully!")
      setName("")
      setSvgData("")
      setCategory("")
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEnemySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!enemyName || !user) return

    setLoading(true)
    setMessage("")

    try {
      await createEnemy({
        name: enemyName,
        description: enemyDescription || undefined,
        hairItemId: selectedHairItem,
        outfitItemId: selectedOutfitItem,
        weaponItemId: selectedWeaponItem,
        skinColor: enemySkinColor,
        eyeColor: enemyEyeColor,
        hairColor: enemyHairColor || undefined,
        baseHP: enemyHP,
        attackPower: enemyAttack,
        defense: enemyDefense,
        experienceReward: enemyExpReward,
        moneyReward: enemyMoneyReward,
        level: enemyLevel,
        adminUserId: user.id,
      })
      setMessage("Enemy created successfully!")
      setEnemyName("")
      setEnemyDescription("")
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDrop = async () => {
    if (!dropEnemyId || !dropItemId || !user) return

    setLoading(true)
    setMessage("")

    try {
      await addEnemyDrop({
        enemyId: dropEnemyId,
        itemId: dropItemId,
        dropChance,
        minQuantity: dropMinQty,
        maxQuantity: dropMaxQty,
        adminUserId: user.id,
      })
      setMessage("Drop added successfully!")
      setDropItemId(undefined)
      setDropChance(50)
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteItem = async (itemId: Id<"items">) => {
    if (!user || !confirm("Are you sure you want to delete this item?")) return

    try {
      await deleteItem({ itemId, adminUserId: user.id })
      setMessage("Item deleted successfully!")
    } catch (error) {
      setMessage(`Error: ${error}`)
    }
  }

  const handleDeleteEnemy = async (enemyId: Id<"enemies">) => {
    if (!user || !confirm("Are you sure you want to delete this enemy?")) return

    try {
      await deleteEnemy({ enemyId, adminUserId: user.id })
      setMessage("Enemy deleted successfully!")
    } catch (error) {
      setMessage(`Error: ${error}`)
    }
  }

  const handleSeed = async () => {
    if (!user || !confirm("This will add initial items. Continue?")) return

    setLoading(true)
    setMessage("")

    try {
      const result = await seedInitialItems({ adminUserId: user.id })
      setMessage(result.message)
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleWorldSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!worldId || !worldName || !user) return

    setLoading(true)
    setMessage("")

    try {
      await createWorld({
        worldId,
        name: worldName,
        description: worldDescription,
        difficulty: worldDifficulty,
        requiredLevel: worldRequiredLevel,
        totalLevels: worldTotalLevels,
        orderIndex: worldOrderIndex,
        adminUserId: user.id,
      })
      setMessage("World created successfully!")
      setWorldId("")
      setWorldName("")
      setWorldDescription("")
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLevelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedWorldForLevel || !levelEnemyId || !user) return

    setLoading(true)
    setMessage("")

    try {
      await createLevel({
        worldId: selectedWorldForLevel,
        levelNumber,
        enemyId: levelEnemyId,
        playerMaxHP: levelPlayerMaxHP,
        totalQuestions: levelTotalQuestions,
        damagePerCorrect: levelDamagePerCorrect,
        maxFailures: levelMaxFailures,
        adminUserId: user.id,
      })
      setMessage("Level created successfully!")
      setLevelNumber(levelNumber + 1)
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    setLoading(true)
    try {
      let correctAnswerText = ""

      if (quizType === "multiple-choice") {
        // Use the actual option text, not the index
        correctAnswerText = quizOptions[quizCorrectAnswer] || ""
      } else if (quizType === "true-false") {
        correctAnswerText = quizOptions[quizCorrectAnswer] || ""
      } else if (quizType === "fill-blank" || quizType === "translation") {
        correctAnswerText = quizOptions[0] || "" // First option is the answer for fill-blank
      } else if (quizType === "matching") {
        // For matching, store as JSON string of pairs
        correctAnswerText = JSON.stringify(quizCorrectPairs)
      }

      await createQuiz({
        worldId: selectedWorldForQuiz,
        levelNumber: quizLevelNumber,
        type: quizType,
        question: quizQuestion,
        options: quizType === "matching" ? undefined : quizOptions.filter((o) => o !== ""),
        correctAnswer: correctAnswerText,
        explanation: quizExplanation || undefined,
        orderIndex: quizOrderIndex,
        adminUserId: user.id,
        leftItems: quizType === "matching" ? quizLeftItems.filter((i) => i !== "") : undefined,
        rightItems: quizType === "matching" ? quizRightItems.filter((i) => i !== "") : undefined,
        correctPairs: quizType === "matching" ? quizCorrectPairs.filter((p) => p.left && p.right) : undefined,
      })

      alert("✅ Quiz created successfully!")

      // Reset form
      setQuizQuestion("")
      setQuizOptions(["", "", "", ""])
      setQuizCorrectAnswer(0)
      setQuizExplanation("")
      setQuizOrderIndex(0)
      setQuizLeftItems(["", "", "", ""])
      setQuizRightItems(["", "", "", ""])
      setQuizCorrectPairs([])
    } catch (error) {
      console.error("Error creating quiz:", error)
      alert("❌ Failed to create quiz")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteWorld = async (worldDbId: Id<"worlds">) => {
    if (!user || !confirm("Are you sure? This will also delete all levels and quizzes in this world!")) return

    try {
      await deleteWorld({ worldId: worldDbId, adminUserId: user.id })
      setMessage("World deleted successfully!")
    } catch (error) {
      setMessage(`Error: ${error}`)
    }
  }

  const handleDeleteLevel = async (levelId: Id<"levels">) => {
    if (!user || !confirm("Are you sure you want to delete this level?")) return

    try {
      await deleteLevel({ levelId, adminUserId: user.id })
      setMessage("Level deleted successfully!")
    } catch (error) {
      setMessage(`Error: ${error}`)
    }
  }

  const handleDeleteQuiz = async (quizId: Id<"quizzes">) => {
    if (!user || !confirm("Are you sure you want to delete this quiz?")) return

    try {
      await deleteQuiz({ quizId, adminUserId: user.id })
      setMessage("Quiz deleted successfully!")
    } catch (error) {
      setMessage(`Error: ${error}`)
    }
  }

  const handleSeedWorlds = async () => {
    if (!user || !confirm("This will create default worlds. Continue?")) return

    setLoading(true)
    setMessage("")

    try {
      const result = await seedWorlds()
      setMessage(result.message || "Worlds seeded!")
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const hairItems = allItems?.filter((item) => item.type === "hair") || []
  const outfitItems = allItems?.filter((item) => item.type === "outfit") || []
  const weaponItems = allItems?.filter((item) => item.type === "weapon") || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-amber-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">⚔️ Admin Panel</h1>
          <div className="flex gap-3">
            <button
              onClick={handleSeed}
              disabled={loading || (allItems && allItems.length > 0)}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-400"
            >
              🌱 Seed Items
            </button>
            <button
              onClick={handleSeedWorlds}
              disabled={loading || (allWorlds && allWorlds.length > 0)}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-blue-400"
            >
              🌍 Seed Worlds
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-amber-500 text-amber-900 font-bold rounded-lg shadow-lg hover:bg-amber-400 border-2 border-amber-300"
            >
              ← Dashboard
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("items")}
            className={`px-6 py-3 font-bold rounded-lg transition-all ${activeTab === "items"
              ? "bg-emerald-600 text-white border-2 border-emerald-400"
              : "bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600"
              }`}
          >
            🎨 Items Manager
          </button>
          <button
            onClick={() => setActiveTab("enemies")}
            className={`px-6 py-3 font-bold rounded-lg transition-all ${activeTab === "enemies"
              ? "bg-red-600 text-white border-2 border-red-400"
              : "bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600"
              }`}
          >
            👹 Enemy Manager
          </button>
          <button
            onClick={() => setActiveTab("worlds")}
            className={`px-6 py-3 font-bold rounded-lg transition-all ${activeTab === "worlds"
              ? "bg-blue-600 text-white border-2 border-blue-400"
              : "bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600"
              }`}
          >
            🌍 Worlds & Quizzes
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg font-bold text-center border-2 ${message.includes("Error")
              ? "bg-red-900/50 text-red-200 border-red-700"
              : "bg-emerald-900/50 text-emerald-200 border-emerald-700"
              }`}
          >
            {message}
          </div>
        )}

        {/* Items Tab */}
        {activeTab === "items" && (
          <>
            {/* Create Item Form */}
            <div className="bg-slate-800 border-2 border-emerald-600 rounded-xl p-6 mb-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">✨ Create New Item</h2>
              <form onSubmit={handleItemSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-emerald-200">Item Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g., Dragon Sword"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-emerald-200">Item Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="hair">Hair</option>
                    <option value="outfit">Outfit</option>
                    <option value="weapon">Weapon</option>
                    <option value="accessory">Accessory</option>
                    <option value="body">Body</option>
                    <option value="face">Face</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-emerald-200">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g., Male, Female, Heavy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-emerald-200">Rarity</label>
                  <select
                    value={rarity}
                    onChange={(e) => setRarity(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-emerald-200">Required Level</label>
                  <input
                    type="number"
                    value={requiredLevel}
                    onChange={(e) => setRequiredLevel(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-emerald-200">Price (Gold)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    min="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-emerald-200">SVG Content</label>
                  <textarea
                    value={svgData}
                    onChange={(e) => setSvgData(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono text-sm"
                    placeholder="Paste SVG code here..."
                    rows={8}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-700 disabled:opacity-50 border-2 border-emerald-400"
                  >
                    {loading ? "Creating..." : "✨ Create Item"}
                  </button>
                </div>
              </form>
            </div>

            {/* Items List */}
            <div className="bg-slate-800 border-2 border-emerald-600 rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">📦 All Items ({allItems?.length || 0})</h2>
              {!allItems || allItems.length === 0 ? (
                <p className="text-slate-400">No items found. Create your first item above!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-slate-700 border-2 border-slate-600 rounded-lg p-4 hover:border-emerald-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-white">{item.name}</h3>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 border border-red-400"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="text-sm text-slate-300 mb-2 space-y-1">
                        <p>
                          <span className="font-semibold text-emerald-300">Type:</span> {item.type}
                        </p>
                        {item.category && (
                          <p>
                            <span className="font-semibold text-emerald-300">Category:</span> {item.category}
                          </p>
                        )}
                        <p>
                          <span className="font-semibold text-emerald-300">Level:</span> {item.requiredLevel}
                        </p>
                        <p>
                          <span className="font-semibold text-amber-300">Price:</span> {item.price}g
                        </p>
                        {item.rarity && (
                          <p>
                            <span className="font-semibold text-purple-300">Rarity:</span> {item.rarity}
                          </p>
                        )}
                      </div>
                      <div
                        className="bg-slate-900 p-4 rounded flex items-center justify-center h-32 border border-slate-600"
                        dangerouslySetInnerHTML={{ __html: item.svgData }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Enemies Tab */}
        {activeTab === "enemies" && (
          <>
            {/* Create Enemy Form */}
            <div className="bg-slate-800 border-2 border-red-600 rounded-xl p-6 mb-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-red-300">👹 Create New Enemy</h2>
              <form onSubmit={handleEnemySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-red-200">Enemy Name</label>
                  <input
                    type="text"
                    value={enemyName}
                    onChange={(e) => setEnemyName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    placeholder="e.g., Goblin Warrior"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-red-200">Level</label>
                  <input
                    type="number"
                    value={enemyLevel}
                    onChange={(e) => setEnemyLevel(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    min="1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-red-200">Description</label>
                  <textarea
                    value={enemyDescription}
                    onChange={(e) => setEnemyDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    placeholder="Enemy description..."
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-red-200">Base HP</label>
                  <input
                    type="number"
                    value={enemyHP}
                    onChange={(e) => setEnemyHP(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-red-200">Attack Power</label>
                  <input
                    type="number"
                    value={enemyAttack}
                    onChange={(e) => setEnemyAttack(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-red-200">Defense</label>
                  <input
                    type="number"
                    value={enemyDefense}
                    onChange={(e) => setEnemyDefense(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-amber-200">EXP Reward</label>
                  <input
                    type="number"
                    value={enemyExpReward}
                    onChange={(e) => setEnemyExpReward(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-amber-200">Money Reward</label>
                  <input
                    type="number"
                    value={enemyMoneyReward}
                    onChange={(e) => setEnemyMoneyReward(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-purple-200">Skin Color</label>
                  <input
                    type="color"
                    value={enemySkinColor}
                    onChange={(e) => setEnemySkinColor(e.target.value)}
                    className="w-full h-10 bg-slate-700 border-2 border-slate-600 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-purple-200">Eye Color</label>
                  <input
                    type="color"
                    value={enemyEyeColor}
                    onChange={(e) => setEnemyEyeColor(e.target.value)}
                    className="w-full h-10 bg-slate-700 border-2 border-slate-600 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-purple-200">Hair Color</label>
                  <input
                    type="color"
                    value={enemyHairColor}
                    onChange={(e) => setEnemyHairColor(e.target.value)}
                    className="w-full h-10 bg-slate-700 border-2 border-slate-600 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-purple-200">Hair Item</label>
                  <select
                    value={selectedHairItem || ""}
                    onChange={(e) => setSelectedHairItem(e.target.value as Id<"items">)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">None</option>
                    {hairItems.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-purple-200">Outfit Item</label>
                  <select
                    value={selectedOutfitItem || ""}
                    onChange={(e) => setSelectedOutfitItem(e.target.value as Id<"items">)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">None</option>
                    {outfitItems.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-purple-200">Weapon Item</label>
                  <select
                    value={selectedWeaponItem || ""}
                    onChange={(e) => setSelectedWeaponItem(e.target.value as Id<"items">)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">None</option>
                    {weaponItems.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 disabled:opacity-50 border-2 border-red-400"
                  >
                    {loading ? "Creating..." : "👹 Create Enemy"}
                  </button>
                </div>
              </form>
            </div>

            {/* Drop Configuration */}
            {allEnemies && allEnemies.length > 0 && (
              <div className="bg-slate-800 border-2 border-amber-600 rounded-xl p-6 mb-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-amber-300">💎 Configure Enemy Drops</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Select Enemy</label>
                    <select
                      value={dropEnemyId || ""}
                      onChange={(e) => setDropEnemyId(e.target.value as Id<"enemies">)}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="">Choose enemy...</option>
                      {allEnemies.map((enemy) => (
                        <option key={enemy._id} value={enemy._id}>
                          {enemy.name} (Lv.{enemy.level})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Select Item</label>
                    <select
                      value={dropItemId || ""}
                      onChange={(e) => setDropItemId(e.target.value as Id<"items">)}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="">Choose item...</option>
                      {allItems?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name} ({item.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Drop Chance (%)</label>
                    <input
                      type="number"
                      value={dropChance}
                      onChange={(e) => setDropChance(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Min Quantity</label>
                    <input
                      type="number"
                      value={dropMinQty}
                      onChange={(e) => setDropMinQty(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Max Quantity</label>
                    <input
                      type="number"
                      value={dropMaxQty}
                      onChange={(e) => setDropMaxQty(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      min="1"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleAddDrop}
                      disabled={!dropEnemyId || !dropItemId || loading}
                      className="w-full px-6 py-2 bg-amber-600 text-white font-bold rounded-lg shadow-lg hover:bg-amber-700 disabled:opacity-50 border-2 border-amber-400"
                    >
                      💎 Add Drop
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Enemies List */}
            <div className="bg-slate-800 border-2 border-red-600 rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-red-300">👹 All Enemies ({allEnemies?.length || 0})</h2>
              {!allEnemies || allEnemies.length === 0 ? (
                <p className="text-slate-400">No enemies found. Create your first enemy above!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allEnemies.map((enemy) => (
                    <div
                      key={enemy._id}
                      className="bg-slate-700 border-2 border-slate-600 rounded-lg p-4 hover:border-red-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-white">{enemy.name}</h3>
                        <button
                          onClick={() => handleDeleteEnemy(enemy._id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 border border-red-400"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="text-sm text-slate-300 space-y-1">
                        {enemy.description && <p className="text-slate-400 italic">{enemy.description}</p>}
                        <p>
                          <span className="font-semibold text-red-300">Level:</span> {enemy.level}
                        </p>
                        <p>
                          <span className="font-semibold text-red-300">HP:</span> {enemy.baseHP}
                        </p>
                        <p>
                          <span className="font-semibold text-red-300">Attack:</span> {enemy.attackPower}
                        </p>
                        <p>
                          <span className="font-semibold text-red-300">Defense:</span> {enemy.defense}
                        </p>
                        <p>
                          <span className="font-semibold text-amber-300">Rewards:</span> {enemy.experienceReward} EXP,{" "}
                          {enemy.moneyReward}g
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Worlds Tab */}
        {activeTab === "worlds" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create World Form */}
              <div className="bg-slate-800 border-2 border-blue-600 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">🌍 Create New World</h2>
                <form onSubmit={handleWorldSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-blue-200">World ID (unique)</label>
                    <input
                      type="text"
                      value={worldId}
                      onChange={(e) => setWorldId(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g., beginner-forest"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-blue-200">World Name</label>
                    <input
                      type="text"
                      value={worldName}
                      onChange={(e) => setWorldName(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g., Beginner Forest"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-blue-200">Description</label>
                    <textarea
                      value={worldDescription}
                      onChange={(e) => setWorldDescription(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      rows={2}
                      placeholder="World description..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-200">Difficulty</label>
                      <select
                        value={worldDifficulty}
                        onChange={(e) => setWorldDifficulty(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-200">Required Level</label>
                      <input
                        type="number"
                        value={worldRequiredLevel}
                        onChange={(e) => setWorldRequiredLevel(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-200">Total Levels</label>
                      <input
                        type="number"
                        value={worldTotalLevels}
                        onChange={(e) => setWorldTotalLevels(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-200">Order Index</label>
                      <input
                        type="number"
                        value={worldOrderIndex}
                        onChange={(e) => setWorldOrderIndex(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        min="0"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 border-2 border-blue-400"
                  >
                    {loading ? "Creating..." : "🌍 Create World"}
                  </button>
                </form>
              </div>

              {/* Create Level Form */}
              <div className="bg-slate-800 border-2 border-purple-600 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">📍 Create New Level</h2>
                <form onSubmit={handleLevelSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-purple-200">Select World</label>
                    <select
                      value={selectedWorldForLevel}
                      onChange={(e) => setSelectedWorldForLevel(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required
                    >
                      <option value="">-- Select World --</option>
                      {allWorlds?.map((world) => (
                        <option key={world._id} value={world.worldId}>
                          {world.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-purple-200">Level Number</label>
                      <input
                        type="number"
                        value={levelNumber}
                        onChange={(e) => setLevelNumber(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-purple-200">Enemy</label>
                      <select
                        value={levelEnemyId || ""}
                        onChange={(e) => setLevelEnemyId(e.target.value as Id<"enemies">)}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        required
                      >
                        <option value="">-- Select Enemy --</option>
                        {allEnemies?.map((enemy) => (
                          <option key={enemy._id} value={enemy._id}>
                            {enemy.name} (Lv.{enemy.level})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-purple-200">Player Max HP</label>
                      <input
                        type="number"
                        value={levelPlayerMaxHP}
                        onChange={(e) => setLevelPlayerMaxHP(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-purple-200">Total Questions</label>
                      <input
                        type="number"
                        value={levelTotalQuestions}
                        onChange={(e) => setLevelTotalQuestions(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-purple-200">Damage Per Correct</label>
                      <input
                        type="number"
                        value={levelDamagePerCorrect}
                        onChange={(e) => setLevelDamagePerCorrect(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-purple-200">Max Failures</label>
                      <input
                        type="number"
                        value={levelMaxFailures}
                        onChange={(e) => setLevelMaxFailures(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        min="1"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !selectedWorldForLevel}
                    className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 disabled:opacity-50 border-2 border-purple-400"
                  >
                    {loading ? "Creating..." : "📍 Create Level"}
                  </button>
                </form>
              </div>
            </div>

            {/* Create Quiz Form */}
            <div className="mt-6 bg-slate-800 border-2 border-amber-600 rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-amber-300">❓ Create Quiz Question</h2>
              <form onSubmit={handleQuizSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-amber-200">Select World</label>
                  <select
                    value={selectedWorldForQuiz}
                    onChange={(e) => setSelectedWorldForQuiz(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    required
                  >
                    <option value="">-- Select World --</option>
                    {allWorlds?.map((world) => (
                      <option key={world._id} value={world.worldId}>
                        {world.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-amber-200">Level Number</label>
                  <input
                    type="number"
                    value={quizLevelNumber}
                    onChange={(e) => setQuizLevelNumber(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-amber-200">Quiz Type</label>
                  <select
                    value={quizType}
                    onChange={(e) => {
                      setQuizType(e.target.value)
                      setQuizOptions(["", "", "", ""])
                      setQuizCorrectAnswer(0)
                    }}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="fill-blank">Fill in the Blank</option>
                    <option value="translation">Translation</option>
                    <option value="matching">Matching</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-amber-200">Order Index</label>
                  <input
                    type="number"
                    value={quizOrderIndex}
                    onChange={(e) => setQuizOrderIndex(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    min="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-amber-200">Question</label>
                  <textarea
                    value={quizQuestion}
                    onChange={(e) => setQuizQuestion(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    rows={2}
                    placeholder="Enter quiz question..."
                    required
                  />
                </div>

                {quizType === "multiple-choice" && (
                  <>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-amber-200">Option 1</label>
                      <input
                        type="text"
                        value={quizOptions[0]}
                        onChange={(e) => {
                          const newOptions = [...quizOptions]
                          newOptions[0] = e.target.value
                          setQuizOptions(newOptions)
                        }}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-amber-200">Option 2</label>
                      <input
                        type="text"
                        value={quizOptions[1]}
                        onChange={(e) => {
                          const newOptions = [...quizOptions]
                          newOptions[1] = e.target.value
                          setQuizOptions(newOptions)
                        }}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-amber-200">Option 3</label>
                      <input
                        type="text"
                        value={quizOptions[2]}
                        onChange={(e) => {
                          const newOptions = [...quizOptions]
                          newOptions[2] = e.target.value
                          setQuizOptions(newOptions)
                        }}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-amber-200">Option 4</label>
                      <input
                        type="text"
                        value={quizOptions[3]}
                        onChange={(e) => {
                          const newOptions = [...quizOptions]
                          newOptions[3] = e.target.value
                          setQuizOptions(newOptions)
                        }}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-amber-200">Correct Answer (Select One)</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 1, 2, 3].map((index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setQuizCorrectAnswer(index)}
                            className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${quizCorrectAnswer === index
                              ? "bg-green-600 border-green-400 text-white"
                              : "bg-slate-700 border-slate-600 text-slate-400 hover:border-green-500"
                              }`}
                          >
                            Option {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {quizType === "true-false" && (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-amber-200">Correct Answer</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setQuizOptions(["True", "False"])
                            setQuizCorrectAnswer(0)
                          }}
                          className={`px-6 py-3 rounded-lg font-bold border-2 transition-all ${quizOptions[0] === "True" && quizCorrectAnswer === 0
                            ? "bg-green-600 border-green-400 text-white"
                            : "bg-slate-700 border-slate-600 text-slate-400 hover:border-green-500"
                            }`}
                        >
                          ✓ True
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setQuizOptions(["True", "False"])
                            setQuizCorrectAnswer(1)
                          }}
                          className={`px-6 py-3 rounded-lg font-bold border-2 transition-all ${quizOptions[1] === "False" && quizCorrectAnswer === 1
                            ? "bg-red-600 border-red-400 text-white"
                            : "bg-slate-700 border-slate-600 text-slate-400 hover:border-red-500"
                            }`}
                        >
                          ✗ False
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {(quizType === "fill-blank" || quizType === "translation") && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-amber-200">
                      {quizType === "fill-blank" ? "Correct Answer (to fill the blank)" : "Correct Translation"}
                    </label>
                    <input
                      type="text"
                      value={quizOptions[0]}
                      onChange={(e) => {
                        setQuizOptions([e.target.value, "", "", ""])
                      }}
                      className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      placeholder={
                        quizType === "fill-blank"
                          ? "Enter the word that fills the blank..."
                          : "Enter the correct translation..."
                      }
                      required
                    />
                    <p className="text-xs text-amber-600 mt-1">
                      {quizType === "fill-blank"
                        ? "Use _____ in your question to indicate where the blank is"
                        : "Player will type the translation of the word/phrase"}
                    </p>
                  </div>
                )}

                {quizType === "matching" && (
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-amber-200">Matching Pairs</label>
                      <p className="text-xs text-amber-600 mb-3">
                        Create items to match (e.g., English words with Spanish translations)
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-2 text-amber-300">Left Column</label>
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            type="text"
                            value={quizLeftItems[index]}
                            onChange={(e) => {
                              const newItems = [...quizLeftItems]
                              newItems[index] = e.target.value
                              setQuizLeftItems(newItems)
                            }}
                            className="w-full px-3 py-2 mb-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                            placeholder={`Left item ${index + 1}`}
                          />
                        ))}
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-2 text-amber-300">Right Column</label>
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            type="text"
                            value={quizRightItems[index]}
                            onChange={(e) => {
                              const newItems = [...quizRightItems]
                              newItems[index] = e.target.value
                              setQuizRightItems(newItems)
                            }}
                            className="w-full px-3 py-2 mb-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                            placeholder={`Right item ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 text-green-300">Define Correct Pairs</label>
                      {quizLeftItems
                        .filter((i) => i)
                        .map((leftItem, index) => (
                          <div key={index} className="flex items-center gap-2 mb-2">
                            <span className="text-amber-200 text-sm flex-1">{leftItem}</span>
                            <span className="text-amber-600">→</span>
                            <select
                              value={quizCorrectPairs.find((p) => p.left === leftItem)?.right || ""}
                              onChange={(e) => {
                                const newPairs = quizCorrectPairs.filter((p) => p.left !== leftItem)
                                if (e.target.value) {
                                  newPairs.push({ left: leftItem, right: e.target.value })
                                }
                                setQuizCorrectPairs(newPairs)
                              }}
                              className="flex-1 px-3 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                            >
                              <option value="">Select match...</option>
                              {quizRightItems
                                .filter((i) => i)
                                .map((rightItem, ridx) => (
                                  <option key={ridx} value={rightItem}>
                                    {rightItem}
                                  </option>
                                ))}
                            </select>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading || !selectedWorldForQuiz}
                    className="w-full px-6 py-3 bg-amber-600 text-white font-bold rounded-lg shadow-lg hover:bg-amber-700 disabled:opacity-50 border-2 border-amber-400"
                  >
                    {loading ? "Creating..." : "❓ Create Quiz"}
                  </button>
                </div>
              </form>
            </div>

            {/* Display All Worlds, Levels, and Quizzes */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Worlds List */}
              <div className="bg-slate-800 border-2 border-blue-600 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">🌍 All Worlds ({allWorlds?.length || 0})</h2>
                {!allWorlds || allWorlds.length === 0 ? (
                  <p className="text-slate-400">No worlds found.</p>
                ) : (
                  <div className="space-y-3">
                    {allWorlds.map((world) => (
                      <div key={world._id} className="bg-slate-700 border-2 border-slate-600 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-white">{world.name}</h3>
                          <button
                            onClick={() => handleDeleteWorld(world._id)}
                            className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="text-xs text-slate-300">{world.description}</p>
                        <div className="text-xs text-slate-400 mt-1">
                          Difficulty: {world.difficulty} | Lvl {world.requiredLevel}+
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Levels List */}
              <div className="bg-slate-800 border-2 border-purple-600 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">📍 Levels</h2>
                <div className="mb-4">
                  <select
                    value={selectedWorldForLevel}
                    onChange={(e) => setSelectedWorldForLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white text-sm"
                  >
                    <option value="">-- Select World --</option>
                    {allWorlds?.map((world) => (
                      <option key={world._id} value={world.worldId}>
                        {world.name}
                      </option>
                    ))}
                  </select>
                </div>
                {!levelsForWorld || levelsForWorld.length === 0 ? (
                  <p className="text-slate-400 text-sm">No levels found.</p>
                ) : (
                  <div className="space-y-2">
                    {levelsForWorld.map((level) => (
                      <div key={level._id} className="bg-slate-700 border-2 border-slate-600 rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">Level {level.levelNumber}</span>
                          <button
                            onClick={() => handleDeleteLevel(level._id)}
                            className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700"
                          >
                            🗑️
                          </button>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Questions: {level.totalQuestions} | HP: {level.playerMaxHP}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quizzes List */}
              <div className="bg-slate-800 border-2 border-amber-600 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-amber-300">❓ Quizzes</h2>
                <div className="mb-4 space-y-2">
                  <select
                    value={selectedWorldForQuiz}
                    onChange={(e) => setSelectedWorldForQuiz(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white text-sm"
                  >
                    <option value="">-- Select World --</option>
                    {allWorlds?.map((world) => (
                      <option key={world._id} value={world.worldId}>
                        {world.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={quizLevelNumber}
                    onChange={(e) => setQuizLevelNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white text-sm"
                    placeholder="Level Number"
                    min="1"
                  />
                </div>
                {!quizzesForLevel || quizzesForLevel.length === 0 ? (
                  <p className="text-slate-400 text-sm">No quizzes found.</p>
                ) : (
                  <div className="space-y-2">
                    {quizzesForLevel.map((quiz) => (
                      <div key={quiz._id} className="bg-slate-700 border-2 border-slate-600 rounded-lg p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white text-xs">Q{quiz.orderIndex + 1}</span>
                          <button
                            onClick={() => handleDeleteQuiz(quiz._id)}
                            className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="text-xs text-slate-300 truncate">{quiz.question}</p>
                        <div className="text-xs text-slate-400 mt-1">{quiz.type}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
