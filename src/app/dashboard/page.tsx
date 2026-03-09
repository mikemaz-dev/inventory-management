import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { DashboardPage } from './DashboardPage'

export const metadata: Metadata = {
	title: 'Dashboard page',
	...NO_INDEX_PAGE
}

export default function page() {
	return <DashboardPage />
}
