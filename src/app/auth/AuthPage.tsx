import { AuthPageWrapper } from './AutPageWrapper'
import { AuthForm } from './form/AuthForm'

interface Props {
	isLogin: boolean
}

export function AuthPage({ isLogin }: Props) {
	return (
		<AuthPageWrapper>
			<h1 className='mb-2 text-center text-xl font-medium'>Inventory Management</h1>
			<AuthForm isLogin={isLogin} />
		</AuthPageWrapper>
	)
}
