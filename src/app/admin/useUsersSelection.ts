'use client'

import { useState } from 'react'

export function useUsersSelection() {
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

	const selectAll = (ids: string[]) => {
		setSelectedIds(new Set(ids))
	}

	const clear = () => {
		setSelectedIds(new Set())
	}

	const toggle = (id: string, checked: boolean) => {
		setSelectedIds(prev => {
			const next = new Set(prev)

			if (checked) next.add(id)
			else next.delete(id)

			return next
		})
	}

	return {
		selectedIds,
		selectAll,
		clear,
		toggle
	}
}
