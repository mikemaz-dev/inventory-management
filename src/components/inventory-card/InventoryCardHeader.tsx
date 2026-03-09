import { Box, Package } from 'lucide-react'

import { Badge } from '../ui/badge'

import { AccessBadge } from './AccessBadge'
import { IInventory } from '@/types/inventory.types'

export function InventoryCardHeader({ inventory }: { inventory: IInventory }) {
	return (
		<div className='relative h-40 w-full'>
			{inventory.imageUrl ? (
				<img
					src={inventory.imageUrl}
					alt={`${inventory.title} cover`}
					className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
				/>
			) : (
				<div className='bg-secondary/50 flex h-full items-center justify-center'>
					<Package className='text-muted-foreground/30 size-12' />
				</div>
			)}
			<div className='from-card via-card/40 absolute inset-0 bg-linear-to-t to-transparent' />
			<div className='absolute right-4 bottom-3 left-4 flex items-center justify-between'>
				<Badge
					variant='outline'
					className='border-primary/30 bg-card/80 text-primary flex items-center gap-1 backdrop-blur-sm'
				>
					<Box className='size-3' />
					{inventory.category}
				</Badge>
				<AccessBadge isPublic={inventory.isPublic} />
			</div>
		</div>
	)
}
