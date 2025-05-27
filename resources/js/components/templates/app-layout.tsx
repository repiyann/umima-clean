import Navbar from '@/components//mollecules/navbar'
import { usePage } from '@inertiajs/react'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
	const { url } = usePage()

	const hideNavbarRoutes = [
		'/login',
		'/register',
		'/forgot-password',
		'/reset-password',
	]

	const showNavbar = !hideNavbarRoutes.includes(url)

	return (
		<div className="bg-gray-200">
			<div className={`mx-auto max-w-md ${showNavbar ? 'pb-16' : ''}`}>
				{children}

				{showNavbar && <Navbar />}
			</div>
		</div>
	)
}
