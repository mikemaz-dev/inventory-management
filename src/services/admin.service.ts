import { axiosInstance } from '@/api/axios'

import { IUser, RoleEnum } from '@/types/user.types'

export class AdminService {
	private BASE = '/users'

	async getUsers(): Promise<IUser[]> {
		const { data } = await axiosInstance.get(this.BASE)
		return data
	}

	async blockUser(id: string, isBlocked: boolean) {
		const { data } = await axiosInstance.patch(`${this.BASE}/${id}/block`, { isBlocked })

		return data
	}

	async changeRole(id: string, role: RoleEnum) {
		const { data } = await axiosInstance.patch(`${this.BASE}/${id}/role`, { role })

		return data
	}

	async deleteUser(id: string) {
		const { data } = await axiosInstance.delete(`${this.BASE}/${id}`)
		return data
	}
}

export const adminService = new AdminService()