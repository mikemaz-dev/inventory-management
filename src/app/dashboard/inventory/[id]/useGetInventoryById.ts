'use client'

import { useQuery } from '@tanstack/react-query'

import { inventoryService } from '@/services/inventory.service'
import { IInventory } from '@/types/inventory.types'

export function useGetInventoryById({ inventoryId }: { inventoryId: string }) {
	const query = useQuery<IInventory>({
		queryKey: ['inventory', inventoryId],
		queryFn: () => inventoryService.getById(inventoryId),
		staleTime: 1000 * 60 * 5
	})

	return {
		inventory: query.data
	}
}
