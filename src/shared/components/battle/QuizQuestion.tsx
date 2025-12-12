"use client"

import { useState } from "react"

type QuizType = "multiple-choice" | "fill-blank" | "true-false" | "matching"

interface Quiz {
  type: QuizType
  question: string
  options?: string[]
  correctAnswer: number | string
  correctAnswers?: number[]
  pairs?: { left: string; right: string }[]
  explanation?: string
}

interface QuizQuestionProps {
  quiz: Quiz
  questionNumber: number
  totalQuestions: number
  onAnswer: (isCorrect: boolean, answer?: any) => void
}

export function QuizQuestion({ quiz, questionNumber, totalQuestions, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleSubmit = () => {
    if (selectedAnswer === null && quiz.type !== "fill-blank") return
    if (quiz.type === "fill-blank" && !selectedAnswer?.trim()) return

    let isCorrect = false

    if (quiz.type === "multiple-choice" || quiz.type === "true-false") {
      isCorrect = selectedAnswer === quiz.correctAnswer
    } else if (quiz.type === "fill-blank") {
      isCorrect = selectedAnswer.toLowerCase().trim() === (quiz.correctAnswer as string).toLowerCase().trim()
    }

    setHasAnswered(true)
    setShowExplanation(true)

    setTimeout(() => {
      onAnswer(isCorrect, selectedAnswer)
      setSelectedAnswer(null)
      setHasAnswered(false)
      setShowExplanation(false)
    }, 2000)
  }

  return (
    <div
      className="bg-[#4a3728] min-h-full rounded-lg border-4 border-[#6b4423] shadow-xl p-6"
      style={{
        backgroundImage: `
          repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, transparent 2px, transparent 4px, rgba(0,0,0,0.05) 4px),
          repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, transparent 2px, transparent 4px, rgba(0,0,0,0.05) 4px)
        `,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold text-amber-200"
          style={{
            fontFamily: "monospace",
            textShadow: "2px 2px 0px #6b4423",
          }}
        >
          QUESTION {questionNumber}/{totalQuestions}
        </h2>
        <span className="px-3 py-1 bg-amber-600 text-white rounded border-2 border-amber-800 text-xs font-bold">
          {quiz.type.split("-").join(" ").toUpperCase()}
        </span>
      </div>

      <div className="bg-[#1a1410] rounded-lg p-5 border-4 border-[#5a3a23] mb-5 shadow-inner">
        <p className="text-amber-200 text-xl font-bold leading-relaxed" style={{ fontFamily: "monospace" }}>
          {quiz.question}
        </p>
      </div>

      {quiz.type === "multiple-choice" && quiz.options && (
        <div className="space-y-3 mb-4">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !hasAnswered && setSelectedAnswer(index)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-lg border-4 transition-all font-bold ${
                selectedAnswer === index
                  ? hasAnswered
                    ? index === quiz.correctAnswer
                      ? "bg-green-700 border-green-500 text-white shadow-lg transform scale-105"
                      : "bg-red-700 border-red-500 text-white shadow-lg"
                    : "bg-amber-600 border-amber-500 text-white shadow-lg transform scale-105"
                  : hasAnswered && index === quiz.correctAnswer
                    ? "bg-green-700 border-green-500 text-white shadow-lg"
                    : "bg-[#3a2718] border-[#5a3a23] text-amber-200 hover:bg-[#4a3728] hover:border-amber-700"
              } ${hasAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <span className="inline-block w-8 h-8 bg-amber-800 rounded mr-3 text-center leading-8 border-2 border-amber-900">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>
      )}

      {quiz.type === "fill-blank" && (
        <div className="mb-4">
          <input
            type="text"
            value={selectedAnswer || ""}
            onChange={(e) => !hasAnswered && setSelectedAnswer(e.target.value)}
            disabled={hasAnswered}
            placeholder="Type your answer..."
            className={`w-full p-4 rounded-lg border-4 font-bold text-xl ${
              hasAnswered
                ? (selectedAnswer as string)?.toLowerCase().trim() ===
                  (quiz.correctAnswer as string).toLowerCase().trim()
                  ? "bg-green-700 border-green-500 text-white"
                  : "bg-red-700 border-red-500 text-white"
                : "bg-[#1a1410] border-[#5a3a23] text-amber-200 focus:border-amber-600 focus:outline-none"
            }`}
            style={{ fontFamily: "monospace" }}
          />
          {hasAnswered && (
            <div className="mt-3 bg-green-900 bg-opacity-50 p-3 rounded border-2 border-green-700">
              <p className="text-green-200 font-bold">
                ✓ Correct answer: <span className="text-green-400 text-lg">{quiz.correctAnswer}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {quiz.type === "true-false" && (
        <div className="flex gap-4 mb-4">
          {["True", "False"].map((option, index) => (
            <button
              key={index}
              onClick={() => !hasAnswered && setSelectedAnswer(index)}
              disabled={hasAnswered}
              className={`flex-1 p-6 rounded-lg border-4 transition-all font-bold text-2xl ${
                selectedAnswer === index
                  ? hasAnswered
                    ? index === quiz.correctAnswer
                      ? "bg-green-700 border-green-500 text-white shadow-lg transform scale-105"
                      : "bg-red-700 border-red-500 text-white shadow-lg"
                    : "bg-amber-600 border-amber-500 text-white shadow-lg transform scale-105"
                  : hasAnswered && index === quiz.correctAnswer
                    ? "bg-green-700 border-green-500 text-white shadow-lg"
                    : "bg-[#3a2718] border-[#5a3a23] text-amber-200 hover:bg-[#4a3728] hover:border-amber-700"
              } ${hasAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
              style={{ fontFamily: "monospace" }}
            >
              {index === 0 ? "✓" : "✗"} {option}
            </button>
          ))}
        </div>
      )}

      {showExplanation && quiz.explanation && (
        <div className="bg-blue-900 border-4 border-blue-700 rounded-lg p-4 mb-4 shadow-lg animate-pulse">
          <p className="text-blue-200 font-bold leading-relaxed">
            <span className="text-2xl mr-2">💡</span>
            {quiz.explanation}
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={selectedAnswer === null || selectedAnswer === "" || hasAnswered}
        className={`w-full py-4 rounded-lg font-bold text-xl transition-all border-4 ${
          (selectedAnswer === null || selectedAnswer === "") || hasAnswered
            ? "bg-[#3a2718] border-[#5a3a23] text-amber-800 cursor-not-allowed opacity-50"
            : "bg-amber-600 hover:bg-amber-500 border-amber-800 text-white transform hover:scale-105 shadow-lg"
        }`}
        style={{
          fontFamily: "monospace",
          textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
        }}
      >
        {hasAnswered ? "⏳ NEXT QUESTION..." : "⚔️ SUBMIT ANSWER"}
      </button>
    </div>
  )
}
