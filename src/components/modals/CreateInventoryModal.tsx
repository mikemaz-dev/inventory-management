'use client'

import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { useCreateInventory } from '../NoInventory/useCreateInventory'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { Textarea } from '../ui/textarea'

import { InventoryCategoryEnum } from '@/schemas/inventory.schema'

export function CreateInventoryModal() {
	const [open, setOpen] = useState(false)

	const { handleSubmit, control, onSubmit, isLoading } = useCreateInventory()

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Button className='w-max'>Create Inventory</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader className='mb-4'>
						<DialogTitle>Create Inventory</DialogTitle>
						<DialogDescription>Start with creating your first inventory.</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<Controller
							name='title'
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<Label htmlFor='title'>Name</Label>
									<Input
										{...field}
										id='title'
										placeholder='Laptops of the development department'
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
						<Controller
							name='description'
							control={control}
							render={({ field, fieldState }) => (
								<Field>
									<Label htmlFor='description'>Description</Label>
									<Textarea
										{...field}
										id='description'
										placeholder='Brief description of the inventory (up to 100 characters)'
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
						<Controller
							name='category'
							control={control}
							render={({ field, fieldState }) => (
								<Field>
									<Label htmlFor='category'>Category</Label>
									<Select
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger id='category'>
											<SelectValue placeholder='Select category' />
										</SelectTrigger>

										<SelectContent>
											{Object.values(InventoryCategoryEnum).map(category => (
												<SelectItem
													key={category}
													value={category}
												>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
						<Controller
							name='imageUrl'
							control={control}
							render={({ field, fieldState }) => (
								<Field>
									<Label htmlFor='imageUrl'>Image URL</Label>
									<Input
										{...field}
										id='imageUrl'
										placeholder='https://example.com/image.jpg'
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
					</FieldGroup>

					<Controller
						name='isPublic'
						control={control}
						render={({ field }) => (
							<Field className='flex flex-row items-center justify-between rounded-lg border p-4 mt-4'>
								<div className='space-y-1'>
									<Label htmlFor='isPublic'>Public inventory</Label>
									<p className='text-muted-foreground text-sm'>
										Anyone with the link can view this inventory
									</p>
								</div>

								<Switch
									id='isPublic'
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</Field>
						)}
					/>
					<DialogFooter className='mt-4'>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>

						<Button
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? 'Creating...' : 'Create'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
