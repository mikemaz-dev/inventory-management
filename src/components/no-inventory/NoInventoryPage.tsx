import { Box } from 'lucide-react'

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from '../ui/empty'

import { CreateInventoryModal } from '../modals/CreateInventoryModal'

export function NoInventoryPage() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<Box />
				</EmptyMedia>
				<EmptyTitle>No Inventories Yet</EmptyTitle>
				<EmptyDescription>
					You haven&apos;t created any inventories yet. Get started by creating your first
					inventory.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<CreateInventoryModal />
			</EmptyContent>
		</Empty>
	)
}
