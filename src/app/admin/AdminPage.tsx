'use client'

import { useUsers } from '@/hooks/admin/useUsers'

import { UsersTable } from './UsersTable'

export default function AdminPage() {
	const { data, isLoading } = useUsers()

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='p-8'>
			<h1 className='mb-6 text-2xl font-bold'>Admin Panel</h1>

			<UsersTable users={data ?? []} />
		</div>
	)
}
