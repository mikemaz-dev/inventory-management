import { axiosInstance } from '@/api/axios'

import type {
	TCreateInventoryFieldDto,
	TUpdateInventoryFieldDto
} from '@/schemas/inventory-field.schema'

export class InventoryFieldService {
	private BASE = '/inventory-fields'

	async getList(inventoryId: string) {
		const { data } = await axiosInstance.get(`${this.BASE}`, {
			params: { inventoryId }
		})
		return data
	}

	async create(dto: TCreateInventoryFieldDto) {
		const { data } = await axiosInstance.post(this.BASE, dto)
		return data
	}

	async update(id: string, dto: TUpdateInventoryFieldDto) {
		const { data } = await axiosInstance.patch(`${this.BASE}/${id}`, dto)
		return data
	}

	async delete(id: string) {
		await axiosInstance.delete(`${this.BASE}/${id}`)
	}
}

export const inventoryFieldService = new InventoryFieldService()
