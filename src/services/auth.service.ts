import Cookies from 'js-cookie'

import { clearAuthData, setAuthData } from '@/store/auth/auth.slice'

import { axiosClassic } from '@/api/axios'

import { store } from '@/store'
import { EnumTokens, IAuthData, type IAuthResponse, type TAuthType } from '@/types/auth.types'

export class AuthService {
	private BASE = '/auth'

	async auth(type: TAuthType, data: IAuthData) {
		const response = await axiosClassic.post<{ success: boolean; data?: IAuthResponse }>(
			`${this.BASE}/${type}`,
			data
		)

		const payload = type === 'register' ? response.data.data : (response.data as any)

		if (!payload?.accessToken) {
			throw new Error('Invalid auth response')
		}

		this._saveTokens(payload.accessToken, payload.refreshToken)

		store.dispatch(
			setAuthData({
				user: payload.user,
				accessToken: payload.accessToken
			})
		)

		return payload
	}

	async refresh() {
		const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)
		if (!refreshToken) throw new Error('No refresh token')

		const response = await axiosClassic.post<{ success: boolean; accessToken: string }>(
			`${this.BASE}/refresh`,
			{ token: refreshToken }
		)

		if (!response.data.accessToken) {
			throw new Error('Invalid refresh response')
		}

		Cookies.set(EnumTokens.ACCESS_TOKEN, response.data.accessToken)

		store.dispatch(
			setAuthData({
				user: store.getState().auth.user!,
				accessToken: response.data.accessToken
			})
		)

		return response.data.accessToken
	}

	logout() {
		this._clearTokens()
		store.dispatch(clearAuthData())
	}

	private _saveTokens(access: string, refresh: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, access, { expires: 1 / 24 })
		Cookies.set(EnumTokens.REFRESH_TOKEN, refresh, { expires: 7 })
	}

	private _clearTokens() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
		Cookies.remove(EnumTokens.REFRESH_TOKEN)
	}
}

export const authService = new AuthService()
