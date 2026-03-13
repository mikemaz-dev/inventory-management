'use client'

import { useState } from 'react'

import { exportAllInventories } from '@/lib/export-all-inventories'
import { inventoryService } from '@/services/inventory.service'

export function useExportAllInventories() {
	const [loading, setLoading] = useState(false)

	const exportAll = async () => {
		setLoading(true)
		try {
			const inventories = await inventoryService.getAllWithItems()
			exportAllInventories(inventories)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return { exportAll, loading }
}
