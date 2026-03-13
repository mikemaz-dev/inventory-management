'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { FieldEditor } from './FieldEditor'
import { useInventoryFields } from './useInventoryFields'
import { type TCreateInventoryFieldDto } from '@/schemas/inventory-field.schema'
import { FIELD_TYPE } from '@/types/inventory.types'

const DEFAULT_FIELD: TCreateInventoryFieldDto = {
	inventoryId: '',
	type: FIELD_TYPE.SINGLE_LINE,
	title: '',
	description: '',
	showInTable: false,
	order: 1
}

export default function InventoryFieldsPage() {
	const params = useParams()
	const inventoryId = params.id as string

	const { fields, createField, deleteField, isLoading } = useInventoryFields(inventoryId)

	const [draft, setDraft] = useState<TCreateInventoryFieldDto>({
		...DEFAULT_FIELD,
		inventoryId
	})

	const handleCreate = async () => {
		await createField(draft)

		setDraft({
			...DEFAULT_FIELD,
			inventoryId
		})
	}

	return (
		<div className='mt-6 max-w-2xl space-y-6'>
			<div className='space-y-1'>
				<h2 className='text-2xl font-semibold'>Fields</h2>

				<p className='max-w-md text-sm opacity-60'>
					Fields define the structure of items in this inventory. Each item can store values based
					on the fields you create here. For example: author, price, condition, or publication year.
				</p>
			</div>

			<Card className='space-y-4 p-5'>
				<FieldEditor
					value={draft}
					onChange={setDraft}
				/>

				<Button onClick={handleCreate}>Add field</Button>
			</Card>

			<div className='space-y-3'>
				{isLoading && <p>Loading...</p>}

				{!isLoading && fields.length === 0 && (
					<Card className='p-6 text-center opacity-70'>
						No fields created yet. Add your first field to define item data.
					</Card>
				)}

				{fields.map((field: any) => (
					<Card
						key={field.id}
						className='flex items-center justify-between p-4'
					>
						<div>
							<div className='font-medium'>{field.title}</div>

							<div className='text-sm opacity-60'>Type: {field.type}</div>
						</div>

						<Button
							variant='destructive'
							onClick={() => deleteField(field.id)}
						>
							Delete
						</Button>
					</Card>
				))}
			</div>
		</div>
	)
}
