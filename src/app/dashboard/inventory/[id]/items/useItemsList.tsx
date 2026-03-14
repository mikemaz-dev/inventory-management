'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/lib/query-key'
import { itemService } from '@/services/item.service'

export function useItemsList(inventoryId: string) {
	return useQuery({
		queryKey: [QueryKeys.ITEMS, inventoryId],
		queryFn: () => itemService.getList(inventoryId)
	})
}
