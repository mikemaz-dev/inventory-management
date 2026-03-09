'use client'

import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useExportAllInventories } from '@/hooks/useExportIAllnventories'

import { InventoryCustomId } from './custom-id/InventoryCustomId'
import InventoryFieldsPage from './fields/InventoryFieldsPage'
import { InventoryItems } from './items/InventoryItems'
import { useGetInventoryById } from './useGetInventoryById'
import { generateInventoryCustomId } from '@/lib/generate-inventory-custom-id'

export function InventoryPage({ inventoryId }: { inventoryId: string }) {
	const { inventory } = useGetInventoryById({ inventoryId })
	const { exportAll, loading } = useExportAllInventories()

	return (
		<div className='grid grid-rows-1 gap-10 p-10'>
			<div className='flex gap-2'>
				<h1 className='text-5xl font-semibold tracking-tight text-balance'>{inventory?.title}</h1>
				<Badge>All changes saved</Badge>
			</div>
			<Tabs
				defaultValue='custom-id'
				className='w-200'
			>
				<TabsList>
					<TabsTrigger
						value='items'
						className='text-base'
					>
						Items
					</TabsTrigger>
					<TabsTrigger
						value='chat'
						className='text-base'
					>
						Chat
					</TabsTrigger>
					<TabsTrigger
						value='settings'
						className='text-base'
					>
						Settings
					</TabsTrigger>
					<TabsTrigger
						value='custom-id'
						className='text-base'
					>
						Custom ID
					</TabsTrigger>
					<TabsTrigger
						value='fields'
						className='text-base'
					>
						Fields
					</TabsTrigger>
					<TabsTrigger
						value='access'
						className='text-base'
					>
						Access
					</TabsTrigger>
					<TabsTrigger
						value='stats'
						className='text-base'
					>
						Stats
					</TabsTrigger>
					<TabsTrigger
						value='export'
						className='text-base'
					>
						Export
					</TabsTrigger>
				</TabsList>
				<TabsContent value='items'>
					<InventoryItems inventoryId={inventoryId} />
				</TabsContent>

				<TabsContent value='fields'>
					<InventoryFieldsPage />
				</TabsContent>

				<TabsContent value='custom-id'>
					<p className='mt-4 opacity-60'>
						You can set items with inventory numbers in your preferred format.
						<br />
						To create a format. add new elements, edit them, drag to reorder, or drag elements out
						of the form to delete them.
					</p>
					<div className='mt-7 flex items-center gap-1.5'>
						<span className='text-2xl opacity-60'>Example: </span>
						<Image
							src='/images/books.png'
							alt='Books'
							width={30}
							height={30}
						/>
						<span className='text-2xl font-semibold'>
							{generateInventoryCustomId({ sequence: 13 })}
						</span>
					</div>
					<InventoryCustomId inventoryId={inventoryId} />
				</TabsContent>

				<TabsContent value='export'>
					<Button
						onClick={exportAll}
						disabled={loading}
					>
						{loading ? 'Exporting...' : 'Export to Excel'}
					</Button>
				</TabsContent>
			</Tabs>
		</div>
	)
}
