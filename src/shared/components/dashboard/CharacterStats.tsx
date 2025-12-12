interface CharacterStatsProps {
    character: any
}

export const CharacterStats = ({ character }: CharacterStatsProps) => {
    return (
        <div className="bg-[#4a3728] rounded-lg p-6 border-4 border-[#6b4423] shadow-xl">
            <h2 className="text-xl font-bold text-center mb-4 text-amber-200" style={{ fontFamily: "serif" }}>
                {character.name}
            </h2>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-red-400">Health</span>
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`w-8 h-3 rounded ${i < character.health ? "bg-red-500" : "bg-[#3a2718]"}`} />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-400">Energy</span>
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`w-8 h-3 rounded ${i < character.energy ? "bg-blue-500" : "bg-[#3a2718]"}`} />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400">XP</span>
                    <div className="flex-1 ml-2 bg-[#3a2718] h-3 rounded overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: `${character.experience % 100}%` }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
