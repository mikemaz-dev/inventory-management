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

axiosInstance.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & { _isRetry?: boolean }
		const status = error.response?.status

		if (status === 401 && originalRequest && !originalRequest._isRetry) {
			originalRequest._isRetry = true

			try {
				const newAccessToken = await authService.refresh()
				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				}
				return axiosInstance.request(originalRequest)
			} catch (refreshError) {
				store.dispatch(clearAuthData())
				Cookies.remove(EnumTokens.ACCESS_TOKEN)
				Cookies.remove(EnumTokens.REFRESH_TOKEN)
				return Promise.reject(refreshError)
			}
		}

		if (status === 401 || status === 403) {
			const skipRedirectUrls = ['/integrations/salesforce']
			const isSkipped = skipRedirectUrls.some(url => originalRequest?.url?.includes(url))

			if (!isSkipped) {
				store.dispatch(clearAuthData())
				Cookies.remove(EnumTokens.ACCESS_TOKEN)
				Cookies.remove(EnumTokens.REFRESH_TOKEN)
				window.location.href = PUBLIC_PAGES.LOGIN
			}
		}

		return Promise.reject(error)
	}
)
