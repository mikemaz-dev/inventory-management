'use client'

import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { axiosInstance } from '@/api/axios'

import { generateInventoryCustomId } from '@/lib/generate-inventory-custom-id'
import { InventoryCustomIdElement } from '@/types/inventory-custom-id-element.types'

export function useCustomId(inventoryId: string) {
	const [elements, setElements] = useState<InventoryCustomIdElement[]>([])
	const [exampleId, setExampleId] = useState('')
	const [isSaving, setIsSaving] = useState(false)

	const fetchElements = useCallback(async () => {
		const data = await axiosInstance.get(`inventories/custom-id/${inventoryId}`)
		setElements(data.data)
	}, [inventoryId])

	useEffect(() => {
		fetchElements()
	}, [fetchElements])

	const saveElements = useCallback(
		debounce(async (newElements: InventoryCustomIdElement[]) => {
			setIsSaving(true)
			await axiosInstance.patch(`/inventories/custom-id/${inventoryId}`, {
				elements: newElements
			})
			setIsSaving(false)
		}, 500),
		[inventoryId]
	)

	const updateElements = (newElements: InventoryCustomIdElement[]) => {
		setElements(newElements)
		saveElements(newElements)
	}

	const updateElement = (index: number, element: InventoryCustomIdElement) => {
		const updated = [...elements]
		updated[index] = element
		updateElements(updated)
	}

	const addElement = (type: InventoryCustomIdElement['type']) => {
		updateElements([
			...elements,
			{
				id: crypto.randomUUID(),
				type,
				value: '',
				format: '',
				padding: 6
			}
		])
	}

	const removeElement = (id: string) => {
		updateElements(elements.filter(e => e.id !== id))
	}

	const moveElement = (fromIndex: number, toIndex: number) => {
		const updated = [...elements]
		const [moved] = updated.splice(fromIndex, 1)
		updated.splice(toIndex, 0, moved)
		updateElements(updated)
	}

	useEffect(() => {
		setExampleId(
			generateInventoryCustomId({
				sequence: 13
			})
		)
	}, [elements, inventoryId])

	return {
		elements,
		addElement,
		updateElement,
		removeElement,
		moveElement,
		exampleId,
		isSaving
	}
}
