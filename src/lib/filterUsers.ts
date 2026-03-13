import type { IUser } from '@/types/user.types'

export function filterUsers(users: IUser[], query: string) {
	const q = query.toLowerCase()

	return users.filter(
		user => user.email.toLowerCase().includes(q) || user.username.toLowerCase().includes(q)
	)
}
