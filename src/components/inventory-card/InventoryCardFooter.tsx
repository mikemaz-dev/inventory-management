import dayjs from 'dayjs'
import { Calendar } from 'lucide-react'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { CardFooter } from '../ui/card'

import { IInventory } from '@/types/inventory.types'

export function InventoryCardFooter({ inventory }: { inventory: IInventory }) {
	const getInitials = (name?: string) =>
		name
			? name
					.split(' ')
					.map(n => n[0])
					.join('')
					.toUpperCase()
					.slice(0, 2)
			: 'U'

	return (
		<CardFooter className='border-border flex items-center justify-between border-t p-2'>
			<div className='flex items-center gap-2.5'>
				<Avatar className='border-border size-6 border'>
					<AvatarFallback className='bg-secondary text-secondary-foreground text-[10px]'>
						{getInitials(inventory.owner?.password || inventory.owner?.email)}
					</AvatarFallback>
				</Avatar>
				<span className='text-muted-foreground max-w-30 truncate text-xs'>
					{inventory.owner?.username || inventory.owner?.email || 'Unknown'}
				</span>
			</div>
			<div className='text-muted-foreground flex items-center gap-1 text-xs'>
				<Calendar className='size-3' />
				<span>{dayjs(inventory.createdAt).format('MMM D, YYYY')}</span>
			</div>
		</CardFooter>
	)
}
