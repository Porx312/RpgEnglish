
import { create } from "zustand"

interface BattleStore {
    playerHP: number
    enemyHP: number
    currentQuizIndex: number
    playerAnimation: "idle" | "attack" | "hurt"
    enemyAnimation: "idle" | "attack" | "hurt"
    battleStatus: "active" | "won" | "lost"
    message: string
    score: number
    correctAnswersCount: number
    failuresCount: number
    drops: any[]
    userAnswer: string
    matchingAnswers: { [key: string]: string }

    setPlayerHP: (hp: number) => void
    setEnemyHP: (hp: number) => void
    setCurrentQuizIndex: (index: number) => void
    setPlayerAnimation: (animation: "idle" | "attack" | "hurt") => void
    setEnemyAnimation: (animation: "idle" | "attack" | "hurt") => void
    setBattleStatus: (status: "active" | "won" | "lost") => void
    setMessage: (message: string) => void
    setScore: (score: number) => void
    incrementScore: (amount: number) => void
    incrementCorrectAnswers: () => void
    incrementFailures: () => void
    setDrops: (drops: any[]) => void
    setUserAnswer: (answer: string) => void
    setMatchingAnswers: (answers: { [key: string]: string }) => void
    resetBattle: () => void
}

export const useBattleStore = create<BattleStore>((set) => ({
    playerHP: 100,
    enemyHP: 100,
    currentQuizIndex: 0,
    playerAnimation: "idle",
    enemyAnimation: "idle",
    battleStatus: "active",
    message: "⚔️ Battle Start!",
    score: 0,
    correctAnswersCount: 0,
    failuresCount: 0,
    drops: [],
    userAnswer: "",
    matchingAnswers: {},

    setPlayerHP: (hp) => set({ playerHP: hp }),
    setEnemyHP: (hp) => set({ enemyHP: hp }),
    setCurrentQuizIndex: (index) => set({ currentQuizIndex: index }),
    setPlayerAnimation: (animation) => set({ playerAnimation: animation }),
    setEnemyAnimation: (animation) => set({ enemyAnimation: animation }),
    setBattleStatus: (status) => set({ battleStatus: status }),
    setMessage: (message) => set({ message }),
    setScore: (score) => set({ score }),
    incrementScore: (amount) => set((state) => ({ score: state.score + amount })),
    incrementCorrectAnswers: () => set((state) => ({ correctAnswersCount: state.correctAnswersCount + 1 })),
    incrementFailures: () => set((state) => ({ failuresCount: state.failuresCount + 1 })),
    setDrops: (drops) => set({ drops }),
    setUserAnswer: (answer) => set({ userAnswer: answer }),
    setMatchingAnswers: (answers) => set({ matchingAnswers: answers }),
    resetBattle: () =>
        set({
            playerHP: 100,
            enemyHP: 100,
            currentQuizIndex: 0,
            playerAnimation: "idle",
            enemyAnimation: "idle",
            battleStatus: "active",
            message: "⚔️ Battle Start!",
            score: 0,
            correctAnswersCount: 0,
            failuresCount: 0,
            drops: [],
            userAnswer: "",
            matchingAnswers: {},
        }),
}))
