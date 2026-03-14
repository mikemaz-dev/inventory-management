'use client'

import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { UsersTableRow } from './UsersTableRow'
import { UsersTableToolbar } from './UsersTableToolbar'
import { useUsersActions } from './useUsersActions'
import { useUsersSelection } from './useUsersSelection'
import { filterUsers } from '@/lib/filterUsers'
import type { IUser } from '@/types/user.types'

interface Props {
	users: IUser[]
}

export function UsersTable({ users }: Props) {
	const [search, setSearch] = useState('')

	const filteredUsers = filterUsers(users, search)

	const { selectedIds, toggle, setSelectedIds } = useUsersSelection()

	const { block, unblock, remove, changeRole } = useUsersActions()

	const selectedArray = Array.from(selectedIds)

	const selectedUsers = filteredUsers.filter(u => selectedIds.has(u.id))
	const hasBlocked = selectedUsers.some(u => u.isBlocked)
	const hasUnblocked = selectedUsers.some(u => !u.isBlocked)

	const allSelected = filteredUsers.length > 0 && filteredUsers.every(u => selectedIds.has(u.id))

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedIds(new Set(filteredUsers.map(u => u.id)))
		} else {
			setSelectedIds(new Set())
		}
	}

	return (
		<div className='space-y-4'>
			<UsersTableToolbar
				search={search}
				onSearch={setSearch}
				selectedCount={selectedIds.size}
				allSelected={allSelected}
				onSelectAll={handleSelectAll}
				hasBlocked={hasBlocked}
				hasUnblocked={hasUnblocked}
				onBlock={() => block(selectedArray)}
				onUnblock={() => unblock(selectedArray)}
				onDelete={() => remove(selectedArray)}
				onRoleChange={role => changeRole(selectedArray, role)}
			/>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Checkbox
									checked={allSelected}
									onCheckedChange={handleSelectAll}
								/>
							</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Username</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{filteredUsers.map(user => (
							<UsersTableRow
								key={user.id}
								user={user}
								selected={selectedIds.has(user.id)}
								onSelect={checked => toggle(user.id, checked)}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
