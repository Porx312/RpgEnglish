"use client"

import { CharacterPreview } from "@/shared/components/AvatarPreview/CharacterPreview"
import { BattleProgress } from "@/shared/components/battle/BattleProgress"
import { BattleResultScreen } from "@/shared/components/battle/BattleResultScreen"
import { CharacterBattleCard } from "@/shared/components/battle/CharacterBattleCard"
import { BattleLoadingScreen } from "@/shared/components/battle/LoadingScreen"
import { QuizRenderer } from "@/shared/components/battle/QuizRender"
import { QuizCard } from "@/shared/components/battle/QuizCard"
import { useBattleStore } from "@/shared/store/use-battle.store"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { useRouter, useParams } from "next/navigation"
import { useEffect } from "react"
import { useBattleLogic } from "@/shared/hooks/use-battle-logic"
import { api } from "../../../../../convex/_generated/api"
import { BattleHeader } from "@/shared/components/battle/BattleHeader"
import SvgMapBack from "@/shared/lib/svgAssets/SvgMapBack"

export default function BattlePage() {
    const { user } = useUser()
    const router = useRouter()
    const params = useParams()

    const worldId = decodeURIComponent(params.worldid as string)
    const levelNumber = Number.parseInt(params.levelNumber as string)

    const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")
    const items = useQuery(api.items.getAllItems)
    const allWorlds = useQuery(api.worlds.getAllWorlds)

    const {
        playerHP,
        enemyHP,
        currentQuizIndex,
        playerAnimation,
        enemyAnimation,
        battleStatus,
        message,
        score,
        correctAnswersCount,
        failuresCount,
        drops,
        setUserAnswer,
        setMatchingAnswers,
        resetBattle,
    } = useBattleStore()

    const { levelData, quizzes, enemy, isLoading, handleAnswer, handleMatchingSubmit, maxFailures } = useBattleLogic({
        userId: user?.id,
        worldId,
        levelNumber,
    })

    useEffect(() => {
        setUserAnswer("")
        setMatchingAnswers({})
    }, [currentQuizIndex, setUserAnswer, setMatchingAnswers])

    // Redirect to character creation if no character
    if (character === null) {
        router.push("/character-creation")
        return null
    }

    // Loading states
    if (!user || character === undefined || items === undefined) {
        return <BattleLoadingScreen type="battle" user={!!user} character={character} items={!!items} />
    }

    if (!levelData) {
        return (
            <BattleLoadingScreen
            />
        )
    }

    if (!quizzes || quizzes.length === 0) {
        return <BattleLoadingScreen/>
    }

    if (!enemy) {
        return <BattleLoadingScreen  />
    }

    const hairItem = items.find((item) => item._id === character.hairItemId)
    const outfitItem = items.find((item) => item._id === character.outfitItemId)
    const weaponItem = items.find((item) => item._id === character.weaponItemId)
    const accessoryItem = items.find((item) => item._id === character.accessoryItemId)

    const enemyHairItem = items.find((item) => item._id === enemy.hairItemId)
    const enemyOutfitItem = items.find((item) => item._id === enemy.outfitItemId)
    const enemyWeaponItem = items.find((item) => item._id === enemy.weaponItemId)

    const currentQuiz = quizzes[currentQuizIndex]

    if (battleStatus !== "active") {
        return (
            <BattleResultScreen
                battleStatus={battleStatus}
                message={message}
                score={score}
                correctAnswersCount={correctAnswersCount}
                quizzesLength={quizzes.length}
                drops={drops}
                items={items}
                onRetry={resetBattle}
            />
        )
    }

    return (
        <div className="min-h-screen flex flex-col"
        >
            {/* Header with Level Banner */}
            <div className="absolute inset-0 ">
                <div className="w-full h-full bg-[length:2000px_auto] bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://res.cloudinary.com/dq0pfesxe/image/upload/v1765809751/game_background_3_dyvuvk.png')"
                    }}
                />

            </div>
            {/* Main Battle Area */}
            <div className="flex-1 relative overflow-hidden">
                {/* Background Scene - you can replace this with your SVG map */}


                {/* Characters Container */}
                <div className="relative z-10 h-full max-w-7xl mx-auto px-8 pt-28 pb-8">
                    <div className="grid grid-cols-2 gap-32 h-full items-end justify-items-center">
                        {/* Player Character */}
                        <CharacterBattleCard name={character.name} hp={playerHP}>
                            <CharacterPreview
                                skinColor={character.skinColor}
                                eyeColor={character.eyeColor}
                                hairColor={character.hairColor}
                                hairSvg={hairItem?.svgData}
                                outfitSvg={outfitItem?.svgData}
                                weaponSvg={weaponItem?.svgData}
                                accesorysvg={accessoryItem?.svgData}
                                animation={playerAnimation}
                                className="w-36 h-36 md:w-56 md:h-56"
                            />
                        </CharacterBattleCard>

                        {/* Enemy Character */}
                        <CharacterBattleCard name={enemy.name} hp={enemyHP} isEnemy>

                            <CharacterPreview
                                skinColor={enemy.skinColor}
                                eyeColor={enemy.eyeColor}
                                hairColor={enemy.hairColor || "#000000"}
                                hairSvg={enemyHairItem?.svgData}
                                outfitSvg={enemyOutfitItem?.svgData}
                                weaponSvg={enemyWeaponItem?.svgData}
                                animation={enemyAnimation}
                                className="w-36 h-36 md:w-56 md:h-56 scale-x-[1]"
                            />

                        </CharacterBattleCard>
                    </div>
                </div>
            </div>
            <div className="relative z-10 bg-transparent">

                <SvgMapBack className="absolute inset-0 w-full h-full" />
                <BattleHeader levelNumber={levelNumber} message={message} worldId={worldId} />

                {/* Question Card at Bottom */}
                <div className="relative z-20  md:mt-12 mt-6">
                    {currentQuiz && (
                        <QuizCard
                            currentQuizIndex={currentQuizIndex}
                            quizzesLength={quizzes.length}
                            question={currentQuiz.question}
                            explanation={currentQuiz.explanation}
                        >
                            <div className="h-[250px] w-full flex items-center justify-center">

                                <QuizRenderer quiz={currentQuiz} onAnswer={handleAnswer} onMatchingSubmit={handleMatchingSubmit} />
                            </div>
                        </QuizCard>
                    )}
                </div>

                {/* Progress Footer */}
                <BattleProgress
                    quizzes={quizzes}
                    currentQuizIndex={currentQuizIndex}
                    failuresCount={failuresCount}
                    maxFailures={maxFailures}
                />
            </div>
        </div>
    )
}

