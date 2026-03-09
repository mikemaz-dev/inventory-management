'use client'

import Cookies from 'js-cookie'
import { ReactNode, useEffect, useState } from 'react'

import { authService } from '@/services/auth.service'
import { EnumTokens } from '@/types/auth.types'

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)

		if (!refreshToken) {
			setIsReady(true)
			return
		}

		authService
			.refresh()
			.catch(() => {})
			.finally(() => setIsReady(true))
	}, [])

	if (!isReady) return null

	return <>{children}</>
}
