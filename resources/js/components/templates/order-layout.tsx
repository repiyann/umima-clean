import { groupedSteps } from '@/constants/order'
import { Link, usePage } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import { ReactNode } from 'react'

export default function OrderLayout({ children }: { children: ReactNode }) {
	const { url } = usePage()

	const groupIndex =
		groupedSteps.findIndex((group) =>
			group.paths.some((path) => url.startsWith(path))
		) !== -1
			? groupedSteps.findIndex((group) =>
					group.paths.some((path) => url.startsWith(path))
				)
			: 0

	return (
		<main className="flex min-h-screen flex-col bg-gray-50">
			<header className="sticky top-0 z-10 border-b bg-white p-4">
				<div className="flex items-center">
					<Link href="/" className="text-gray-600">
						<ArrowLeft className="h-5 w-5" />
					</Link>
					<h1 className="flex-1 pr-5 text-center text-xl font-bold text-black">
						Buat Pesanan Anda
					</h1>
				</div>
			</header>

			<div className="flex-1 p-4">
				{/* Breadcrumb */}
				<div className="mb-6">
					<div className="mb-2 flex justify-between">
						{groupedSteps.map((group, idx) => (
							<div
								key={group.label}
								className={`flex-1 text-center ${groupIndex >= idx ? 'font-medium text-sky-600' : 'text-gray-400'}`}
							>
								{group.label}
							</div>
						))}
					</div>
					<div className="h-2 w-full rounded-full bg-gray-200">
						<div
							className="h-2 rounded-full bg-sky-600 transition-all duration-300"
							style={{
								width: `${((groupIndex + 1) / groupedSteps.length) * 100}%`,
							}}
						></div>
					</div>
				</div>

				{/* Content */}
				{children}
			</div>
		</main>
	)
}
