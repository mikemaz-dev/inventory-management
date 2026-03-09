import { axiosInstance } from '@/api/axios'

import { ICreateInventoryDto, IInventory } from '@/types/inventory.types'

class InventoryService {
	private BASE = '/inventories'

	async getAllWithItems() {
		const { data } = await axiosInstance.get<any[]>(`${this.BASE}/all-with-items`)
		return data
	}

	async getList() {
		try {
			const { data } = await axiosInstance.get(`${this.BASE}`)

			return data as IInventory[]
		} catch (error) {
			throw error
		}
	}

	async getById(id: string) {
		try {
			const { data } = await axiosInstance.get(`${this.BASE}/${id}`)

			return data
		} catch (error) {
			throw error
		}
	}

	async create(dto: ICreateInventoryDto) {
		try {
			const { data } = await axiosInstance.post(`${this.BASE}`, dto)

			return data
		} catch (error) {
			throw error
		}
	}

	async update(id: string, dto: Partial<ICreateInventoryDto>) {
		try {
			const { data } = await axiosInstance.patch(`${this.BASE}/${id}`, dto)
			return data
		} catch (error) {
			throw error
		}
	}

	async delete(id: string) {
		try {
			await axiosInstance.delete(`${this.BASE}/${id}`)
		} catch (error) {
			throw error
		}
	}
}

export const inventoryService = new InventoryService()
