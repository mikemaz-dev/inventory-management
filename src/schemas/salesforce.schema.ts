import z from 'zod'

export const SalesforceSchema = z.object({
	accountName: z.string().min(1, 'Account name is required'),
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.email('Invalid email')
})

export type TSalesforceForm = z.infer<typeof SalesforceSchema>
