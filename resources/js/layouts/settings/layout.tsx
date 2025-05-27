import Heading from '@/components/atoms/heading'
import { type PropsWithChildren } from 'react'

export default function SettingsLayout({ children }: PropsWithChildren) {
	// When server-side rendering, we only render the layout on the client...
	if (typeof window === 'undefined') {
		return null
	}

	return (
		<div className="px-4 py-6">
			<Heading
				title="Settings"
				description="Manage your profile and account settings"
			/>

			<div className="flex flex-col space-y-8">
				<div className="flex-1">
					<section className="max-w-xl space-y-12">{children}</section>
				</div>
			</div>
		</div>
	)
}
