import OrderLayout from '@/components/templates/order-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ContactData, ServiceData } from '@/types/summary'
import { Link } from '@inertiajs/react'
import { Calendar, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SummaryPage() {
	const [serviceData, setServiceData] = useState<ServiceData>({
		service: '',
		quantity: 0,
		message: '',
	})

	const [contactData, setContactData] = useState<ContactData>({
		name: '',
		phone: '',
		email: '',
		address: '',
		date: undefined,
		time: '',
	})

	useEffect(() => {
		const storedServiceData = sessionStorage.getItem('serviceData')
		const storedContactData = sessionStorage.getItem('contactData')

		if (storedServiceData) {
			setServiceData(JSON.parse(storedServiceData))
		}

		if (storedContactData) {
			setContactData(JSON.parse(storedContactData))
		}
	}, [])

	return (
		<OrderLayout>
			<div className="space-y-6">
				<h2 className="mb-4 text-lg font-semibold text-black">Order Summary</h2>

				<Card>
					<CardContent className="space-y-4 p-4">
						<div>
							<h3 className="font-medium text-gray-500">Selected Service</h3>
							<p className="font-semibold">
								{serviceData.service === 'basic' && 'Basic Clean - $15'}
								{serviceData.service === 'premium' && 'Premium Clean - $25'}
								{serviceData.service === 'express' && 'Express Service - $20'}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<h3 className="font-medium text-gray-500">Quantity</h3>
								<p className="font-semibold">
									{serviceData.quantity}{' '}
									{serviceData.quantity === 1 ? 'Pair' : 'Pairs'}
								</p>
							</div>
						</div>

						<div className="border-t pt-4">
							<h3 className="font-medium text-gray-500">Contact Information</h3>
							<p className="font-semibold">{contactData.name}</p>
							<p>{contactData.phone}</p>
						</div>

						<div className="flex items-start gap-2 border-t pt-4">
							<MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
							<div>
								<h3 className="font-medium">Pickup Address</h3>
								<p>{contactData.address}</p>
							</div>
						</div>

						<div className="flex items-start gap-2 border-t pt-4">
							<Calendar className="mt-0.5 h-5 w-5 text-gray-500" />
							<div>
								<h3 className="font-medium">Pickup Time</h3>
								<p>
									{contactData.date && <>tes</>}
									{' - '}
									{contactData.time === 'morning' && 'Morning (9-12)'}
									{contactData.time === 'afternoon' && 'Afternoon (12-5)'}
									{contactData.time === 'evening' && 'Evening (5-8)'}
								</p>
							</div>
						</div>

						<div className="border-t pt-4">
							<div className="flex justify-between">
								<h3 className="font-medium">Service Cost</h3>
								<p className="font-semibold">
									{serviceData.service === 'basic' && '$15'}
									{serviceData.service === 'premium' && '$25'}
									{serviceData.service === 'express' && '$20'}
								</p>
							</div>
							<div className="flex justify-between">
								<h3 className="font-medium">Quantity</h3>
								<p className="font-semibold">× {serviceData.quantity}</p>
							</div>
							<div className="mt-2 flex justify-between border-t pt-2">
								<h3 className="font-bold">Total</h3>
								<p className="font-bold">
									$
									{(serviceData.service === 'basic'
										? 15
										: serviceData.service === 'premium'
											? 25
											: serviceData.service === 'express'
												? 20
												: 0) * serviceData.quantity}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="flex gap-3 pt-5">
					<Button type="button" variant="outline" className="flex-1">
						<Link href={route('order.contact')}> Back</Link>
					</Button>

					<Button type="button" className="flex-1">
						<Link href={route('order.summary')}>Continue</Link>
					</Button>
				</div>
			</div>
		</OrderLayout>
	)
}
