'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { PUBLIC_PAGES } from '@/config/public.config'

import { TLoginForm, TRegisterForm, loginSchema, registerSchema } from '@/schemas/auth.schema'
import { authService } from '@/services/auth.service'
import { IFormData } from '@/types/auth.types'

type TFormValues = TLoginForm | TRegisterForm

export function useAuthForm(isLogin: boolean) {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const schema = isLogin ? loginSchema : registerSchema

	const {
		handleSubmit,
		reset,
		control,
		formState: { isSubmitting }
	} = useForm<TFormValues>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IFormData) => authService.auth('login', data),
		onSuccess() {
			startTransition(() => {
				reset()
				router.push(PUBLIC_PAGES.DASHBOARD)
				toast.success('Login is successful')
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message ?? 'Login error')
			}
		}
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: TFormValues) => authService.auth('register', data),
		onSuccess() {
			startTransition(() => {
				reset()
				router.push(PUBLIC_PAGES.DASHBOARD)
				toast.success('Register is successful')
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message ?? 'Register error')
			}
		}
	})

	const onSubmit: SubmitHandler<TFormValues> = data => {
		if (isLogin) {
			mutateLogin(data)
			return
		}

		mutateRegister(data)
	}

	const isLoading = isSubmitting || isPending || isLoginPending || isRegisterPending

	return {
		handleSubmit,
		onSubmit,
		control,
		isLoading
	}
}
