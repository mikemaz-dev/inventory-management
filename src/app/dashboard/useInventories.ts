'use client'

import { useQuery } from '@tanstack/react-query'

import { inventoryService } from '@/services/inventory.service'
import { IInventory } from '@/types/inventory.types'

export function useInventories() {
	const query = useQuery<IInventory[]>({
		queryKey: ['inventories'],
		queryFn: () => inventoryService.getList(),
		staleTime: 1000 * 60 * 5
	})

	return {
		inventories: query.data ?? [],
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refetch: query.refetch
	}
}
