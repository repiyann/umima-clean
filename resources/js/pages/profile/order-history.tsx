import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Edit3, Star } from 'lucide-react'
import ProfileLayout from '../../components/templates/profile-layout'

export default function OrderHistoryPage() {
	const orderHistory = [
		{
			id: 'LD098',
			date: '2024-01-10',
			items: ['3x Shirts', '2x Pants'],
			total: 22.5,
			status: 'completed',
			rating: 5,
		},
		{
			id: 'LD097',
			date: '2024-01-05',
			items: ['1x Suit', '2x Ties'],
			total: 35.0,
			status: 'completed',
			rating: 4,
		},
		{
			id: 'LD096',
			date: '2023-12-28',
			items: ['4x Shirts', '1x Jacket'],
			total: 28.75,
			status: 'completed',
			rating: 5,
		},
		{
			id: 'LD095',
			date: '2023-12-20',
			items: ['2x Dresses', '3x Blouses'],
			total: 31.25,
			status: 'completed',
			rating: 4,
		},
	]

	function getStatusColor(status: string) {
		switch (status) {
			case 'picked_up':
				return 'bg-blue-100 text-blue-800'
			case 'in_progress':
				return 'bg-yellow-100 text-yellow-800'
			case 'ready':
				return 'bg-green-100 text-green-800'
			case 'delivered':
				return 'bg-gray-100 text-gray-800'
			case 'completed':
				return 'bg-green-100 text-green-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	function formatStatus(status: string) {
		return status
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}

	return (
		<>
			<ProfileLayout>
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Order History</h2>
					<Badge variant="outline">{orderHistory.length} Orders</Badge>
				</div>

				<div className="space-y-3">
					{orderHistory.map((order) => (
						<Card key={order.id}>
							<CardContent className="p-4">
								<div className="mb-3 flex items-start justify-between">
									<div>
										<p className="font-medium">Order #{order.id}</p>
										<p className="flex items-center gap-1 text-sm text-gray-600">
											<Calendar className="h-3 w-3" />
											{order.date}
										</p>
									</div>
									<div className="text-right">
										<p className="font-medium">${order.total.toFixed(2)}</p>
										<Badge className={getStatusColor(order.status)}>
											{formatStatus(order.status)}
										</Badge>
									</div>
								</div>

								<div className="mb-3">
									<p className="text-sm text-gray-600">
										{order.items.join(', ')}
									</p>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-1">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`h-4 w-4 ${
													i < order.rating
														? 'fill-yellow-400 text-yellow-400'
														: 'text-gray-300'
												}`}
											/>
										))}
										<span className="ml-1 text-sm text-gray-600">
											({order.rating})
										</span>
									</div>
									<Button variant="ghost" size="sm">
										<Edit3 className="mr-1 h-4 w-4" />
										Reorder
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Card>
					<CardContent className="p-4">
						<div className="text-center">
							<h3 className="mb-2 font-medium">Total Spent This Year</h3>
							<p className="text-2xl font-bold text-blue-600">
								$
								{orderHistory
									.reduce((sum, order) => sum + order.total, 0)
									.toFixed(2)}
							</p>
							<p className="mt-1 text-sm text-gray-600">
								{orderHistory.length} orders completed
							</p>
						</div>
					</CardContent>
				</Card>
			</ProfileLayout>
		</>
	)
}
