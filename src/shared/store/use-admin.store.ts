import { create } from "zustand"
import { Id } from "../../../convex/_generated/dataModel"

type AdminTab = "items" | "enemies" | "worlds"

interface AdminStore {
    activeTab: AdminTab
    setActiveTab: (tab: AdminTab) => void

    loading: boolean
    setLoading: (loading: boolean) => void

    message: string
    setMessage: (message: string) => void

    // Item form
    itemForm: {
        name: string
        type: string
        svgData: string
        category: string
        requiredLevel: number
        price: number
        rarity: string
    }
    setItemForm: (form: Partial<AdminStore["itemForm"]>) => void
    resetItemForm: () => void

    // Enemy form
    enemyForm: {
        name: string
        description: string
        level: number
        hp: number
        attack: number
        defense: number
        expReward: number
        moneyReward: number
        skinColor: string
        eyeColor: string
        hairColor: string
        hairItemId?: Id<"items">
        outfitItemId?: Id<"items">
        weaponItemId?: Id<"items">
    }
    setEnemyForm: (form: Partial<AdminStore["enemyForm"]>) => void
    resetEnemyForm: () => void

    // Drop form
    dropForm: {
        enemyId?: Id<"enemies">
        itemId?: Id<"items">
        dropChance: number
        minQuantity: number
        maxQuantity: number
    }
    setDropForm: (form: Partial<AdminStore["dropForm"]>) => void
    resetDropForm: () => void

    // World form
    worldForm: {
        worldId: string
        name: string
        description: string
        difficulty: string
        requiredLevel: number
        totalLevels: number
        orderIndex: number
    }
    setWorldForm: (form: Partial<AdminStore["worldForm"]>) => void
    resetWorldForm: () => void

    // Level form
    levelForm: {
        selectedWorldId: string
        levelNumber: number
        enemyId?: Id<"enemies">
        playerMaxHP: number
        totalQuestions: number
        damagePerCorrect: number
        maxFailures: number
    }
    setLevelForm: (form: Partial<AdminStore["levelForm"]>) => void
    resetLevelForm: () => void

    // Quiz form
    quizForm: {
        selectedWorldId: string
        levelNumber: number
        type: string
        question: string
        options: string[]
        correctAnswer: number
        explanation: string
        orderIndex: number
        leftItems: string[]
        rightItems: string[]
        correctPairs: { left: string; right: string }[]
    }
    setQuizForm: (form: Partial<AdminStore["quizForm"]>) => void
    resetQuizForm: () => void
}

const defaultItemForm = {
    name: "",
    type: "hair",
    svgData: "",
    category: "",
    requiredLevel: 1,
    price: 0,
    rarity: "common",
}

const defaultEnemyForm = {
    name: "",
    description: "",
    level: 1,
    hp: 100,
    attack: 10,
    defense: 5,
    expReward: 50,
    moneyReward: 10,
    skinColor: "#D4A574",
    eyeColor: "#000000",
    hairColor: "#8B4513",
}

const defaultDropForm = {
    dropChance: 50,
    minQuantity: 1,
    maxQuantity: 1,
}

const defaultWorldForm = {
    worldId: "",
    name: "",
    description: "",
    difficulty: "Easy",
    requiredLevel: 1,
    totalLevels: 10,
    orderIndex: 0,
}

const defaultLevelForm = {
    selectedWorldId: "",
    levelNumber: 1,
    playerMaxHP: 100,
    totalQuestions: 10,
    damagePerCorrect: 10,
    maxFailures: 3,
}

const defaultQuizForm = {
    selectedWorldId: "",
    levelNumber: 1,
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    orderIndex: 0,
    leftItems: ["", "", "", ""],
    rightItems: ["", "", "", ""],
    correctPairs: [],
}

export const useAdminStore = create<AdminStore>((set) => ({
    activeTab: "items",
    setActiveTab: (tab) => set({ activeTab: tab }),

    loading: false,
    setLoading: (loading) => set({ loading }),

    message: "",
    setMessage: (message) => set({ message }),

    itemForm: defaultItemForm,
    setItemForm: (form) => set((state) => ({ itemForm: { ...state.itemForm, ...form } })),
    resetItemForm: () => set({ itemForm: defaultItemForm }),

    enemyForm: defaultEnemyForm,
    setEnemyForm: (form) => set((state) => ({ enemyForm: { ...state.enemyForm, ...form } })),
    resetEnemyForm: () => set({ enemyForm: defaultEnemyForm }),

    dropForm: defaultDropForm,
    setDropForm: (form) => set((state) => ({ dropForm: { ...state.dropForm, ...form } })),
    resetDropForm: () => set({ dropForm: defaultDropForm }),

    worldForm: defaultWorldForm,
    setWorldForm: (form) => set((state) => ({ worldForm: { ...state.worldForm, ...form } })),
    resetWorldForm: () => set({ worldForm: defaultWorldForm }),

    levelForm: defaultLevelForm,
    setLevelForm: (form) => set((state) => ({ levelForm: { ...state.levelForm, ...form } })),
    resetLevelForm: () => set({ levelForm: defaultLevelForm }),

    quizForm: defaultQuizForm,
    setQuizForm: (form) => set((state) => ({ quizForm: { ...state.quizForm, ...form } })),
    resetQuizForm: () => set({ quizForm: defaultQuizForm }),
}))
