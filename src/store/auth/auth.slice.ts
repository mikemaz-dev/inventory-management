import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { IAuthState } from './auth.types'
import { EnumTokens } from '@/types/auth.types'
import { IUser } from '@/types/user.types'

const getInitialToken = () => {
	if (typeof window === 'undefined') return null

	return Cookies.get(EnumTokens.ACCESS_TOKEN) || null
}

const initialState: IAuthState = {
	user: null,
	accessToken: getInitialToken(),
	isAuthenticated: !!getInitialToken()
}

interface ISetAuthPayload {
	user: IUser
	accessToken: string
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthData(state, action: PayloadAction<ISetAuthPayload>) {
			state.user = action.payload.user
			state.accessToken = action.payload.accessToken
			state.isAuthenticated = true
		},

		updateAccessToken(state, action: PayloadAction<string>) {
			state.accessToken = action.payload
			state.isAuthenticated = true
		},

		clearAuthData(state) {
			state.user = null
			state.accessToken = null
			state.isAuthenticated = false
		}
	}
})

export const { setAuthData, clearAuthData, updateAccessToken } = authSlice.actions
