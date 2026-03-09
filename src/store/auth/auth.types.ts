import { IUser } from '@/types/user.types'

export interface IAuthState {
	user: IUser | null
	accessToken: string | null
	isAuthenticated: boolean
}
