'use client'

import { useMutation } from '@tanstack/react-query'

import { axiosClassic } from '@/api/axios'

export function useConnectSalesforce() {
	return useMutation({
		mutationKey: ['salesforce-connect'],
		mutationFn: async (data: ISalesforcePayload) => {
			const res = await axiosClassic.post('/integrations/salesforce/user', data)

			return res.data
		}
	})
}
