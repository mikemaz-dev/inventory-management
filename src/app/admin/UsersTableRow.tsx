import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { TableCell, TableRow } from '@/components/ui/table'

import { cn } from '@/lib/utils'
import type { IUser } from '@/types/user.types'

interface Props {
	user: IUser
	selected: boolean
	onSelect: (checked: boolean) => void
}

export function UsersTableRow({ user, selected, onSelect }: Props) {
	return (
		<TableRow className='hover:bg-muted/50'>
			<TableCell>
				<Checkbox
					checked={selected}
					onCheckedChange={checked => onSelect(checked as boolean)}
				/>
			</TableCell>

			<TableCell className={cn(user.isBlocked && 'line-through opacity-65')}>
				{user.email}
			</TableCell>
			<TableCell className={cn(user.isBlocked && 'line-through opacity-65')}>
				{user.username}
			</TableCell>
			<TableCell className={cn(user.isBlocked && 'line-through opacity-65')}>
				<Badge variant='outline'>{user.role}</Badge>
			</TableCell>

			<TableCell className={cn(user.isBlocked && 'line-through opacity-65')}>
				<Badge variant={user.isBlocked ? 'destructive' : 'default'}>
					{user.isBlocked ? 'Blocked' : 'Active'}
				</Badge>
			</TableCell>
		</TableRow>
	)
}
