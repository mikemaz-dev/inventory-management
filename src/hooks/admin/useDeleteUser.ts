'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteUser() {
	const qc = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => service.deleteUser(id),

		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['users'] })
		}
	})
}
