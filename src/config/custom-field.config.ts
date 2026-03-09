import { AlignLeft, Check, Hash, Link, Text } from 'lucide-react'

import { FIELD_TYPE } from '@/types/inventory.types'

export interface IInventoryFieldTypeConfig {
	type: FIELD_TYPE
	label: string
	description: string
	icon: React.ElementType
}

export const INVENTORY_FIELD_TYPE_CONFIG: Record<FIELD_TYPE, IInventoryFieldTypeConfig> = {
	SINGLE_LINE: {
		type: FIELD_TYPE.SINGLE_LINE,
		label: 'Single line text',
		description: 'Short text like title or name',
		icon: Text
	},

	MULTI_LINE: {
		type: FIELD_TYPE.MULTI_LINE,
		label: 'Multi line text',
		description: 'Long formatted description',
		icon: AlignLeft
	},

	NUMBER: {
		type: FIELD_TYPE.NUMBER,
		label: 'Number',
		description: 'Numeric values like price or quantity',
		icon: Hash
	},

	LINK: {
		type: FIELD_TYPE.LINK,
		label: 'Link',
		description: 'URL to external resource',
		icon: Link
	},

	BOOLEAN: {
		type: FIELD_TYPE.BOOLEAN,
		label: 'Boolean',
		description: 'True / False value',
		icon: Check
	}
}
