'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS_FIELDS } from '@/lib/query-key'
import type {
	TCreateInventoryFieldDto,
	TUpdateInventoryFieldDto
} from '@/schemas/inventory-field.schema'
import { inventoryFieldService } from '@/services/inventory-fields.service'

export function useInventoryFields(inventoryId: string) {
	const queryClient = useQueryClient()

	const query = useQuery({
		queryKey: QUERY_KEYS_FIELDS.inventoryFields(inventoryId),
		queryFn: () => inventoryFieldService.getList(inventoryId)
	})

	const createMutation = useMutation({
		mutationFn: (dto: TCreateInventoryFieldDto) => inventoryFieldService.create(dto),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS_FIELDS.inventoryFields(inventoryId)
			})
		}
	})

	const updateMutation = useMutation({
		mutationFn: ({ id, dto }: { id: string; dto: TUpdateInventoryFieldDto }) =>
			inventoryFieldService.update(id, dto),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS_FIELDS.inventoryFields(inventoryId)
			})
		}
	})

	const deleteMutation = useMutation({
		mutationFn: (id: string) => inventoryFieldService.delete(id),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS_FIELDS.inventoryFields(inventoryId)
			})
		}
	})

	return {
		fields: query.data ?? [],
		isLoading: query.isLoading,

		createField: createMutation.mutateAsync,
		updateField: updateMutation.mutateAsync,
		deleteField: deleteMutation.mutateAsync
	}
}
