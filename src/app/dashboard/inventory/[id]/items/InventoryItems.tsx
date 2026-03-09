'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useCreateItem } from './useCreateItem'
import { useItemsList } from './useItemsList'

interface Props {
	inventoryId: string
}

export function InventoryItems({ inventoryId }: Props) {
	const { data: items, isLoading } = useItemsList(inventoryId)

	const createMutation = useCreateItem(inventoryId)

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='mt-6 space-y-4'>
			<Button
				onClick={() =>
					createMutation.mutate({
						inventoryId,
						values: []
					})
				}
			>
				Add item
			</Button>

			<div className='space-y-3'>
				{items?.map(item => (
					<Card
						key={item.id}
						className='flex justify-between p-4'
					>
						<div>
							<div className='font-semibold'>{item.customId}</div>

							<div className='text-sm opacity-60'>{item.createdBy.email}</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}
