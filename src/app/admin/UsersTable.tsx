'use client'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { useBlockUser } from '@/hooks/admin/useBlockUser'
import { useChangeRole } from '@/hooks/admin/useChangeRole'
import { useDeleteUser } from '@/hooks/admin/useDeleteUser'

import { IUser, RoleEnum } from '@/types/user.types'

interface Props {
	users: IUser[]
}

export function UsersTable({ users }: Props) {
	const blockMutation = useBlockUser()
	const roleMutation = useChangeRole()
	const deleteMutation = useDeleteUser()

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Email</TableHead>
					<TableHead>Username</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{users.map(user => (
					<TableRow key={user.id}>
						<TableCell>{user.email}</TableCell>

						<TableCell>{user.username}</TableCell>

						<TableCell>
							<Select
								defaultValue={user.role}
								onValueChange={role =>
									roleMutation.mutate({
										id: user.id,
										role: role as RoleEnum
									})
								}
							>
								<SelectTrigger className='w-30'>
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value='USER'>USER</SelectItem>

									<SelectItem value='ADMIN'>ADMIN</SelectItem>
								</SelectContent>
							</Select>
						</TableCell>

						<TableCell>
							<Button
								variant={user.isBlocked ? 'secondary' : 'destructive'}
								onClick={() =>
									blockMutation.mutate({
										id: user.id,
										isBlocked: !user.isBlocked
									})
								}
							>
								{user.isBlocked ? 'Unblock' : 'Block'}
							</Button>
						</TableCell>

						<TableCell>
							<Button
								variant='destructive'
								onClick={() => deleteMutation.mutate(user.id)}
							>
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
