import { useBlockUser } from '@/hooks/admin/useBlockUser'
import { useChangeRole } from '@/hooks/admin/useChangeRole'
import { useDeleteUser } from '@/hooks/admin/useDeleteUser'

import { RoleEnum } from '@/types/user.types'

export function useUsersActions() {
	const blockMutation = useBlockUser()
	const roleMutation = useChangeRole()
	const deleteMutation = useDeleteUser()

	const block = async (ids: string[]) => {
		await Promise.all(ids.map(id => blockMutation.mutateAsync({ id, isBlocked: true })))
	}

	const unblock = async (ids: string[]) => {
		await Promise.all(ids.map(id => blockMutation.mutateAsync({ id, isBlocked: false })))
	}

	const remove = async (ids: string[]) => {
		await Promise.all(ids.map(id => deleteMutation.mutateAsync(id)))
	}

	const changeRole = async (ids: string[], role: RoleEnum) => {
		await Promise.all(ids.map(id => roleMutation.mutateAsync({ id, role })))
	}

	return {
		block,
		unblock,
		remove,
		changeRole,
		blockMutation,
		deleteMutation
	}
}
