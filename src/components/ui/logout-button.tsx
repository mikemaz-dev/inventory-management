'use client'

import { Button } from '@/components/ui/button'

import { useLogout } from '@/hooks/auth/useLogout'

export function LogoutButton() {
	const { logout, isLoading } = useLogout()

	return (
		<Button
			variant='destructive'
			onClick={() => logout()}
			disabled={isLoading}
		>
			Logout
		</Button>
	)
}
