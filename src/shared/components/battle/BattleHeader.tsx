import TittleSvg from "@/shared/lib/svgAssets/TittleSvg"

interface BattleHeaderProps {
    worldId: string
    levelNumber: number
    message: string
}

export const BattleHeader = ({ worldId, levelNumber, message }: BattleHeaderProps) => {
    return (
        <div className="relative z-50 min-w-full px-8 py-10   max-w-7xl mx-auto overflow-hidden">
            <TittleSvg className="absolute top-0 left-0 w-full h-full" />
            <div className="relative flex items-center p-3 justify-center">
                <div className="text-center z-10">
                    <h1 className="md:text-2xl text-xl z-10 font-bold text-amber-200 mb-1">
                        {worldId.toUpperCase().replace("-", " ")} - LEVEL {levelNumber}
                    </h1>
                    <p className="md:text-sm text-xs text-amber-400 z-10 font-bold">{message}</p>
                </div>
            </div>
        </div>
    )
}
