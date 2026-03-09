import type { Metadata } from 'next'

import { AuthPage } from '../AuthPage'

export const metadata: Metadata = {
	title: 'Sign Up'
}

export default function LoginPage() {
	return <AuthPage isLogin={false} />
}
