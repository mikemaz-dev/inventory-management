'use client'

import { GripVertical, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { InventoryCustomIdElement } from '@/types/inventory-custom-id-element.types'

interface Props {
	element: InventoryCustomIdElement
	dragHandleProps?: any
	onChange: (value: InventoryCustomIdElement) => void
	onRemove: () => void
}

export function InventoryCustomIdElementCard({
	element,
	dragHandleProps,
	onChange,
	onRemove
}: Props) {
	return (
		<div className='bg-background flex items-center gap-2 rounded border p-2'>
			<div
				{...dragHandleProps}
				className='cursor-grab opacity-50 hover:opacity-100'
			>
				<GripVertical className='h-4 w-4' />
			</div>

			<span className='w-32 font-mono text-sm opacity-60'>{element.type}</span>

			{element.type === 'FixedText' && (
				<Input
					value={element.value}
					onChange={e => onChange({ ...element, value: e.target.value })}
				/>
			)}

			{element.type === 'DateTime' && (
				<Input
					value={element.format}
					onChange={e => onChange({ ...element, format: e.target.value })}
				/>
			)}

			<Button
				variant='ghost'
				size='icon'
				onClick={onRemove}
			>
				<Trash className='h-4 w-4' />
			</Button>
		</div>
	)
}
