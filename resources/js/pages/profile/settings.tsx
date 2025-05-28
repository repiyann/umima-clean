import InputError from '@/components/atoms/input-error'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import {
	Briefcase,
	Building,
	Edit3,
	Home,
	LogOut,
	Mail,
	MapPin,
	Phone,
	PlusCircle,
	Save,
	Settings,
	Trash2,
	X,
} from 'lucide-react'
import { useRef, useState } from 'react'
import ProfileLayout from '../../components/templates/profile-layout'

export default function ProfileSettingsPage() {
	const passwordInput = useRef<HTMLInputElement>(null)
	const currentPasswordInput = useRef<HTMLInputElement>(null)

	const { data, setData, errors, put, reset, processing, recentlySuccessful } =
		useForm({
			current_password: '',
			password: '',
			password_confirmation: '',
		})

	function updatePassword(e: React.FormEvent) {
		e.preventDefault()

		put(route('password.update'), {
			preserveScroll: true,
			onSuccess: () => reset(),
			onError: (errors) => {
				if (errors.password) {
					reset('password', 'password_confirmation')
					passwordInput.current?.focus()
				}

				if (errors.current_password) {
					reset('current_password')
					currentPasswordInput.current?.focus()
				}
			},
		})
	}

	const [addresses, setAddresses] = useState([
		{ id: 1, type: 'home', address: '123 Main St, Apt 4B, New York, NY 10001' },
		{
			id: 2,
			type: 'office',
			address: '456 Business Ave, Suite 200, New York, NY 10002',
		},
	])
	const [showAddAddress, setShowAddAddress] = useState(false)
	const [newAddressType, setNewAddressType] = useState('home')
	const [newAddressValue, setNewAddressValue] = useState('')

	function handleAddAddress() {
		if (newAddressValue.trim()) {
			const newAddress = {
				id: addresses.length + 1,
				type: newAddressType,
				address: newAddressValue,
			}
			setAddresses([...addresses, newAddress])
			setNewAddressValue('')
			setNewAddressType('home')
			setShowAddAddress(false)
		}
	}

	return (
		<>
			<ProfileLayout>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Settings className="h-5 w-5" />
							Account Info
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="firstName">First Name</Label>
								<Input id="firstName" defaultValue="Sarah" />
							</div>
							<div>
								<Label htmlFor="lastName">Last Name</Label>
								<Input id="lastName" defaultValue="Anderson" />
							</div>
						</div>
						<div>
							<Label htmlFor="email">Email</Label>
							<div className="relative">
								<Mail className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
								<Input
									id="email"
									defaultValue="sarah.anderson@email.com"
									className="pl-10"
								/>
							</div>
						</div>
						<div>
							<Label htmlFor="phone">Phone Number</Label>
							<div className="relative">
								<Phone className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
								<Input
									id="phone"
									defaultValue="+1 (555) 123-4567"
									className="pl-10"
								/>
							</div>
						</div>
						<Separator />
						<form onSubmit={updatePassword} className="space-y-6">
							<div className="grid gap-2">
								<Label htmlFor="current_password">Current password</Label>

								<Input
									id="current_password"
									ref={currentPasswordInput}
									value={data.current_password}
									onChange={(e) => setData('current_password', e.target.value)}
									type="password"
									className="mt-1 block w-full"
									autoComplete="current-password"
									placeholder="Current password"
								/>

								<InputError message={errors.current_password} />
							</div>

							<div className="grid gap-2">
								<Label htmlFor="password">New password</Label>

								<Input
									id="password"
									ref={passwordInput}
									value={data.password}
									onChange={(e) => setData('password', e.target.value)}
									type="password"
									className="mt-1 block w-full"
									autoComplete="new-password"
									placeholder="New password"
								/>

								<InputError message={errors.password} />
							</div>

							<div className="grid gap-2">
								<Label htmlFor="password_confirmation">Confirm password</Label>

								<Input
									id="password_confirmation"
									value={data.password_confirmation}
									onChange={(e) =>
										setData('password_confirmation', e.target.value)
									}
									type="password"
									className="mt-1 block w-full"
									autoComplete="new-password"
									placeholder="Confirm password"
								/>

								<InputError message={errors.password_confirmation} />
							</div>

							<div className="flex items-center gap-4">
								<Button disabled={processing}>Save password</Button>

								<Transition
									show={recentlySuccessful}
									enter="transition ease-in-out"
									enterFrom="opacity-0"
									leave="transition ease-in-out"
									leaveTo="opacity-0"
								>
									<p className="text-sm text-neutral-600">Saved</p>
								</Transition>
							</div>
						</form>
					</CardContent>
					<CardFooter>
						<Button className="w-full">
							<Save className="mr-2 h-4 w-4" />
							Save Account Info
						</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Addresses</CardTitle>
						<Button
							variant="outline"
							size="sm"
							className="h-8"
							onClick={() => setShowAddAddress(true)}
						>
							<PlusCircle className="mr-1 h-4 w-4" />
							Add Address
						</Button>
					</CardHeader>
					<CardContent className="space-y-4">
						{showAddAddress && (
							<div className="space-y-3 rounded-lg border bg-gray-50 p-3">
								<div className="flex items-center justify-between">
									<h3 className="font-medium">Add New Address</h3>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										onClick={() => setShowAddAddress(false)}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
								<div className="space-y-3">
									<div>
										<Label htmlFor="addressType">Address Type</Label>
										<Select
											value={newAddressType}
											onValueChange={setNewAddressType}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select address type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="home">
													<div className="flex items-center gap-2">
														<Home className="h-4 w-4" />
														<span>Home</span>
													</div>
												</SelectItem>
												<SelectItem value="office">
													<div className="flex items-center gap-2">
														<Briefcase className="h-4 w-4" />
														<span>Office</span>
													</div>
												</SelectItem>
												<SelectItem value="other">
													<div className="flex items-center gap-2">
														<Building className="h-4 w-4" />
														<span>Other</span>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div>
										<Label htmlFor="newAddress">Address</Label>
										<div className="relative">
											<MapPin className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
											<Input
												id="newAddress"
												placeholder="Enter full address"
												className="pl-10"
												value={newAddressValue}
												onChange={(e) => setNewAddressValue(e.target.value)}
											/>
										</div>
									</div>
									<Button className="w-full" onClick={handleAddAddress}>
										<Save className="mr-2 h-4 w-4" />
										Save Address
									</Button>
								</div>
							</div>
						)}

						{addresses.map((address) => (
							<div key={address.id} className="space-y-2 rounded-lg border p-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										{address.type === 'home' ? (
											<Home className="h-4 w-4 text-blue-500" />
										) : address.type === 'office' ? (
											<Briefcase className="h-4 w-4 text-green-500" />
										) : (
											<Building className="h-4 w-4 text-purple-500" />
										)}
										<span className="font-medium capitalize">
											{address.type}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<Edit3 className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-red-500"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
								<div className="flex items-start gap-2">
									<MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
									<p className="text-sm text-gray-600">{address.address}</p>
								</div>
							</div>
						))}
					</CardContent>
					<CardFooter>
						<Button className="w-full">
							<Save className="mr-2 h-4 w-4" />
							Save Address Changes
						</Button>
					</CardFooter>
				</Card>

				<Button
					variant="outline"
					className="mt-4 w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
				>
					<LogOut className="mr-2 h-4 w-4" />
					Logout
				</Button>
			</ProfileLayout>
		</>
	)
}
