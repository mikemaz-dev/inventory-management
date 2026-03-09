import { axiosInstance } from '@/api/axios'

import { ICreateItemDto, IItem, IUpdateItemDto } from '@/types/item.types'

class ItemService {
	private BASE = 'items'

	async getList(inventoryId: string) {
		const { data } = await axiosInstance.get<IItem[]>(this.BASE, {
			params: { inventoryId }
		})
		return data
	}

	async create(dto: ICreateItemDto) {
		const { data } = await axiosInstance.post<IItem>('items', dto)
		return data
	}

	async update(itemId: string, dto: IUpdateItemDto) {
		const { data } = await axiosInstance.patch<IItem>(`${this.BASE}/${itemId}`, dto)
		return data
	}

	async delete(itemId: string) {
		await axiosInstance.delete(`${this.BASE}/${itemId}`)
	}
}

export const itemService = new ItemService()
