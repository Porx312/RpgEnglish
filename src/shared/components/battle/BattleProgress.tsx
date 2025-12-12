interface BattleProgressProps {
    quizzes: any[]
    currentQuizIndex: number
    failuresCount: number
    maxFailures: number
}

export const BattleProgress = ({ quizzes, currentQuizIndex, failuresCount, maxFailures }: BattleProgressProps) => {
    return (
        <div className="relative min-w-full h-[250px] px-8 py-10 bg-gradient-to-br flex items-center justify-center to-amber-950 shadow-2xl max-w-4xl mx-auto overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-yellow-400 text-lg font-extrabold drop-shadow-md tracking-wide">QUEST PROGRESS:</span>

                    <div className="flex items-center gap-2">
                        {quizzes.map((_, i: number) => (
                            <div
                                key={i}
                                className={`
                  w-6 h-6 rounded-md border-2 transition-all shadow-md
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

                <div className="text-center">
                    <span className="text-red-400 text-md font-bold drop-shadow-sm">
                        💔 FAILURES: {failuresCount}/{maxFailures + 1}
                    </span>
                </div>
            </div>
        </div>
    )
}
