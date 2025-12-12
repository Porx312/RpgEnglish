"use client"

import type React from "react"
import { DropConfiguration } from "./DropConfiguration"
import { CreateEnemyForm } from "./CreateEnemyForm"
import { EnemiesList } from "./EnemiesList"
import { Id } from "../../../../../convex/_generated/dataModel"


interface EnemiesTabProps {
    enemies: any[]
    items: any[]
    enemyForm: any
    dropForm: any
    onEnemyFormChange: (form: any) => void
    onDropFormChange: (form: any) => void
    onEnemySubmit: (e: React.FormEvent) => void
    onDropSubmit: () => void
    onDelete: (enemyId: Id<"enemies">) => void
    loading: boolean
}

export function EnemiesTab({
    enemies,
    items,
    enemyForm,
    dropForm,
    onEnemyFormChange,
    onDropFormChange,
    onEnemySubmit,
    onDropSubmit,
    onDelete,
    loading,
}: EnemiesTabProps) {
    const hairItems = items.filter((item) => item.type === "hair")
    const outfitItems = items.filter((item) => item.type === "outfit")
    const weaponItems = items.filter((item) => item.type === "weapon")

    return (
        <>
            <CreateEnemyForm
                form={enemyForm}
                hairItems={hairItems}
                outfitItems={outfitItems}
                weaponItems={weaponItems}
                onChange={onEnemyFormChange}
                onSubmit={onEnemySubmit}
                loading={loading}
            />
            {enemies.length > 0 && (
                <DropConfiguration
                    enemies={enemies}
                    items={items}
                    dropForm={dropForm}
                    onChange={onDropFormChange}
                    onSubmit={onDropSubmit}
                    loading={loading}
                />
            )}
            <EnemiesList enemies={enemies} onDelete={onDelete} />
        </>
    )
}
