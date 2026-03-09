import type { Metadata } from 'next'

import { AuthPage } from '../AuthPage'

export const metadata: Metadata = {
	title: 'Login'
}

export default function Page() {
	return <AuthPage isLogin />
}
