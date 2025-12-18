import QuizzMap from "@/shared/lib/svgAssets/Quizmap"
import type React from "react"
import { BattleHeader } from "./BattleHeader"
interface QuizCardProps {
    currentQuizIndex: number
    quizzesLength: number
    question: string
    children: React.ReactNode
    explanation?: string
}

export const QuizCard = ({ currentQuizIndex, quizzesLength, question, children, explanation, }: QuizCardProps) => {
    return (
        <div className="flex  flex-col items-center justify-center relative " >

            <QuizzMap className="w-full max-w-2xl absolute " />
            <div className="relative z-10  flex flex-col items-center justify-center ">
                {/* Quiz Header */}
                <span className="text-white  text-outline text-xl   font-bold">
                    QUESTION {currentQuizIndex + 1} OF {quizzesLength}
                </span>

                {/* Question */}
                <p className="text-white text-outline text-lg font-bold text-center">{question}</p>

                {/* Quiz Content (rendered by parent) */}

                {children}


                {/* Explanation */}
                {explanation && (
                    <p className="text-orange-800 text-outline text-lg ">💡 {explanation}</p>
                )}
            </div>
        </div>
    )
}
