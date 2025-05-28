import Heading from '@/components/atoms/heading'
import OrderLayout from '@/components/templates/order-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { serviceGroups } from '@/constants/order'
import { formatPrice } from '@/lib/utils'
import { CartItem, OrderServiceFormData } from '@/types/order'
import { Link } from '@inertiajs/react'
import { useCallback, useEffect, useState } from 'react'

export default function OrderServicePage() {
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [formData, setFormData] = useState<OrderServiceFormData>({
		service: '',
		quantity: 0,
	})

	useEffect(() => {
		const storedData = sessionStorage.getItem('serviceData')
		if (storedData) {
			const parsedData = JSON.parse(storedData)
			if (parsedData.serviceData) {
				setFormData(parsedData.serviceData)
			}

			if (parsedData.cartItems) {
				setCartItems(parsedData.cartItems)
			}
		}
	}, [])

	function getServiceOption(id: string) {
		for (const group of serviceGroups) {
			for (const option of group.options) {
				if (option.value === id) return option
			}
		}

		return null
	}

	function addToCart(id: string) {
		const existingItem = cartItems.find((item) => item.id === id)
		if (existingItem) {
			setCartItems(
				cartItems.map((item) =>
					item.id === id ? { ...item, quantity: item.quantity + 1 } : item
				)
			)
		} else {
			setCartItems([...cartItems, { id, quantity: 1 }])
		}

		setFormData((prev) => ({ ...prev, service: id }))
	}

	function removeFromCart(id: string) {
		const existingItem = cartItems.find((item) => item.id === id)
		if (existingItem && existingItem.quantity > 1) {
			setCartItems(
				cartItems.map((item) =>
					item.id === id ? { ...item, quantity: item.quantity - 1 } : item
				)
			)
		} else {
			setCartItems(cartItems.filter((item) => item.id !== id))
			if (formData.service === id)
				setFormData((prev) => ({ ...prev, service: '' }))
		}
	}

	function getItemQuantity(id: string) {
		return cartItems.find((item) => item.id === id)?.quantity || 0
	}

	function handleSelectService(id: string) {
		setFormData((prev) => ({
			...prev,
			service: id,
			quantity: getItemQuantity(id) || 1,
		}))

		if (!cartItems.find((item) => item.id === id)) {
			setCartItems([...cartItems, { id, quantity: 1 }])
		}
	}

	const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
	const totalPrice = cartItems.reduce((total, item) => {
		const option = getServiceOption(item.id)
		if (!option) return total

		let itemTotal = option.basePrice || option.price

		if (item.selectedAddons && option.additionalCosts) {
			item.selectedAddons.forEach((addonName) => {
				const addon = option.additionalCosts?.find(
					(cost) => cost.name === addonName
				)
				if (addon) {
					itemTotal += addon.price
				}
			})
		}

		return total + itemTotal * item.quantity
	}, 0)

	const handleContinue = useCallback(() => {
		const serviceData = {
			cartItems,
			totalPrice,
			totalItems,
		}
		sessionStorage.setItem('serviceData', JSON.stringify(serviceData))
	}, [formData, cartItems, totalPrice, totalItems])

	return (
		<OrderLayout>
			<div className="space-y-6">
				<div>
					<Heading className="flex justify-center" title="Pilih Layanan" />

					<div className="space-y-6">
						{serviceGroups.map((group) => (
							<div key={group.label}>
								<h3 className="mb-2 text-base font-semibold text-black">
									{group.label}
								</h3>
								<div className="space-y-3">
									{group.options.map((option) => {
										const itemQuantity = getItemQuantity(option.value)
										const selectedAddons =
											cartItems.find((item) => item.id === option.value)
												?.selectedAddons || []

										return (
											<Card
												className={`cursor-pointer bg-white ${formData.service === option.value ? 'ring-2 ring-black' : ''}`}
												key={option.value}
												onClick={() => handleSelectService(option.value)}
											>
												<CardContent className="flex items-start space-x-3">
													<div className="flex-1">
														<Label
															htmlFor={option.value}
															className="text-base font-medium text-black"
														>
															{option.title}
														</Label>

														<p className="text-sm text-gray-500">
															{option.desc}
														</p>

														<p className="mt-1 font-medium text-black">
															{option.basePrice
																? `Mulai dari ${formatPrice(option.basePrice)}`
																: formatPrice(option.price)}
														</p>

														{itemQuantity > 0 && option.additionalCosts && (
															<div className="mt-2 space-y-2">
																{option.additionalCosts.map((addon) => (
																	<div
																		key={addon.name}
																		className="flex items-center space-x-2"
																	>
																		<input
																			type="checkbox"
																			id={`${option.value}-${addon.name}`}
																			checked={selectedAddons.includes(
																				addon.name
																			)}
																			onChange={(e) => {
																				e.stopPropagation()
																				const item = cartItems.find(
																					(i) => i.id === option.value
																				)
																				if (item) {
																					const newAddons = e.target.checked
																						? [
																								...(item.selectedAddons || []),
																								addon.name,
																							]
																						: (
																								item.selectedAddons || []
																							).filter((a) => a !== addon.name)

																					setCartItems(
																						cartItems.map((i) =>
																							i.id === option.value
																								? {
																										...i,
																										selectedAddons: newAddons,
																									}
																								: i
																						)
																					)
																				}
																			}}
																		/>
																		<Label
																			htmlFor={`${option.value}-${addon.name}`}
																			className="text-sm text-gray-600"
																		>
																			{addon.name} (+{formatPrice(addon.price)})
																		</Label>
																	</div>
																))}
															</div>
														)}
													</div>

													{itemQuantity > 0 ? (
														<div className="mt-2 flex items-center justify-end">
															<button
																onClick={(e) => {
																	e.stopPropagation()
																	removeFromCart(option.value)
																}}
																className="flex h-8 w-8 items-center justify-center rounded-md border border-black text-black hover:bg-gray-100"
															>
																-
															</button>

															<span className="mx-4 font-medium text-black">
																{itemQuantity}
															</span>

															<button
																onClick={(e) => {
																	e.stopPropagation()
																	addToCart(option.value)
																}}
																className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white hover:bg-gray-800"
															>
																+
															</button>
														</div>
													) : (
														<div className="mt-2 flex justify-end">
															<button
																onClick={(e) => {
																	e.stopPropagation()
																	addToCart(option.value)
																}}
																className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white hover:bg-gray-800"
															>
																+
															</button>
														</div>
													)}
												</CardContent>
											</Card>
										)
									})}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="grid w-full grid-cols-2 items-center justify-between gap-4">
					<div>
						<Label
							htmlFor="message"
							className="text-sm font-medium text-gray-700"
						>
							Total Harga
						</Label>
						<div
							className={`font-bold ${totalItems > 0 ? 'text-black' : 'text-gray-400'}`}
						>
							{formatPrice(totalPrice)}
						</div>
					</div>

					<Button
						type="button"
						className="w-full max-w-xs bg-black text-white hover:bg-gray-800"
						disabled={cartItems.length === 0}
						onClick={handleContinue}
					>
						<Link href={route('order.contact')} className="w-full">
							Lanjutkan
						</Link>
					</Button>
				</div>
			</div>
		</OrderLayout>
	)
}
