import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { services, steps, testimonials } from '@/constants/welcome'
import { Head, Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

export default function WelcomePage() {
	return (
		<>
			<Head title="Halaman Utama">
				<link rel="preconnect" href="https://fonts.bunny.net" />
				<link
					href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
					rel="stylesheet"
				/>
			</Head>

			<main className="flex min-h-screen flex-col bg-white">
				{/* Hero Section */}
				<section className="relative flex h-[40vh] items-center justify-center">
					<img
						src="/placeholder.svg?height=400&width=600"
						alt="Umima Clean"
						className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
						loading="eager"
					/>

					<div className="relative z-10 px-4 text-center">
						<h1 className="mb-2 text-3xl font-bold text-black">Umima Clean</h1>
						<p className="mb-6 text-lg text-black">
							Layanan Cuci Sepatu, Tas, dan Helm Profesional
						</p>

						<Button className="border border-white/20 bg-black text-white shadow-lg hover:bg-gray-800">
							<Link
								href={route('order.service')}
								className="flex items-center text-base"
							>
								Pesan Sekarang <ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
					</div>
				</section>

				{/* Services Section */}
				<section className="px-4 py-8">
					<h2 className="mb-3 text-center text-2xl font-bold text-black">
						Layanan Kami
					</h2>
					<div className="space-y-4">
						{services.map((service) => (
							<Card
								key={service.title}
								className="flex items-center gap-2 border-gray-200 bg-white"
							>
								<CardHeader>
									<CardTitle className="text-black">{service.title}</CardTitle>
								</CardHeader>
								<CardContent className="text-center text-gray-600">
									{service.description}
								</CardContent>
								<CardFooter className="font-medium text-black">
									{service.price}
								</CardFooter>
							</Card>
						))}
					</div>
				</section>

				{/* How It Works */}
				<section className="bg-gray-50 px-4 py-8">
					<h2 className="mb-3 text-center text-2xl font-bold text-black">
						Cara Kerja
					</h2>
					<div className="space-y-6">
						{steps.map((step, idx) => (
							<div className="flex flex-col" key={step.title}>
								<div className="flex">
									<div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold text-white">
										{idx + 1}
									</div>
									<h3 className="font-semibold text-black">{step.title}</h3>
								</div>
								<p className="ml-12 text-sm text-gray-600">
									{step.description}
								</p>
							</div>
						))}
					</div>

					<div className="mt-8 text-center">
						<Button className="border border-white/20 bg-black text-white shadow-lg hover:bg-gray-800">
							<Link
								href={route('order.service')}
								className="flex items-center text-base"
							>
								Pesan Sekarang <ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
					</div>
				</section>

				{/* Testimonials */}
				<section className="px-4 py-8">
					<h2 className="mb-3 text-center text-2xl font-bold text-black">
						Apa Kata Pelanggan Kami
					</h2>
					<div className="space-y-4">
						{testimonials.map((t, idx) => (
							<Card
								key={idx}
								className="gap-2 rounded-lg border bg-white shadow-sm"
							>
								<CardHeader className="flex flex-row items-center">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
										<span className="text-lg font-bold text-gray-700">
											{t.initial}
										</span>
									</div>
									<div>
										<CardTitle className="text-base font-semibold text-black">
											{t.name}
										</CardTitle>
										<CardDescription className="flex text-yellow-400">
											{[...Array(t.rating)].map((_, i) => (
												<svg
													key={i}
													xmlns="http://www.w3.org/2000/svg"
													className="h-4 w-4"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											))}
										</CardDescription>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-600">"{t.text}"</p>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<section className="bg-gray-50 px-4 py-8">
					<h2 className="mb-3 text-center text-2xl font-bold text-black">
						Lacak Pesananmu
					</h2>
					<div className="mx-auto max-w-md text-center">
						<p className="mb-6 text-gray-600">
							Kamu dapat melacak status pesananmu dengan mengklik tombol di
							bawah ini
						</p>
						<Button className="w-full border border-white/20 bg-black text-white shadow-lg hover:bg-gray-800">
							<Link
								href={route('order.tes')}
								className="flex items-center justify-center text-base"
							>
								Lacak Pesanan <ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
					</div>
				</section>

				{/* Footer */}
				<footer className="mt-auto bg-gray-900 px-4 py-8 text-white">
					<div className="mb-4 text-center">
						<h2 className="mb-2 text-xl font-bold">Umima Clean</h2>
						<p className="text-sm text-gray-400">
							Layanan Cuci Sepatu, Tas, dan Helm Profesional
						</p>
					</div>
					<div className="text-center text-sm text-gray-400">
						<p>
							Jl. Margacinta No. 132, Margasari, Kec. Buahbatu, Kota Bandung,
							Jawa Barat 40286
						</p>
						<p>@umima.clean</p>
						<p>(+62) 851-5790-0974</p>
					</div>
					<div className="mt-6 text-center text-xs text-gray-500">
						<p>
							© {new Date().getFullYear()} Umima Clean. Hak cipta dilindungi
							undang-undang.
						</p>
					</div>
				</footer>
			</main>
		</>
	)
}
