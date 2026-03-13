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
		<div className='mt-6 space-y-6'>
			<div className='flex items-start justify-between'>
				<div className='space-y-1'>
					<h2 className='text-2xl font-semibold'>Items</h2>
					<p className='max-w-md text-sm opacity-60'>
						Items represent individual objects stored in this inventory. Each item receives a unique
						custom ID based on the format defined in the{' '}
						<span className='font-medium'>Custom ID</span> tab.
					</p>
				</div>

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
			</div>

			<div className='space-y-3'>
				{items?.map(item => (
					<Card
						key={item.id}
						className='flex items-center justify-between p-4'
					>
						<div>
							<div className='font-semibold'>{item.customId}</div>
							<div className='text-sm opacity-60'>Created by {item.createdBy.email}</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}
