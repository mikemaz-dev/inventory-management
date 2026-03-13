'use client'

import { Loader2 } from 'lucide-react'

import { NoInventoryPage } from '@/components/NoInventory/NoInventoryPage'
import { InventoryCard } from '@/components/inventory-card/InventoryCard'
import { CreateInventoryModal } from '@/components/modals/CreateInventoryModal'
import { ThemeToggle } from '@/components/theme-toggle/ThemeToggle'
import { LogoutButton } from '@/components/ui/logout-button'

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
			<div className='flex min-h-screen flex-col'>
				<header className='flex justify-end p-6'>
					<LogoutButton />
				</header>

				<main className='flex flex-1 items-center justify-center'>
					<NoInventoryPage />
				</main>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-4 p-6'>
			<div className='flex w-full items-center justify-between'>
				<CreateInventoryModal />

				<div className='flex items-center gap-3'>
					<ThemeToggle />
					<LogoutButton />
				</div>
			</div>

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{inventories.map(inventory => (
					<InventoryCard
						key={inventory.id}
						inventory={inventory}
					/>
				))}
			</div>
		</div>
	)
}
