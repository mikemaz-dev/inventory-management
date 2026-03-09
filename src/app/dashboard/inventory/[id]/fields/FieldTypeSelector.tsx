'use client'

import { Card } from '@/components/ui/card'

import { getFieldConfig, getFieldTypes } from '@/lib/inventory-field'
import { FIELD_TYPE } from '@/types/inventory.types'

interface IProps {
	value: FIELD_TYPE
	onChange: (type: FIELD_TYPE) => void
}

export function FieldTypeSelector({ value, onChange }: IProps) {
	const types = getFieldTypes()

	return (
		<div className='grid grid-cols-2 gap-3'>
			{types.map(type => {
				const config = getFieldConfig(type)
				const Icon = config.icon

				const active = value === type

				return (
					<Card
						key={type}
						onClick={() => onChange(type)}
						className={`cursor-pointer p-4 transition ${active ? 'border-primary' : ''} `}
					>
						<div className='flex items-start gap-3'>
							<Icon size={18} />

							<div>
								<div className='font-medium'>{config.label}</div>

								<div className='text-muted-foreground text-sm'>{config.description}</div>
							</div>
						</div>
					</Card>
				)
			})}
		</div>
	)
}
