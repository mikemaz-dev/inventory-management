import { IUser } from './user.types'

export interface IInventory {
	id: string
	title: string
	description?: string
	category: string
	imageUrl: string
	isPublic: boolean

	ownerId: string
	owner: IUser

	createdAt: string
	updatedAt: string

	accesses: IInventoryAccess[]
	fields: IInventoryField[]
	customIdFormat?: ICustomIdFormat
	items: IItem[]
	comments: IComment[]
	inventoryTags: IInventoryTag[]
}

export interface ICreateInventoryDto {
	title: string
	description?: string
	category: string
	imageUrl?: string
	isPublic: boolean
}

export interface IInventoryAccess {
	id: string
	inventoryId: string
	userId: string
	createdAt: string
	updatedAt: string

	inventory: IInventory
	user: IUser
}

export interface IInventoryField {
	id: string
	inventoryId: string
	type: FIELD_TYPE
	title: string
	description: string
	showInTable: boolean
	order: number

	createdAt: string
	updatedAt: string

	inventory: IInventory
	itemFieldValues: IItemFieldValue[]
}

export interface IItemFieldValue {
	id: string
	itemId: string
	fieldId: string

	valueString?: string
	valueNumber?: number
	valueBoolean?: boolean

	createdAt: string
	updatedAt: string

	item: IItem
	field: IInventoryField
}

export interface IItem {
	id: string
	inventoryId: string
	customId: string
	createdById: string
	createdBy: IUser

	createdAt: string
	updatedAt: string

	inventory: IInventory
	itemFieldValues: IItemFieldValue[]
}

export interface ICustomIdFormat {
	id: string
	inventoryId: string

	elements: Record<string, string | number> | unknown

	createdAt: string
	updatedAt: string

	inventory: IInventory
}

export interface IInventoryTag {
	id: string
	inventoryId: string
	tagId: string

	createdAt: string
	updatedAt: string

	inventory: IInventory
	tag: ITag
}

export interface ITag {
	id: string
	name: string

	inventories: IInventory[]
}

export interface IComment {
	id: string
	inventoryId: string
	userId: string
	content: string

	createdAt: string
	updatedAt: string

	inventory: IInventory
	user: IUser
}

export enum FIELD_TYPE {
	SINGLE_LINE = 'SINGLE_LINE',
	MULTI_LINE = 'MULTI_LINE',
	NUMBER = 'NUMBER',
	LINK = 'LINK',
	BOOLEAN = 'BOOLEAN'
}
