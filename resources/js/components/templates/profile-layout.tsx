import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useInitials } from '@/hooks/use-initials'
import { type SharedData } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { History, Package, User } from 'lucide-react'

type TabValue = 'profile' | 'tracking' | 'history'

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { url } = usePage()
	const { auth } = usePage<SharedData>().props

	const getInitials = useInitials()

	function handleTabChange(value: string) {
		const routes: Record<TabValue, string> = {
			profile: '/profile/settings',
			tracking: '/profile/track-order',
			history: '/profile/order-history',
		}
		router.visit(routes[value as TabValue])
	}

	function getCurrentTab(): TabValue {
		if (url.includes('/settings')) return 'profile'
		if (url.includes('/track-order')) return 'tracking'
		if (url.includes('/order-history')) return 'history'
		return 'profile'
	}

	return (
		<>
			<div className="border-b bg-white">
				<div className="px-4 py-6">
					{/* Header */}
					<div className="flex items-center space-x-4">
						<Avatar className="h-16 w-16">
							<AvatarImage src="/placeholder.svg?height=64&width=64" />
							<AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
						</Avatar>
						<h1 className="text-xl font-semibold text-black">
							{auth.user.name}
						</h1>
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<Tabs
				value={getCurrentTab()}
				onValueChange={handleTabChange}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-3 border-b bg-white">
					<TabsTrigger value="profile" className="flex items-center gap-2">
						<User className="h-4 w-4" />
						Profil
					</TabsTrigger>
					<TabsTrigger value="tracking" className="flex items-center gap-2">
						<Package className="h-4 w-4" />
						Pesanan
					</TabsTrigger>
					<TabsTrigger value="history" className="flex items-center gap-2">
						<History className="h-4 w-4" />
						Riwayat
					</TabsTrigger>
				</TabsList>

				{/* Tab Content */}
				<TabsContent value={getCurrentTab()} className="space-y-4 p-4">
					{children}
				</TabsContent>
			</Tabs>
		</>
	)
}
