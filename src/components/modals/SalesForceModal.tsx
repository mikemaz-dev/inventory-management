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
	DialogTitle
} from '../ui/dialog'
import { Field, FieldError, FieldGroup } from '../ui/field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
}

export function SalesforceModal({ open, setOpen }: Props) {
	const { handleSubmit, onSubmit, isPending } = useSalesForceForm(() => setOpen(false))

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogContent>
				<form onSubmit={handleSubmit(() => onSubmit())}>
					<DialogHeader className='mb-4'>
						<DialogTitle>Connect Salesforce</DialogTitle>
						<DialogDescription>
							Fill in the details to connect your Salesforce account.
						</DialogDescription>
					</DialogHeader>

					<FieldGroup>
						{['accountName', 'firstName', 'lastName', 'email'].map(field => (
							<Controller
								key={field}
								name={field}
								render={({ field: f, fieldState }) => (
									<Field data-invalid={fieldState?.invalid}>
										<Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
										<Input
											{...f}
											id={field}
											placeholder={field === 'email' ? 'john@example.com' : 'John'}
										/>
										{fieldState?.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>
						))}
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
