'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { axiosInstance } from '@/api/axios'

import { SalesforceSchema, type TSalesforceForm } from '@/schemas/salesforce.schema'

export function useSalesForceForm(onSuccess: () => void) {
	const form = useForm<TSalesforceForm>({
		resolver: zodResolver(SalesforceSchema),
		defaultValues: {
			accountName: '',
			firstName: '',
			lastName: '',
			email: ''
		}
	})

	const mutation = useMutation({
		mutationKey: ['salesforce-connect'],
		mutationFn: async (data: TSalesforceForm) => {
			const res = await axiosInstance.post('/integrations/salesforce/user', data)
			return res.data
		},
		onSuccess: () => {
			form.reset()
			onSuccess()
		}
	})

	const onSubmit = form.handleSubmit(data => {
		mutation.mutate(data)
	})

	return {
		...form,
		onSubmit,
		isPending: mutation.isPending,
		error: mutation.error
	}
}
