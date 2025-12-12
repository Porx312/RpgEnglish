"use client"

import { useRouter } from "next/navigation"

interface BattleResultScreenProps {
    battleStatus: "won" | "lost"
    message: string
    score: number
    correctAnswersCount: number
    quizzesLength: number
    drops: any[]
    items: any[]
    onRetry: () => void
}

export const BattleResultScreen = ({
    battleStatus,
    message,
    score,
    correctAnswersCount,
    quizzesLength,
    drops,
    items,
    onRetry,
}: BattleResultScreenProps) => {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#2d1f15] to-[#1a110d] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-[#4a3728] rounded-2xl border-4 border-[#6b4423] shadow-2xl p-8">
                <div className="text-center">
                    <div className="text-8xl mb-4">{battleStatus === "won" ? "🏆" : "💀"}</div>
                    <h1 className="text-4xl font-bold text-amber-200 mb-2">{battleStatus === "won" ? "VICTORY!" : "DEFEAT!"}</h1>
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
                                    {Math.round((correctAnswersCount / quizzesLength) * 100)}%
                                </p>
                            </div>
                            <div>
                                <p className="text-amber-700 text-sm">Correct Answers</p>
                                <p className="text-2xl font-bold text-emerald-400">
                                    {correctAnswersCount}/{quizzesLength}
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
                                onClick={onRetry}
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
