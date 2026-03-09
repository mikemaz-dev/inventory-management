import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeys } from '@/lib/query-key'
import { itemService } from '@/services/item.service'

export function useDeleteItem(inventoryId: string) {
	const qc = useQueryClient()

	return useMutation({
		mutationFn: itemService.delete,

		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [QueryKeys.ITEMS, inventoryId]
			})
		}
	})
}
