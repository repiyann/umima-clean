import { Head } from '@inertiajs/react'

import HeadingSmall from '@/components/atoms/heading-small'

import SettingsLayout from '@/layouts/settings/layout'

export default function Appearance() {
	return (
		<>
			<Head title="Appearance settings" />

			<SettingsLayout>
				<div className="space-y-6">
					<HeadingSmall
						title="Appearance settings"
						description="Update your account's appearance settings"
					/>
				</div>
			</SettingsLayout>
		</>
	)
}
