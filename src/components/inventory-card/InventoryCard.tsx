import Link from 'next/link'

import { PUBLIC_PAGES } from '@/config/public.config'

import { Card, CardContent, CardHeader } from '../ui/card'

import { InventoryCardBody } from './InventoryCardBody'
import { InventoryCardFooter } from './InventoryCardFooter'
import { InventoryCardHeader } from './InventoryCardHeader'
import { IInventory } from '@/types/inventory.types'

interface Props {
	inventory: IInventory
}

export function InventoryCard({ inventory }: Props) {
	return (
		<Link href={PUBLIC_PAGES.INVENTORY_PAGE + `${inventory.id}`}>
			<Card className='group relative overflow-hidden transition-shadow hover:shadow-lg py-0'>
				<CardHeader className='p-0'>
					<InventoryCardHeader inventory={inventory} />
				</CardHeader>
				<CardContent className='flex flex-col gap-4 p-3.5'>
					<InventoryCardBody
						inventory={inventory}
						tagCount={inventory.inventoryTags?.length ?? 0}
					/>
					<div className='flex-1' />
					<InventoryCardFooter inventory={inventory} />
				</CardContent>
			</Card>
		</Link>
	)
}
