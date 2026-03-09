import { z } from 'zod'

export const loginSchema = z.object({
	email: z.email('Invalid email format'),
	password: z.string().min(1, 'Password is required')
})

export const registerSchema = z.object({
	username: z.string().min(1, 'Username is required'),
	email: z.email('Invalid email format'),
	password: z.string().min(6, 'Password must be at least 6 characters')
})

export type TLoginForm = z.infer<typeof loginSchema>
export type TRegisterForm = z.infer<typeof registerSchema>
