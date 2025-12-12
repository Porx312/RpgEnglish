import type React from "react"
interface CharacterBattleCardProps {
    name: string
    hp: number
    children: React.ReactNode
}

export const CharacterBattleCard = ({ name, hp, children }: CharacterBattleCardProps) => {
    const hpPercentage = Math.max(0, Math.min(100, hp))

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-[#3a2718] rounded-lg border-2 border-[#5a3a23] p-4 w-full max-w-sm">
                <h3 className="text-amber-200 font-bold text-xl text-center mb-3">{name}</h3>

                {/* HP Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-amber-400 mb-1">
                        <span>HP</span>
                        <span>{hp}/100</span>
                    </div>
                    <div className="w-full bg-[#2d1f15] rounded-full h-4 border-2 border-[#5a3a23]">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${hp > 50 ? "bg-green-500" : hp > 25 ? "bg-yellow-500" : "bg-red-500"
                                }`}
                            style={{ width: `${hpPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Character Preview */}
                <div className="flex justify-center items-center bg-[#2d1f15] rounded-lg p-4 border border-[#5a3a23]">
                    {children}
                </div>
            </div>
        </div>
    )
}
