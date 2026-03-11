export const RoleEnum = {
	ADMIN: 'ADMIN',
	USER: 'USER'
} as const

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum]

export interface IUser {
	id: string
	email: string
	username: string
	avatar: string | null
	role: RoleEnum
	isBlocked: boolean
	createdAt: string
}
