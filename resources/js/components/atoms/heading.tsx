import { HTMLAttributes } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
	title: string
	description?: string
}

export default function Heading({ 
	title, 
	description, 
	className, 
	...props 
}: HeadingProps) {
	return (
		<div 
			className={`text-black space-y-0.5 ${description ? 'mb-8' : 'mb-4'} ${className || ''}`} 
			{...props}
		>
			<h2 className="text-xl font-semibold tracking-tight">{title}</h2>
			{description && (
				<p className="text-muted-foreground text-sm">{description}</p>
			)}
		</div>
	)
}
