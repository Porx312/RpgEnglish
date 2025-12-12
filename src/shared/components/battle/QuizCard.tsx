import type React from "react"
interface QuizCardProps {
    currentQuizIndex: number
    quizzesLength: number
    question: string
    children: React.ReactNode
    explanation?: string
}

export const QuizCard = ({ currentQuizIndex, quizzesLength, question, children, explanation }: QuizCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-[#3a2718] rounded-lg border-2 border-[#5a3a23] p-6 w-full max-w-2xl">
                {/* Quiz Header */}
                <div className="mb-4 text-center">
                    <span className="text-amber-600 text-sm font-bold">
                        QUESTION {currentQuizIndex + 1} OF {quizzesLength}
                    </span>
                </div>

                {/* Question */}
                <div className="bg-[#2d1f15] rounded-lg p-4 mb-6 border-2 border-[#5a3a23]">
                    <p className="text-amber-200 text-lg font-bold text-center">{question}</p>
                </div>

                {/* Quiz Content (rendered by parent) */}
                {children}

                {/* Explanation */}
                {explanation && (
                    <div className="mt-4 p-3 bg-amber-900/30 rounded border border-amber-700">
                        <p className="text-amber-300 text-sm">💡 {explanation}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
