import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Calendar, CheckCircle, Clock, Package, Truck } from 'lucide-react'
import ProfileLayout from '../../components/templates/profile-layout'

export default function TrackOrderPage() {
	const activeOrders = [
		{
			id: 'LD001',
			status: 'picked_up',
			items: ['2x Shirts', '1x Pants', '3x Underwear'],
			pickupDate: '2024-01-15',
			estimatedDelivery: '2024-01-17',
			total: 25.5,
		},
		{
			id: 'LD002',
			status: 'in_progress',
			items: ['1x Dress', '2x Blouses'],
			pickupDate: '2024-01-16',
			estimatedDelivery: '2024-01-18',
			total: 18.0,
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

	function getStatusIcon(status: string) {
		switch (status) {
			case 'picked_up':
				return <Package className="h-4 w-4" />
			case 'in_progress':
				return <Clock className="h-4 w-4" />
			case 'ready':
				return <CheckCircle className="h-4 w-4" />
			case 'delivered':
				return <Truck className="h-4 w-4" />
			case 'completed':
				return <CheckCircle className="h-4 w-4" />
			default:
				return <Package className="h-4 w-4" />
		}
	}

	return (
		<>
			<ProfileLayout>
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Active Orders</h2>
					<Badge variant="outline">{activeOrders.length} Active</Badge>
				</div>

				{activeOrders.map((order) => (
					<Card key={order.id}>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Order #{order.id}</CardTitle>
								<Badge className={getStatusColor(order.status)}>
									<div className="flex items-center gap-1">
										{getStatusIcon(order.status)}
										{formatStatus(order.status)}
									</div>
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="space-y-3">
							<div>
								<p className="mb-1 text-sm font-medium">Items:</p>
								<p className="text-sm text-gray-600">
									{order.items.join(', ')}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<p className="flex items-center gap-1 font-medium">
										<Calendar className="h-4 w-4" />
										Picked Up
									</p>
									<p className="text-gray-600">{order.pickupDate}</p>
								</div>
								<div>
									<p className="flex items-center gap-1 font-medium">
										<Truck className="h-4 w-4" />
										Delivery
									</p>
									<p className="text-gray-600">{order.estimatedDelivery}</p>
								</div>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<span className="font-medium">
									Total: ${order.total.toFixed(2)}
								</span>
								<Button variant="outline" size="sm">
									Track Order
								</Button>
							</div>

							{/* Progress Bar */}
							<div className="space-y-2">
								<div className="flex justify-between text-xs text-gray-600">
									<span>Picked Up</span>
									<span>In Progress</span>
									<span>Ready</span>
									<span>Delivered</span>
								</div>
								<div className="h-2 w-full rounded-full bg-gray-200">
									<div
										className="h-2 rounded-full bg-blue-600 transition-all duration-300"
										style={{
											width:
												order.status === 'picked_up'
													? '25%'
													: order.status === 'in_progress'
														? '50%'
														: order.status === 'ready'
															? '75%'
															: '100%',
										}}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				))}

				{activeOrders.length === 0 && (
					<Card>
						<CardContent className="py-8 text-center">
							<Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
							<p className="text-gray-600">No active orders</p>
							<Button className="mt-4">Place New Order</Button>
						</CardContent>
					</Card>
				)}
			</ProfileLayout>
		</>
	)
}
