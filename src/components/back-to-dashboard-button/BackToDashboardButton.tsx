'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PUBLIC_PAGES } from '@/config/public.config'

import { Button } from '../ui/button'

export function BackToDashboardButton() {
	const router = useRouter()

	return (
		<Button
			variant='ghost'
			className='flex w-fit items-center gap-1.5'
			onClick={() => router.push(PUBLIC_PAGES.DASHBOARD)}
		>
			<ChevronLeft size='22' />
			Back to Dashboard
		</Button>
	)
}
