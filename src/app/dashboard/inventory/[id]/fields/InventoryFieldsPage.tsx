'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

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
		<div className='max-w-2xl space-y-6'>

			<FieldEditor
				value={draft}
				onChange={setDraft}
			/>

			<Button onClick={handleCreate}>Add field</Button>

			<div className='space-y-3'>
				{isLoading && <p>Loading...</p>}

				{fields.map((field: any) => (
					<div
						key={field.id}
						className='flex justify-between rounded-lg border p-3'
					>
						<div>
							<div className='font-medium'>{field.title}</div>

							<div className='text-muted-foreground text-sm'>{field.type}</div>
						</div>

						<Button
							variant='destructive'
							onClick={() => deleteField(field.id)}
						>
							Delete
						</Button>
					</div>
				))}
			</div>
		</div>
	)
}
