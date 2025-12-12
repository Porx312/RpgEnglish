"use client"

import type React from "react"
import { CreateItemForm } from "./CreateItemForm"
import { ItemsList } from "./ItemsList"
import { Id } from "../../../../../convex/_generated/dataModel"


interface ItemsTabProps {
    items: any[]
    itemForm: {
        name: string
        type: string
        svgData: string
        category: string
        requiredLevel: number
        price: number
        rarity: string
    }
    onFormChange: (form: any) => void
    onSubmit: (e: React.FormEvent) => void
    onDelete: (itemId: Id<"items">) => void
    loading: boolean
}

export function ItemsTab({ items, itemForm, onFormChange, onSubmit, onDelete, loading }: ItemsTabProps) {
    return (
        <>
            <CreateItemForm form={itemForm} onChange={onFormChange} onSubmit={onSubmit} loading={loading} />
            <ItemsList items={items} onDelete={onDelete} />
        </>
    )
}
