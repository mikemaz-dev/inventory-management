export interface IGenerateInventoryCustomId {
	prefixLength?: number
	sequence?: number
	date?: Date
	categories?: string[]
}

const DEFAULT_CATEGORIES = ['BOOK', 'TECH', 'OFFICE', 'CAR', 'GAME'] as const

export function generateInventoryCustomId(options?: IGenerateInventoryCustomId): string {
	const {
		prefixLength = 5,
		sequence = 1,
		date = new Date(),
		categories = DEFAULT_CATEGORIES
	} = options ?? {}

	const randomCategory = getRandomCategory(categories)
	const randomPrefix = generateRandomString(prefixLength)
	const paddedSequence = String(sequence).padStart(3, '0')
	const year = date.getFullYear()

	return `${randomCategory}-${randomPrefix}_${paddedSequence}_${year}`
}

function generateRandomString(length: number): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	let result = ''

	for (let i = 0; i < length; i++) {
		result += chars[Math.floor(Math.random() * chars.length)]
	}

	return result
}

function getRandomCategory(categories: readonly string[]): string {
	return categories[Math.floor(Math.random() * categories.length)]
}
