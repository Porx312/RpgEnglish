"use client"

import type React from "react"
import { Id } from "../../../../../convex/_generated/dataModel"
import { CreateWorldForm } from "./CreateWorldForm"
import { CreateLevelForm } from "./CreatelevelForm"
import { CreateQuizForm } from "./CreateQuizForm"
import { WorldsList } from "./WorldList"


interface WorldsTabProps {
    worlds: any[]
    enemies: any[]
    worldForm: any
    levelForm: any
    quizForm: any
    levelsForWorld: any[]
    quizzesForLevel: any[]
    onWorldFormChange: (form: any) => void
    onLevelFormChange: (form: any) => void
    onQuizFormChange: (form: any) => void
    onWorldSubmit: (e: React.FormEvent) => void
    onLevelSubmit: (e: React.FormEvent) => void
    onQuizSubmit: (e: React.FormEvent) => void
    onDeleteWorld: (worldId: Id<"worlds">) => void
    onDeleteLevel: (levelId: Id<"levels">) => void
    onDeleteQuiz: (quizId: Id<"quizzes">) => void
    loading: boolean
}

export function WorldsTab({
    worlds,
    enemies,
    worldForm,
    levelForm,
    quizForm,
    levelsForWorld,
    quizzesForLevel,
    onWorldFormChange,
    onLevelFormChange,
    onQuizFormChange,
    onWorldSubmit,
    onLevelSubmit,
    onQuizSubmit,
    onDeleteWorld,
    onDeleteLevel,
    onDeleteQuiz,
    loading,
}: WorldsTabProps) {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CreateWorldForm form={worldForm} onChange={onWorldFormChange} onSubmit={onWorldSubmit} loading={loading} />
                <CreateLevelForm
                    form={levelForm}
                    worlds={worlds}
                    enemies={enemies}
                    onChange={onLevelFormChange}
                    onSubmit={onLevelSubmit}
                    loading={loading}
                />
            </div>
            <CreateQuizForm
                form={quizForm}
                worlds={worlds}
                onChange={onQuizFormChange}
                onSubmit={onQuizSubmit}
                loading={loading}
            />
            <WorldsList
                worlds={worlds}
                levelsForWorld={levelsForWorld}
                quizzesForLevel={quizzesForLevel}
                onDeleteWorld={onDeleteWorld}
                onDeleteLevel={onDeleteLevel}
                onDeleteQuiz={onDeleteQuiz}
            />
        </>
    )
}
