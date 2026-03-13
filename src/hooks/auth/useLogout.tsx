'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { PUBLIC_PAGES } from '@/config/public.config'

import { authService } from '@/services/auth.service'

export function useLogout() {
	const queryClient = useQueryClient()

	const router = useRouter()

	const mutation = useMutation({
		mutationFn: async () => {
			authService.logout()
		},
		onSuccess: () => {
			queryClient.clear()
			toast.success('Logout is successful!')
			router.replace(PUBLIC_PAGES.LOGIN)
			router.refresh()
		}
	})

	return {
		logout: mutation.mutate,
		isLoading: mutation.isPending
	}
}
