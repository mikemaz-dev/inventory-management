'use client'

import { useMutation } from '@tanstack/react-query'

import { axiosClassic, axiosInstance } from '@/api/axios'

export function useConnectSalesforce() {
	return useMutation({
		mutationKey: ['salesforce-connect'],
		mutationFn: async (data: ISalesforcePayload) => {
			const res = await axiosInstance.post('/integrations/salesforce/user', data)

			return res.data
		}
	})
}
