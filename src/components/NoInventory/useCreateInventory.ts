'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { TCreateInventoryForm, createInventorySchema } from '@/schemas/inventory.schema'
import { inventoryService } from '@/services/inventory.service'

export function useCreateInventory() {
	const queryClient = useQueryClient()

	const { control, handleSubmit, reset, formState } = useForm<TCreateInventoryForm>({
		resolver: zodResolver(createInventorySchema),
		mode: 'onBlur',
		defaultValues: {
			title: '',
			description: '',
			imageUrl: '',
			category: undefined,
			isPublic: false
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: TCreateInventoryForm) => inventoryService.create(data),

		onSuccess: () => {
			reset()
			toast.success('Inventory created')
			queryClient.invalidateQueries({ queryKey: ['inventories'] })
		},

		onError: (error: any) => {
			toast.error(error?.message ?? 'Creating error')
		}
	})

	const onSubmit: SubmitHandler<TCreateInventoryForm> = data => {
		mutate(data)
	}

	return {
		handleSubmit,
		control,
		onSubmit,
		isLoading: formState.isSubmitting || isPending
	}
}
