import { IInventory, IItem } from './inventory.types'

export interface IInventoriesWithItems extends IInventory {
	items: IItem[]
}
