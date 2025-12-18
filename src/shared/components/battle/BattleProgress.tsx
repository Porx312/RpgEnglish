interface BattleProgressProps {
    quizzes: any[]
    currentQuizIndex: number
    failuresCount: number
    maxFailures: number
}

export const BattleProgress = ({ quizzes, currentQuizIndex, failuresCount, maxFailures }: BattleProgressProps) => {
    if (!quizzes || quizzes.length === 0) {
        return null
    }

    return (
        <div className="w-full relative z-50 p-6">
            <div className=" mx-auto flex items-center gap-4">
                {/* Quest Progress */}
                <div className="flex items-center  gap-4">
                    <span className="text-yellow-600 text-sm font-bold uppercase tracking-wider">Quest Progress:</span>
                    <div className="flex items-center gap-2">
                        {quizzes.map((_, i: number) => (
                            <div
                                key={i}
                                className={`
                  w-8 h-8 rounded-md border-3 transition-all shadow-lg flex items-center justify-center
                  ${i < currentQuizIndex
                                        ? "bg-green-500 border-green-400 shadow-green-700/50"
                                        : i === currentQuizIndex
                                            ? "bg-yellow-400 border-yellow-300 animate-pulse shadow-yellow-600/50"
                                            : "bg-gray-700 border-gray-600 shadow-gray-900/50"
                                    }
                `}
                            >
                                {i < currentQuizIndex && <span className="text-white text-lg font-bold">✓</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Failures Count */}
                <div className="flex items-center gap-2">
                    <span className="text-red-400 text-sm font-bold uppercase tracking-wider">💔 Failures:</span>
                    <span className="text-red-300 text-lg font-bold">
                        {failuresCount} / {maxFailures + 1}
                    </span>
                </div>
            </div>
        </div>
    )
}
