import z from 'zod'

import { FIELD_TYPE } from '@/types/inventory.types'

export const createInventoryFieldSchema = z.object({
	inventoryId: z.uuid(),
	type: z.enum(FIELD_TYPE),
	title: z.string().min(1).max(100),
	description: z.string(),
	showInTable: z.boolean(),
	order: z.number()
})

export const updateInventoryFieldSchema = z
	.object({
		type: z.enum(FIELD_TYPE),
		title: z.string().min(1).max(100),
		description: z.string(),
		showInTable: z.boolean(),
		order: z.number()
	})
	.optional()

export type TCreateInventoryFieldDto = z.infer<typeof createInventoryFieldSchema>
export type TUpdateInventoryFieldDto = z.infer<typeof updateInventoryFieldSchema>
