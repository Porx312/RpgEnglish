"use client"

interface BattleResultProps {
  status: "won" | "lost"
  score: number
  totalQuestions: number
  accuracy: number
  worldId: string
  levelNumber: number
  onRetry: () => void
  onContinue: () => void
}

export function BattleResult({
  status,
  score,
  totalQuestions,
  accuracy,
  worldId,
  levelNumber,
  onRetry,
  onContinue,
}: BattleResultProps) {
  return (
    <div className="min-h-screen w-full bg-[#2d1f15] flex items-center justify-center p-4">
      <div
        className="bg-[#4a3728] rounded-lg border-4 border-[#6b4423] shadow-2xl p-8 max-w-md w-full text-center"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, transparent 2px, transparent 4px, rgba(0,0,0,0.05) 4px),
            repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, transparent 2px, transparent 4px, rgba(0,0,0,0.05) 4px)
          `,
        }}
      >
        <div className="text-8xl mb-4 animate-bounce">{status === "won" ? "🏆" : "💀"}</div>

        <h1
          className={`text-5xl font-bold mb-2 ${status === "won" ? "text-amber-200" : "text-red-300"}`}
          style={{
            fontFamily: "monospace",
            textShadow: status === "won" ? "4px 4px 0px #6b4423" : "4px 4px 0px #7f1d1d",
          }}
        >
          {status === "won" ? "VICTORY!" : "DEFEAT!"}
        </h1>

        <p className="text-amber-700 mb-6 text-lg font-bold">
          {status === "won" ? "You've conquered this level!" : "Don't give up! Try again!"}
        </p>

        <div className="bg-[#1a1410] rounded-lg p-6 border-4 border-[#5a3a23] mb-6 space-y-4">
          <div className="flex justify-between items-center border-b-2 border-[#5a3a23] pb-3">
            <span className="text-amber-200 font-bold text-lg" style={{ fontFamily: "monospace" }}>
              SCORE:
            </span>
            <span className="text-amber-400 font-bold text-3xl" style={{ fontFamily: "monospace" }}>
              {score}
            </span>
          </div>

          <div className="flex justify-between items-center border-b-2 border-[#5a3a23] pb-3">
            <span className="text-amber-200 font-bold text-lg" style={{ fontFamily: "monospace" }}>
              ACCURACY:
            </span>
            <span
              className={`font-bold text-3xl ${
                accuracy >= 80 ? "text-green-400" : accuracy >= 60 ? "text-amber-400" : "text-red-400"
              }`}
              style={{ fontFamily: "monospace" }}
            >
              {Math.round(accuracy)}%
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-amber-200 font-bold text-lg" style={{ fontFamily: "monospace" }}>
              QUESTIONS:
            </span>
            <span className="text-amber-400 font-bold text-3xl" style={{ fontFamily: "monospace" }}>
              {totalQuestions}
            </span>
          </div>

          {status === "won" && (
            <>
              <div className="border-t-4 border-amber-600 pt-4 mt-4 space-y-2">
                <div className="flex justify-between items-center bg-green-900 bg-opacity-30 p-2 rounded">
                  <span className="text-green-300 font-bold flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <span>GOLD:</span>
                  </span>
                  <span className="text-green-400 font-bold text-2xl" style={{ fontFamily: "monospace" }}>
                    +50
                  </span>
                </div>
                <div className="flex justify-between items-center bg-blue-900 bg-opacity-30 p-2 rounded">
                  <span className="text-blue-300 font-bold flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span>EXP:</span>
                  </span>
                  <span className="text-blue-400 font-bold text-2xl" style={{ fontFamily: "monospace" }}>
                    +100
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-3">
          {status === "lost" && (
            <button
              onClick={onRetry}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-6 rounded-lg border-4 border-amber-800 transition-all transform hover:scale-105 shadow-lg"
              style={{
                fontFamily: "monospace",
                textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
              }}
            >
              ⚔️ TRY AGAIN
            </button>
          )}

          <button
            onClick={onContinue}
            className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg border-4 border-green-900 transition-all transform hover:scale-105 shadow-lg"
            style={{
              fontFamily: "monospace",
              textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
            }}
          >
            {status === "won" ? "➡️ CONTINUE" : "🗺️ BACK TO MAP"}
          </button>
        </div>
      </div>
    </div>
  )
}
