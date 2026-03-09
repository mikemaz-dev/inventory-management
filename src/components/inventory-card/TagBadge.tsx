import { Tag } from 'lucide-react'

export function TagBadge({ tagName }: { tagName: string }) {
	return (
		<span className='bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs'>
			<Tag className='size-2.5' /> {tagName}
		</span>
	)
}
