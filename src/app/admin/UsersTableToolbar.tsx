import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { RoleEnum } from '@/types/user.types'

interface Props {
	search: string
	onSearch: (v: string) => void
	selectedCount: number
	onBlock: () => void
	onUnblock: () => void
	onDelete: () => void
	onRoleChange: (role: RoleEnum) => void
}

export function UsersTableToolbar({
	search,
	onSearch,
	selectedCount,
	onBlock,
	onUnblock,
	onDelete,
	onRoleChange
}: Props) {
	return (
		<div className='flex items-center justify-between gap-4'>
			<Input
				placeholder='Search users...'
				value={search}
				onChange={e => onSearch(e.target.value)}
				className='max-w-sm'
			/>

			{selectedCount > 0 && (
				<div className='flex items-center gap-2'>
					<Badge variant='secondary'>{selectedCount} selected</Badge>

					<Select onValueChange={role => onRoleChange(role as RoleEnum)}>
						<SelectTrigger className='w-32'>
							<SelectValue placeholder='Change role' />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value='USER'>USER</SelectItem>
							<SelectItem value='ADMIN'>ADMIN</SelectItem>
						</SelectContent>
					</Select>

					<Button
						variant='destructive'
						size='sm'
						onClick={onBlock}
					>
						Block
					</Button>

					<Button
						variant='secondary'
						size='sm'
						onClick={onUnblock}
					>
						Unblock
					</Button>

					<Button
						variant='destructive'
						size='sm'
						onClick={onDelete}
					>
						Delete
					</Button>
				</div>
			)}
		</div>
	)
}
