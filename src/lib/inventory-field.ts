import { INVENTORY_FIELD_TYPE_CONFIG } from '@/config/custom-field.config'

import { FIELD_TYPE } from '@/types/inventory.types'

export function getFieldConfig(type: FIELD_TYPE) {
	return INVENTORY_FIELD_TYPE_CONFIG[type]
}

export function getFieldTypes(): FIELD_TYPE[] {
	return Object.keys(INVENTORY_FIELD_TYPE_CONFIG) as FIELD_TYPE[]
}
