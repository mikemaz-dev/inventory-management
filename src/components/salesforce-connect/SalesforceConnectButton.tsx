'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { SalesforceModal } from '../modals/SalesForceModal'

export function SalesforceMenuItem() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				variant='ghost'
				className='w-full justify-start'
				onClick={() => setOpen(true)}
			>
				Connect Salesforce
			</Button>

			<SalesforceModal
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}
