import z from 'zod'

export const InventoryCategoryEnum = {
	Books: 'Books',
	Electronics: 'Electronics',
	Furniture: 'Furniture',
	Other: 'Other'
} as const

export const createInventorySchema = z.object({
	title: z.string().min(1, 'Name is required'),
	description: z.string().max(100).optional(),
	category: z.enum(InventoryCategoryEnum),
	imageUrl: z.url('Must be a valid URL').optional(),
	isPublic: z.boolean()
})

export type TCreateInventoryForm = z.infer<typeof createInventorySchema>
