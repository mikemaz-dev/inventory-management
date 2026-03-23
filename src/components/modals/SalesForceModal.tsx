'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { axiosInstance } from '@/api/axios'

interface ISalesforcePayload {
	accountName: string
	firstName: string
	lastName: string
	email: string
}

export function useSalesForceForm(onSuccess: () => void) {
	const [isPending, setIsPending] = useState(false)

	const connectMutation = useMutation({
		mutationKey: ['salesforce-connect'],
		mutationFn: async (data: ISalesforcePayload) => {
			const res = await axiosInstance.post('/integrations/salesforce/user', data)
			return res.data
		},
		onSuccess: () => {
			setIsPending(false)
			onSuccess()
		},
		onError: () => setIsPending(false)
	})

	const onSubmit = async (data: ISalesforcePayload) => {
		setIsPending(true)

		try {
			const authRes = await axiosInstance.get<{ url: string }>('/integrations/salesforce/auth')
			const authWindow = window.open(authRes.data.url, '_blank', 'width=600,height=800')

			if (!authWindow) throw new Error('Unable to open Salesforce auth window')

			const interval = setInterval(() => {
				if (authWindow.closed) {
					clearInterval(interval)
					connectMutation.mutate(data)
				}
			}, 500)
		} catch (err) {
			console.error('Salesforce connect error:', err)
			setIsPending(false)
		}
	}

	return {
		onSubmit,
		isPending,
		handleSubmit: (fn: any) => (e: any) => {
			e.preventDefault()
			fn(e)
		}
	}
}
