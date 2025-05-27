import { type SharedData } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { Home, Package, User } from 'lucide-react'

export default function Navbar() {
	const { url } = usePage()
	const { auth } = usePage<SharedData>().props

	function isActive(path: string) {
		if (path === '/') {
			return url === '/'
		}
		return url.includes(path)
	}

	return (
		<>
			<div className="fixed bottom-0 z-50 w-full max-w-md rounded-md border-t bg-white px-2 py-1">
				<div className="flex items-center justify-around">
					<Link
						href={route('home')}
						className="flex flex-col items-center py-1"
					>
						<div
							className={`rounded-full p-1.5 ${isActive('/') ? 'bg-sky-100 text-sky-600' : 'text-gray-500'}`}
						>
							<Home className="h-5 w-5" />
						</div>
						<span
							className={`mt-0.5 text-xs ${isActive('/') ? 'font-medium text-sky-600' : 'text-gray-500'}`}
						>
							Home
						</span>
					</Link>

					<Link
						href={route('order.service')}
						className="flex flex-col items-center py-1"
					>
						<div
							className={`rounded-full p-1.5 ${isActive('/order') ? 'bg-sky-100 text-sky-600' : 'text-gray-500'}`}
						>
							<Package className="h-5 w-5" />
						</div>
						<span
							className={`mt-0.5 text-xs ${isActive('/order') ? 'font-medium text-sky-600' : 'text-gray-500'}`}
						>
							Order
						</span>
					</Link>

					<Link
						href={auth.user ? route('profile') : route('login')}
						className="flex flex-col items-center border-0 bg-transparent py-1"
					>
						<div
							className={`rounded-full p-1.5 ${isActive('/profile') ? 'bg-sky-100 text-sky-600' : 'text-gray-500'}`}
						>
							<User className="h-5 w-5" />
						</div>
						<span
							className={`mt-0.5 text-xs ${isActive('/profile') ? 'font-medium text-sky-600' : 'text-gray-500'}`}
						>
							Account
						</span>
					</Link>
				</div>
			</div>
		</>
	)
}
