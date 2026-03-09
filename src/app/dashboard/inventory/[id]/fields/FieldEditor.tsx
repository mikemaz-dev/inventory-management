'use client'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { FieldTypeSelector } from './FieldTypeSelector'
import { TCreateInventoryFieldDto } from '@/schemas/inventory-field.schema'

interface IProps {
	value: TCreateInventoryFieldDto
	onChange: (value: TCreateInventoryFieldDto) => void
}

export function FieldEditor({ value, onChange }: IProps) {
	const set = <K extends keyof TCreateInventoryFieldDto>(
		key: K,
		val: TCreateInventoryFieldDto[K]
	) => {
		onChange({ ...value, [key]: val })
	}

	return (
		<div className='space-y-4'>
			<FieldTypeSelector
				value={value.type}
				onChange={type => set('type', type)}
			/>

			<Input
				placeholder='Field title'
				value={value.title}
				onChange={e => set('title', e.target.value)}
			/>

			<Textarea
				placeholder='Field description'
				value={value.description}
				onChange={e => set('description', e.target.value)}
			/>

			<div className='flex items-center gap-3'>
				<Switch
					checked={value.showInTable}
					onCheckedChange={v => set('showInTable', v)}
				/>

				<span className='text-sm'>Show in table</span>
			</div>
		</div>
	)
}
