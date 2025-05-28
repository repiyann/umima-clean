import Heading from '@/components/atoms/heading'
import MapComponent from '@/components/organisms/map'
import OrderLayout from '@/components/templates/order-layout'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { OrderContactFormData, SelectChangeProps } from '@/types/order'
import { Link } from '@inertiajs/react'
import { format } from 'date-fns'
import L from 'leaflet'
import { CalendarIcon, Clock } from 'lucide-react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

export default function OrderContactPage() {
	const [formData, setFormData] = useState<OrderContactFormData>({
		name: '',
		phone: '',
		address: '',
		position: new L.LatLng(-6.9555305, 107.6540353),
		date: new Date(),
		time: '',
	})

	useEffect(() => {
		const storedData = sessionStorage.getItem('contactData')
		if (storedData) {
			const parsedData = JSON.parse(storedData)

			setFormData(parsedData)
		}
	}, [])

	function handleChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	function handleSelectChange({ name, value }: SelectChangeProps) {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	function handlePositionChange(newPosition: L.LatLng) {
		setFormData((prevData) => ({
			...prevData,
			position: newPosition,
		}))
	}

	const handleContinue = useCallback(() => {
		const contactData = {
			name: formData.name,
			phone: formData.phone,
			address: formData.address,
			position: {
				lat: formData.position.lat,
				lng: formData.position.lng,
			},
			date: formData.date,
			time: formData.time,
		}
		sessionStorage.setItem('contactData', JSON.stringify(contactData))
	}, [formData])

	return (
		<OrderLayout>
			<div className="space-y-4">
				<div>
					<Heading className="flex justify-center" title="Detail Pembeli" />

					<div className="space-y-2">
						<div className="space-y-2">
							<Label className="text-black" htmlFor="name">
								Nama Lengkap
							</Label>
							<Input
								id="name"
								name="name"
								className="text-black"
								value={formData.name}
								onChange={handleChange}
								placeholder="Masukkan nama lengkap Anda"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label className="text-black" htmlFor="phone">
								Nomor Telepon
							</Label>
							<Input
								id="phone"
								name="phone"
								className="text-black"
								type="tel"
								value={formData.phone}
								onChange={handleChange}
								placeholder="Masukkan nomor telepon Anda"
								required
							/>
						</div>
					</div>
				</div>

				<Separator />

				<div>
					<h2 className="mb-2 text-lg font-semibold text-black">
						Detail Alamat
					</h2>
					<div className="space-y-2">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-black" htmlFor="date">
									Tanggal yang Diinginkan
								</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'w-[200px] pl-3 text-left font-normal',
												!formData.date && 'text-muted-foreground'
											)}
										>
											{formData.date ? (
												format(formData.date, 'PPP')
											) : (
												<span>Pilih tanggal</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										side="top"
										align="start"
									>
										<Calendar
											mode="single"
											selected={formData.date}
											onSelect={(date) =>
												setFormData((prevData) => ({
													...prevData,
													date: date,
												}))
											}
											disabled={(date) => {
												const now = new Date()
												const today = new Date(
													now.getFullYear(),
													now.getMonth(),
													now.getDate()
												)
												const dateToCheck = new Date(
													date.getFullYear(),
													date.getMonth(),
													date.getDate()
												)

												if (dateToCheck < today) return true

												if (
													dateToCheck.getTime() === today.getTime() &&
													now.getHours() >= 15
												) {
													return true
												}

												if (date < new Date('1900-01-01')) return true

												return false
											}}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="space-y-2">
								<Label className="text-black" htmlFor="time">
									Waktu yang Diinginkan
								</Label>
								<div className="relative">
									<Select
										value={formData.time}
										onValueChange={(value) =>
											handleSelectChange({ name: 'time', value })
										}
									>
										<SelectTrigger className="text-black">
											<SelectValue placeholder="Pilih waktu" />
										</SelectTrigger>

										<SelectContent className="bg-white text-black">
											<SelectItem value="morning">Pagi (9-12)</SelectItem>
											<SelectItem value="afternoon">Siang (12-5)</SelectItem>
											<SelectItem value="evening">Malam (5-8)</SelectItem>
										</SelectContent>
									</Select>
									<Clock className="pointer-events-none absolute top-2.5 right-8 h-4 w-4 text-gray-500" />
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<Label className="text-black" htmlFor="address">
								Alamat
							</Label>
							<Textarea
								id="address"
								name="address"
								className="text-black"
								value={formData.address}
								onChange={handleChange}
								placeholder="Masukkan alamat pengambilan dan pengantaran"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label className="text-black" htmlFor="address">
								Lokasi
							</Label>
							<div className="overflow-hidden rounded-lg border">
								<MapComponent
									position={formData.position}
									onPositionChange={handlePositionChange}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex gap-3 pt-5">
					<Button type="button" className="flex-1">
						<Link href={route('order.service')}>Kembali</Link>
					</Button>

					<Button
						type="button"
						variant="outline"
						className="flex-1"
						disabled={
							!formData.name ||
							!formData.phone ||
							!formData.address ||
							!formData.date ||
							!formData.time
						}
						onClick={handleContinue}
					>
						<Link href={route('order.summary')}>Lanjutkan</Link>
					</Button>
				</div>
			</div>
		</OrderLayout>
	)
}
