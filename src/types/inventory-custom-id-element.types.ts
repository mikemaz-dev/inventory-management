export const IdElementTypeEnum = {
	FixedText: 'FixedText',
	Random20Bit: 'Random20Bit',
	Random32Bit: 'Random32Bit',
	Random6Digit: 'Random6Digit',
	Guid: 'Guid',
	DateTime: 'DateTime',
	Sequence: 'Sequence'
} as const

export type IdElementType = (typeof IdElementTypeEnum)[keyof typeof IdElementTypeEnum]

export interface IInventoryCustomIdElementBase {
	id: string
	type: IdElementType
	padding?: number 
	value?: string
	format?: string
}

export type InventoryCustomIdElement =
	| (IInventoryCustomIdElementBase & { type: 'FixedText'; value: string })
	| (IInventoryCustomIdElementBase & { type: 'Random20Bit' })
	| (IInventoryCustomIdElementBase & { type: 'Random32Bit' })
	| (IInventoryCustomIdElementBase & { type: 'Random6Digit'; padding?: number })
	| (IInventoryCustomIdElementBase & { type: 'Guid' })
	| (IInventoryCustomIdElementBase & { type: 'DateTime'; format: string })
	| (IInventoryCustomIdElementBase & { type: 'Sequence'; padding?: number })
