'use client'

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

import { Button } from '@/components/ui/button'

import { InventoryCustomIdElementCard } from './InventoryCustomIdElementCard'
import { useCustomId } from './useCustomId'

export function InventoryCustomId({ inventoryId }: { inventoryId: string }) {
	const { elements, addElement, updateElement, removeElement, moveElement, exampleId, isSaving } =
		useCustomId(inventoryId)

	const onDragEnd = (result: any) => {
		if (!result.destination) return
		moveElement(result.source.index, result.destination.index)
	}

	return (
		<div className='flex flex-col gap-4 my-4'>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='customIdElements'>
					{provided => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className='flex flex-col gap-2'
						>
							{elements.map((el, index) => (
								<Draggable
									key={el.id}
									draggableId={el.id}
									index={index}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
										>
											<InventoryCustomIdElementCard
												element={el}
												dragHandleProps={provided.dragHandleProps}
												onChange={val => updateElement(index, val)}
												onRemove={() => removeElement(el.id)}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>

			<div className='mt-2 flex gap-2'>
				<Button onClick={() => addElement('FixedText')}>+ Add FixedText</Button>
				<Button onClick={() => addElement('Random6Digit')}>+ Add 6-digit</Button>
				<Button onClick={() => addElement('DateTime')}>+ Add DateTime</Button>
			</div>
		</div>
	)
}
