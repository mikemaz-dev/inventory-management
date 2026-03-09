'use client'

import { LogIn, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { PUBLIC_PAGES } from '@/config/public.config'

import { useAuthForm } from './useAuthForm'

interface Props {
	isLogin: boolean
}

export function AuthForm({ isLogin }: Props) {
	const { handleSubmit, control, isLoading, onSubmit } = useAuthForm(isLogin)

	const router = useRouter()

	return (
		<div>
			<Card className='min-w-sm'>
				<CardHeader className='flex w-full items-center justify-center'>
					<div className='flex w-full gap-2'>
						<Button
							variant={isLogin ? 'default' : 'outline'}
							className='flex-1'
							onClick={() => router.replace(PUBLIC_PAGES.LOGIN)}
						>
							<LogIn className='mr-2 h-4 w-4' />
							Login
						</Button>
						<Button
							variant={!isLogin ? 'default' : 'outline'}
							className='flex-1'
							onClick={() => router.replace(PUBLIC_PAGES.REGISTER)}
						>
							<UserPlus className='mr-2 h-4 w-4' />
							Sign Up
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						id='auth-form'
					>
						<FieldGroup>
							{!isLogin && (
								<Controller
									name='username'
									control={control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor='username'>Username</FieldLabel>
											<Input
												{...field}
												id='username'
												aria-invalid={fieldState.invalid}
												placeholder='Johnson'
											/>
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							)}

							<Controller
								name='email'
								control={control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='email'>Email</FieldLabel>
										<Input
											{...field}
											id='email'
											type='email'
											aria-invalid={fieldState.invalid}
											placeholder='johnson@mail.com'
										/>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>

							<Controller
								name='password'
								control={control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='password'>Password</FieldLabel>
										<Input
											{...field}
											id='password'
											type='password'
											aria-invalid={fieldState.invalid}
											placeholder='123456789'
										/>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>

							<Button
								type='submit'
								className='w-full'
								disabled={isLoading}
							>
								{isLogin ? 'Login' : 'Sign up'}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter className='flex w-full items-center justify-center'>
					<span className='text-muted-foreground text-sm'>
						{isLogin ? "Don't have an account yet?" : 'Already have an account?'}
					</span>
					<Button
						variant='link'
						className='ml-1 h-auto p-0'
						onClick={() =>
							isLogin ? router.replace(PUBLIC_PAGES.REGISTER) : router.replace(PUBLIC_PAGES.LOGIN)
						}
						disabled={isLoading}
					>
						{isLogin ? 'Sign up' : 'Login'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
