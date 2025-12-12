
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"


export const useItemsService = () => {
    const items = useQuery(api.items.getAllItems)
    const createItem = useMutation(api.items.createItem)
    const deleteItem = useMutation(api.items.deleteItem)

    return {
        items,
        createItem,
        deleteItem,
        isLoading: items === undefined,
    }
}
