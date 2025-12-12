"use client"

import { CharacterPreview } from "@/shared/components/AvatarPreview/CharacterPreview"
import { BattleHeader } from "@/shared/components/battle/BattleHeader"
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
import { api } from "../../../../../../convex/_generated/api"
import { useBattleLogic } from "@/shared/hooks/use-battle-logic"

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
                type="level"
                worldId={worldId}
                levelNumber={levelNumber}
                allWorlds={allWorlds?.map((w) => w.worldId)}
            />
        )
    }

    if (!quizzes || quizzes.length === 0) {
        return <BattleLoadingScreen type="quizzes" worldId={worldId} levelNumber={levelNumber} />
    }

    if (!enemy) {
        return <BattleLoadingScreen type="enemy" enemyId={levelData.enemyId} />
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
        <div className="min-h-screen bg-gradient-to-b from-[#2d1f15] to-[#1a110d] flex items-center justify-center">
            <div className="bg-[#4a3728] w-full min-h-screen rounded-lg border-4 border-[#6b4423] shadow-2xl flex items-center justify-between flex-col">
                {/* Header */}
                <BattleHeader worldId={worldId} levelNumber={levelNumber} message={message} />

                {/* Battle Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 w-full">
                    {/* Player Card */}
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
                            className="w-64 h-64"
                        />
                    </CharacterBattleCard>

                    {/* Quiz Card */}
                    {currentQuiz && (
                        <QuizCard
                            currentQuizIndex={currentQuizIndex}
                            quizzesLength={quizzes.length}
                            question={currentQuiz.question}
                            explanation={currentQuiz.explanation}
                        >
                            <QuizRenderer quiz={currentQuiz} onAnswer={handleAnswer} onMatchingSubmit={handleMatchingSubmit} />
                        </QuizCard>
                    )}

                    {/* Enemy Card */}
                    <CharacterBattleCard name={enemy.name} hp={enemyHP}>
                        <div className="transform scale-x-[-1]">
                            <CharacterPreview
                                skinColor={enemy.skinColor}
                                eyeColor={enemy.eyeColor}
                                hairColor={enemy.hairColor || "#000000"}
                                hairSvg={enemyHairItem?.svgData}
                                outfitSvg={enemyOutfitItem?.svgData}
                                weaponSvg={enemyWeaponItem?.svgData}
                                animation={enemyAnimation}
                                className="w-64 h-64"
                            />
                        </div>
                    </CharacterBattleCard>
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
