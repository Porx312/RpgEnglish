"use client"

import { useBattleStore } from "@/shared/store/use-battle.store"


interface QuizRendererProps {
    quiz: any
    onAnswer: (answer: string) => void
    onMatchingSubmit?: () => void
}

export const QuizRenderer = ({ quiz, onAnswer, onMatchingSubmit }: QuizRendererProps) => {
    const { userAnswer, setUserAnswer, matchingAnswers, setMatchingAnswers } = useBattleStore()

    if (quiz.type === "multiple-choice") {
        return (
            <div className="space-y-3">
                {quiz.options?.map((option: string, index: number) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option)}
                        className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-lg border-2 border-amber-800 transition-all text-left"
                    >
                        {option}
                    </button>
                ))}
            </div>
        )
    }

    if (quiz.type === "true-false") {
        return (
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => onAnswer("True")}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-lg border-2 border-green-800 transition-all"
                >
                    ✓ True
                </button>
                <button
                    onClick={() => onAnswer("False")}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-lg border-2 border-red-800 transition-all"
                >
                    ✗ False
                </button>
            </div>
        )
    }

    if (quiz.type === "fill-blank" || quiz.type === "translation") {
        return (
            <div className="space-y-4">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && userAnswer.trim()) {
                            onAnswer(userAnswer)
                        }
                    }}
                    placeholder={quiz.type === "fill-blank" ? "Type your answer..." : "Type the translation..."}
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-amber-600 rounded-lg text-white text-lg focus:outline-none focus:border-amber-400"
                />
                <button
                    onClick={() => onAnswer(userAnswer)}
                    disabled={!userAnswer.trim()}
                    className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg border-2 border-amber-800 transition-all"
                >
                    Submit Answer
                </button>
            </div>
        )
    }

    if (quiz.type === "matching") {
        return (
            <div className="space-y-4">
                <p className="text-amber-400 text-sm text-center mb-4">Match the items from left to right</p>
                {quiz.leftItems?.map((leftItem: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-800 border-2 border-amber-600 rounded-lg px-4 py-2 text-amber-200 font-bold">
                            {leftItem}
                        </div>
                        <span className="text-amber-600 text-xl">→</span>
                        <select
                            value={matchingAnswers[leftItem] || ""}
                            onChange={(e) => setMatchingAnswers({ ...matchingAnswers, [leftItem]: e.target.value })}
                            className="flex-1 px-4 py-2 bg-slate-800 border-2 border-amber-600 rounded-lg text-amber-200 focus:outline-none focus:border-amber-400"
                        >
                            <option value="">Select...</option>
                            {quiz.rightItems?.map((rightItem: string, idx: number) => (
                                <option key={idx} value={rightItem}>
                                    {rightItem}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button
                    onClick={onMatchingSubmit}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-lg border-2 border-amber-800 transition-all"
                >
                    Submit Matches
                </button>
            </div>
        )
    }

    return null
}
