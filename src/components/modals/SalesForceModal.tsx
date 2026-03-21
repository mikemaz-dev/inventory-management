'use client'

import { Controller } from 'react-hook-form'

import { useSalesForceForm } from '@/hooks/integrations/useSalesForceForm'

import { Button } from '../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog'
import { Field, FieldError, FieldGroup } from '../ui/field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
}

export function SalesforceModal({ open, setOpen }: Props) {
	const { control, handleSubmit, onSubmit, isPending } = useSalesForceForm(() => setOpen(false))

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Button>Connect Salesforce</Button>
			</DialogTrigger>

			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader className='mb-4'>
						<DialogTitle>Connect Salesforce</DialogTitle>
						<DialogDescription>
							Fill in the details to connect your Salesforce account.
						</DialogDescription>
					</DialogHeader>

					<FieldGroup>
						<Controller
							name='accountName'
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<Label htmlFor='accountName'>Account Name</Label>
									<Input
										{...field}
										id='accountName'
										placeholder='Acme Inc.'
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>

						<Controller
							name='firstName'
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<Label htmlFor='firstName'>First Name</Label>
									<Input
										{...field}
										id='firstName'
										placeholder='John'
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>

						<Controller
							name='lastName'
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<Label htmlFor='lastName'>Last Name</Label>
									<Input
										{...field}
										id='lastName'
										placeholder='Doe'
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>

						<Controller
							name='email'
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<Label htmlFor='email'>Email</Label>
									<Input
										{...field}
										id='email'
										type='email'
										placeholder='john@example.com'
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
					</FieldGroup>

					<DialogFooter className='mt-4'>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						<Button
							type='submit'
							disabled={isPending}
						>
							{isPending ? 'Connecting...' : 'Connect'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
