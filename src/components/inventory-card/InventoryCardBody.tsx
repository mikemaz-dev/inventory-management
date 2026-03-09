import { MessageSquare, Package, Tag, Users } from 'lucide-react'
import { TooltipProvider } from '../ui/tooltip'
import { StatItem } from './StatItem'
import { TagBadge } from './TagBadge'
import { IInventory } from '@/types/inventory.types'

interface Props {
	inventory: IInventory
	tagCount: number
}

export function InventoryCardBody({ inventory, tagCount }: Props) {
	return (
		<>
			<div className='flex flex-col gap-1.5'>
				<h3 className='text-foreground text-base leading-tight font-semibold'>{inventory.title}</h3>
				<p className='text-muted-foreground line-clamp-2 text-sm'>
					{inventory.description || 'No description provided'}
				</p>
			</div>

			{tagCount > 0 && (
				<div className='flex flex-wrap gap-1.5'>
					{inventory.inventoryTags.slice(0, 3).map((tag, i) => (
						<TagBadge
							key={i}
							tagName={tag.tag?.name ?? 'Tag'}
						/>
					))}
					{tagCount > 3 && (
						<span className='bg-secondary text-muted-foreground inline-flex items-center rounded-md px-2 py-0.5 text-xs'>
							+{tagCount - 3}
						</span>
					)}
				</div>
			)}

			{/* Stats */}
			<TooltipProvider delayDuration={200}>
				<div className='text-muted-foreground flex items-center gap-3 text-xs'>
					<StatItem
						icon={<Package className='size-3.5' />}
						value={inventory.items?.length ?? 0}
						label='Items'
					/>
					<StatItem
						icon={<MessageSquare className='size-3.5' />}
						value={inventory.comments?.length ?? 0}
						label='Comments'
					/>
					<StatItem
						icon={<Users className='size-3.5' />}
						value={inventory.accesses?.length ?? 0}
						label='Shared with'
					/>
					{inventory.fields?.length > 0 && (
						<StatItem
							icon={<Tag className='size-3.5' />}
							value={inventory.fields.length}
							label='Custom fields'
						/>
					)}
				</div>
			</TooltipProvider>
		</>
	)
}
