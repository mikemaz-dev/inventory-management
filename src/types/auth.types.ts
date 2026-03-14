import { IUser } from './user.types'

export const EnumTokens = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken'
} as const

export type TAuthType = 'login' | 'register'

export interface IAuthResponse {
	user: IUser
	accessToken: string
	refreshToken: string
}

export interface IFormData {
	email: string
	password: string
	name?: string
}

export interface IAuthData {
	username?: string
	email: string
	password: string
}

