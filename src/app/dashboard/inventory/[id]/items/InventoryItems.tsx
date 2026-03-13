'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { useCreateItem } from './useCreateItem'
import { useDeleteItem } from './useDeleteItem'
import { useItemsList } from './useItemsList'

interface Props {
	inventoryId: string
}

export function InventoryItems({ inventoryId }: Props) {
	const router = useRouter()
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
	const [searchQuery, setSearchQuery] = useState('')

	const { data: items, isLoading } = useItemsList(inventoryId)
	const createMutation = useCreateItem(inventoryId)
	const deleteMutation = useDeleteItem(inventoryId)

	const filteredItems = items?.filter(
		item =>
			item.customId.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.createdBy.email.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedIds(new Set(filteredItems?.map(i => i.id) || []))
		} else {
			setSelectedIds(new Set())
		}
	}

	const handleSelectRow = (id: string, checked: boolean) => {
		const newSelected = new Set(selectedIds)
		if (checked) {
			newSelected.add(id)
		} else {
			newSelected.delete(id)
		}
		setSelectedIds(newSelected)
	}

	const handleDeleteSelected = async () => {
		if (!confirm(`Delete ${selectedIds.size} items?`)) return

		await Promise.all(Array.from(selectedIds).map(id => deleteMutation.mutateAsync(id)))
		setSelectedIds(new Set())
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='mt-6 space-y-4'>
			<div className='flex items-center justify-between gap-4'>
				<div className='flex flex-1 items-center gap-4'>
					<Input
						placeholder='Search items...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='max-w-sm'
					/>
					{selectedIds.size > 0 && (
						<div className='flex items-center gap-2'>
							<span className='text-sm opacity-60'>{selectedIds.size} selected</span>
							<Button
								variant='destructive'
								size='sm'
								onClick={handleDeleteSelected}
							>
								Delete
							</Button>
						</div>
					)}
				</div>

				<Button onClick={() => createMutation.mutate({ inventoryId, values: [] })}>Add item</Button>
			</div>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-12'>
								<Checkbox
									checked={
										filteredItems?.length === selectedIds.size && filteredItems?.length !== 0
									}
									onCheckedChange={handleSelectAll}
								/>
							</TableHead>
							<TableHead>Custom ID</TableHead>
							<TableHead>Created By</TableHead>
							<TableHead>Created At</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredItems?.map(item => (
							<TableRow
								key={item.id}
								className='hover:bg-muted/50 cursor-pointer'
								onClick={e => {
									if ((e.target as HTMLElement).closest('td:first-child')) return
									router.push(`/inventories/${inventoryId}/items/${item.id}`)
								}}
							>
								<TableCell onClick={e => e.stopPropagation()}>
									<Checkbox
										checked={selectedIds.has(item.id)}
										onCheckedChange={checked => handleSelectRow(item.id, checked as boolean)}
									/>
								</TableCell>
								<TableCell className='font-medium'>{item.customId}</TableCell>
								<TableCell className='opacity-60'>{item.createdBy.email}</TableCell>
								<TableCell className='opacity-60'>
									{new Date(item.createdAt).toLocaleDateString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{filteredItems?.length === 0 && (
				<div className='py-10 text-center opacity-60'>No items found</div>
			)}
		</div>
	)
}
