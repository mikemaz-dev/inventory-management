import { Globe, Lock } from 'lucide-react'

import { Badge } from '../ui/badge'

export function AccessBadge({ isPublic }: { isPublic: boolean }) {
	return isPublic ? (
		<Badge
			variant='outline'
			className='border-primary/30 bg-primary/10 text-primary flex items-center gap-1 backdrop-blur-sm'
		>
			<Globe className='size-3' /> Public
		</Badge>
	) : (
		<Badge
			variant='outline'
			className='border-border bg-card/80 text-muted-foreground flex items-center gap-1 backdrop-blur-sm'
		>
			<Lock className='size-3' /> Private
		</Badge>
	)
}
