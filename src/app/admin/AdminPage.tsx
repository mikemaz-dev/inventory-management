'use client'

import { BackToDashboardButton } from '@/components/back-to-dashboard-button/BackToDashboardButton'
import { ThemeToggle } from '@/components/theme-toggle/ThemeToggle'
import { LogoutButton } from '@/components/ui/logout-button'

import { useUsers } from '@/hooks/admin/useUsers'

import { UsersTable } from './UsersTable'

export default function AdminPage() {
	const { data, isLoading } = useUsers()

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='space-y-6 p-8'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col gap-2'>
					<BackToDashboardButton />
					<h1 className='text-2xl font-bold'>Admin Panel</h1>
				</div>
				<div className='flex items-center gap-2'>
					<ThemeToggle />
					<LogoutButton />
				</div>
			</div>

			<UsersTable users={data ?? []} />
		</div>
	)
}
