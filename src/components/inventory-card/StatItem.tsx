import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function StatItem({
	icon,
	value,
	label
}: {
	icon: React.ReactNode
	value: number
	label: string
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span className='bg-secondary/60 hover:bg-secondary hover:text-foreground inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors'>
					{icon} {value}
				</span>
			</TooltipTrigger>
			<TooltipContent
				side='bottom'
				className='text-xs'
			>
				{value} {label}
			</TooltipContent>
		</Tooltip>
	)
}
