import { IInventory, IItem } from './inventory.types'

export interface IInventoriesWithItems {
	inventories: IInventory[]
	items: IItem[]
}
