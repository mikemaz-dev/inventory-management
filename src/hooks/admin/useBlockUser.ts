'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { adminService } from '@/services/admin.service'

export function useBlockUser() {
	const qc = useQueryClient()

	return useMutation({
		mutationFn: ({ id, isBlocked }: { id: string; isBlocked: boolean }) =>
			adminService.blockUser(id, isBlocked),

		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['users'] })
		}
	})
}
