import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { InventoryPage } from './InventoryPage'
	
export const metadata: Metadata = {
	title: 'Inventory',
	...NO_INDEX_PAGE
}

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
	const { id } = await params

	return <InventoryPage inventoryId={id} />
}
