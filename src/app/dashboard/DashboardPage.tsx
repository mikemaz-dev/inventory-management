'use client'

import { Loader2 } from 'lucide-react'

import { NoInventoryPage } from '@/components/NoInventory/NoInventoryPage'
import { InventoryCard } from '@/components/inventory-card/InventoryCard'
import { CreateInventoryModal } from '@/components/modals/CreateInventoryModal'
import { ThemeToggle } from '@/components/theme-toggle/ThemeToggle'

import { useInventories } from './useInventories'

export function DashboardPage() {
	const { inventories, isLoading } = useInventories()

	if (isLoading) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<Loader2
					size={40}
					className='animate-spin'
				/>
			</div>
		)
	}

	if (!inventories.length) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<NoInventoryPage />
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-4 p-6'>
			<div className='flex w-full items-center justify-between'>
				<CreateInventoryModal />
				<ThemeToggle />
			</div>
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{inventories.map(inventory => (
					<InventoryCard
						inventory={inventory}
						key={inventory.id}
					/>
				))}
			</div>
		</div>
	)
}
