'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeys } from '@/lib/query-key'
import { itemService } from '@/services/item.service'

export function useCreateItem(inventoryId: string) {
	const qc = useQueryClient()

	return useMutation({
		mutationFn: itemService.create,

		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QueryKeys.ITEMS, inventoryId]
			})
		}
	})
}
