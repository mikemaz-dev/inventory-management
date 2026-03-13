'use client'

import { useRouter } from 'next/navigation'

import { PUBLIC_PAGES } from '@/config/public.config'

import { Button } from '../ui/button'

export function BackToDashboardButton() {
	const router = useRouter()

	return (
		<Button
			variant='outline'
			className='w-fit'
			onClick={() => router.push(PUBLIC_PAGES.DASHBOARD)}
		>
			Back to Dashboard
		</Button>
	)
}
