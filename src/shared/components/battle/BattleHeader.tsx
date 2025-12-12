interface BattleHeaderProps {
    worldId: string
    levelNumber: number
    message: string
}

export const BattleHeader = ({ worldId, levelNumber, message }: BattleHeaderProps) => {
    return (
        <div className="relative min-w-full px-8 py-10 bg-gradient-to-br to-amber-950 shadow-2xl max-w-4xl mx-auto overflow-hidden">
            <div className="relative flex items-center justify-center">
                <div className="text-center z-10">
                    <h1 className="text-2xl z-10 font-bold text-amber-200 mb-1">
                        {worldId.toUpperCase().replace("-", " ")} - LEVEL {levelNumber}
                    </h1>
                    <p className="text-amber-400 z-10 font-bold text-lg">{message}</p>
                </div>
            </div>
        </div>
    )
}
