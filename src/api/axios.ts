import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

import { API_URL } from '@/constants/constants'

import { PUBLIC_PAGES } from '@/config/public.config'

import { clearAuthData } from '@/store/auth/auth.slice'

import { authService } from '@/services/auth.service'
import { store } from '@/store'
import { EnumTokens } from '@/types/auth.types'

const axiosConfig: AxiosRequestConfig = {
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
}

export const axiosClassic: AxiosInstance = axios.create(axiosConfig)

export const axiosInstance: AxiosInstance = axios.create(axiosConfig)

axiosInstance.interceptors.request.use(config => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosInstance.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_isRetry?: boolean
		}

		if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
			originalRequest._isRetry = true

			try {
				const newAccessToken = await authService.refresh()

				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				}

				return axiosInstance.request(originalRequest)
			} catch (refreshError) {
				authService.logout()
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	response => response,

	error => {
		if (error.response?.status === 401 || error.response?.status === 403) {
			store.dispatch(clearAuthData())

			Cookies.remove(EnumTokens.ACCESS_TOKEN)
			Cookies.remove(EnumTokens.REFRESH_TOKEN)

			window.location.href = PUBLIC_PAGES.LOGIN
		}

		return Promise.reject(error)
	}
)
