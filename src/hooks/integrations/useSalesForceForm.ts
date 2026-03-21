import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useConnectSalesforce } from './useConnectSalesforce'
import { SalesforceSchema, TSalesforceForm } from '@/schemas/salesforce.schema'

export function useSalesForceForm(onClose: () => void) {
	const { mutate, isPending } = useConnectSalesforce()

	const form = useForm<TSalesforceForm>({
		resolver: zodResolver(SalesforceSchema),
		defaultValues: {
			accountName: '',
			firstName: '',
			lastName: '',
			email: ''
		}
	})

	const onSubmit = (data: TSalesforceForm) => {
		mutate(data, {
			onSuccess: () => {
				onClose()
				toast.success('Salesforce connection created successfully')
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					toast.error(error.response?.data?.message ?? 'Salesforce connection error')
				}
			}
		})
	}

	return {
		...form,
		onSubmit,
		isPending
	}
}
