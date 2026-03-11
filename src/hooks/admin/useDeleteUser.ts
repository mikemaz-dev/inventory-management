'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { adminService } from '@/services/admin.service'

export function useDeleteUser() {
	const qc = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => adminService.deleteUser(id),

		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['users'] })
		}
	})
}
