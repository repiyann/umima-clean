import Heading from '@/components/atoms/heading'
import OrderLayout from '@/components/templates/order-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { serviceGroups } from '@/constants/order'
import { formatPrice } from '@/lib/utils'
import { ContactData, ServiceData } from '@/types/summary'
import { Link } from '@inertiajs/react'
import { Calendar, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SummaryPage() {
	const [serviceData, setServiceData] = useState<ServiceData>({
		cartItems: [],
		totalPrice: 0,
		totalItems: 0,
	})

	const [contactData, setContactData] = useState<ContactData>({
		name: '',
		phone: '',
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
				<Heading className="flex justify-center" title="Ringkasan Pesanan" />

				<Card>
					<CardContent className="space-y-4 p-4">
						<div>
							<h3 className="font-medium text-gray-500">Layanan Dipilih</h3>
							<p className="font-semibold">
								{serviceData.cartItems.map((item, index) => {
									const allOptions = serviceGroups.flatMap(
										(group) => group.options
									)
									const matched = allOptions.find(
										(option) => option.value === item.id
									)

									return (
										<li key={index}>
											{matched ? matched.title : item.id} × {item.quantity}
											{item.selectedAddons &&
												item.selectedAddons.length > 0 && (
													<ul className="ml-4 list-disc text-sm text-gray-600">
														{item.selectedAddons.map((addon, i) => (
															<li key={i}>{addon}</li>
														))}
													</ul>
												)}
										</li>
									)
								})}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<h3 className="font-medium text-gray-500">Jumlah</h3>
								<p className="font-semibold">{serviceData.totalItems} Pasang</p>
							</div>
						</div>

						<div className="border-t pt-4">
							<h3 className="font-medium text-gray-500">Informasi Kontak</h3>
							<p className="font-semibold">{contactData.name}</p>
							<p>{contactData.phone}</p>
						</div>

						<div className="flex items-start gap-2 border-t pt-4">
							<MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
							<div>
								<h3 className="font-medium">Alamat Pengambilan</h3>
								<p>{contactData.address}</p>
							</div>
						</div>

						<div className="flex items-start gap-2 border-t pt-4">
							<Calendar className="mt-0.5 h-5 w-5 text-gray-500" />
							<div>
								<h3 className="font-medium">Waktu Pengambilan</h3>
								<p>
									{contactData.date && <>tes</>}
									{' - '}
									{contactData.time === 'morning' && 'Pagi (9-12)'}
									{contactData.time === 'afternoon' && 'Siang (12-5)'}
									{contactData.time === 'evening' && 'Malam (5-8)'}
								</p>
							</div>
						</div>

						<div className="border-t pt-4">
							{serviceData.cartItems.map((item, idx) => {
								const allOptions = serviceGroups.flatMap(
									(group) => group.options
								)
								const matched = allOptions.find((opt) => opt.value === item.id)
								const basePrice = matched?.price ?? 0
								const addonTotal = (item.selectedAddons?.length ?? 0) * 10000

								return (
									<div key={idx} className="space-y-1">
										<div className="flex justify-between">
											<h3 className="font-medium">
												{matched?.title ?? item.id}
											</h3>
											<p className="font-semibold">
												Rp{formatPrice(basePrice)} × {item.quantity}
											</p>
										</div>
										{addonTotal > 0 && (
											<div className="flex justify-between text-sm text-gray-600">
												<p>Tambahan</p>
												<p>Rp{formatPrice(addonTotal)}</p>
											</div>
										)}
									</div>
								)
							})}
							<div className="flex justify-between border-t pt-1 font-bold">
								<p>Jumlah</p>
								<p>Rp{serviceData.totalPrice}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="flex gap-3 pt-5">
					<Button type="button" className="flex-1">
						<Link href={route('order.contact')}>Kembali</Link>
					</Button>

					<Button type="button" variant="outline" className="flex-1">
						<Link href={route('order.summary')}>Lanjutkan</Link>
					</Button>
				</div>
			</div>
		</OrderLayout>
	)
}
