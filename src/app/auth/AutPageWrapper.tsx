import { ReactNode } from 'react'

export function AuthPageWrapper({ children }: { children: ReactNode }) {
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div>{children}</div>
		</div>
	)
}
