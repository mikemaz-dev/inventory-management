export const QueryKeys = {
	ITEMS: 'items',
	ITEM: 'item'
} as const

export const QUERY_KEYS_FIELDS = {
	inventoryFields: (inventoryId: string) => ['inventory-fields', inventoryId] as const
}
