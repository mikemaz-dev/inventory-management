import { NextRequest, NextResponse } from 'next/server'

import { PUBLIC_PAGES } from './config/public.config'
import { EnumTokens } from './types/auth.types'

const PUBLIC_PATHS = [PUBLIC_PAGES.LOGIN, PUBLIC_PAGES.REGISTER]

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path))

	const isDashboard = pathname.startsWith(PUBLIC_PAGES.DASHBOARD)

	if (!refreshToken && isDashboard) {
		const loginUrl = new URL(PUBLIC_PAGES.LOGIN, request.url)
		loginUrl.searchParams.set('form', pathname)

		return NextResponse.redirect(loginUrl)
	}

	if (refreshToken && isPublicPath) {
		return NextResponse.redirect(new URL(PUBLIC_PAGES.DASHBOARD, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*']
}
