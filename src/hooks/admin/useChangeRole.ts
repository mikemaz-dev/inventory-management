'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { adminService } from '@/services/admin.service'
import { RoleEnum } from '@/types/user.types'

export function useChangeRole() {
	const qc = useQueryClient()

	return useMutation({
		mutationFn: ({ id, role }: { id: string; role: RoleEnum }) => adminService.changeRole(id, role),

		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['users'] })
		}
	})
}
