import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { TableCell, TableRow } from '@/components/ui/table'

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

			<TableCell>{user.email}</TableCell>
			<TableCell>{user.username}</TableCell>
			<TableCell>
				<Badge variant='outline'>{user.role}</Badge>
			</TableCell>

			<TableCell>
				<Badge variant={user.isBlocked ? 'destructive' : 'default'}>
					{user.isBlocked ? 'Blocked' : 'Active'}
				</Badge>
			</TableCell>
		</TableRow>
	)
}
