'use client'

import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useSalesForceForm } from '@/hooks/integrations/useSalesForceForm'

import type { TSalesforceForm } from '@/schemas/salesforce.schema'

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
}

export function SalesforceModal({ open, setOpen }: Props) {
	const { control, onSubmit, isPending } = useSalesForceForm(() => setOpen(false))

	const fields: Array<{
		name: keyof TSalesforceForm
		label: string
		placeholder: string
		type?: string
	}> = [
		{ name: 'accountName', label: 'Account Name', placeholder: 'Acme Inc.' },
		{ name: 'firstName', label: 'First Name', placeholder: 'John' },
		{ name: 'lastName', label: 'Last Name', placeholder: 'Doe' },
		{ name: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email' }
	]

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogContent>
				<form onSubmit={onSubmit}>
					<DialogHeader className='mb-4'>
						<DialogTitle>Connect Salesforce</DialogTitle>
						<DialogDescription>
							Fill in the details to create Account and Contact in Salesforce.
						</DialogDescription>
					</DialogHeader>

					<FieldGroup>
						{fields.map(({ name, label, placeholder, type = 'text' }) => (
							<Controller
								key={name}
								name={name}
								control={control}
								render={({ field, fieldState }) => (
									<Field data-invalid={!!fieldState.error}>
										<Label htmlFor={name}>{label}</Label>
										<Input
											{...field}
											id={name}
											type={type}
											placeholder={placeholder}
										/>
										{fieldState.error && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>
						))}
					</FieldGroup>

					<DialogFooter className='mt-4'>
						<Button
							variant='outline'
							type='button'
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
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
