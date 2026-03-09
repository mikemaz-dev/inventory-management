export interface IItemFieldValue {
	fieldId: string
	value: string
}

export interface IItem {
	id: string
	inventoryId: string
	customId: string
	createdAt: string

	createdBy: {
		id: string
		email: string
	}

	itemFieldValues: {
		field: {
			id: string
			title: string
			type: string
			order: number
		}
		value: string
	}[]
}

export interface ICreateItemDto {
	inventoryId: string
	values: IItemFieldValue[]
}

export interface IUpdateItemDto {
	values: IItemFieldValue[]
}
