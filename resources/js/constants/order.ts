import { ServiceOption } from '@/types/order'

export const groupedSteps = [
	{
		label: 'Layanan',
		paths: ['/order/service'],
	},
	{
		label: 'Detail',
		paths: ['/order/contact', '/order/summary'],
	},
	{
		label: 'Pembayaran',
		paths: ['/order/payment', '/order/confirmation'],
	},
]

export const serviceGroups: ServiceOption[] = [
	{
		label: 'Shoe Treatment',
		options: [
			{
				value: 'mild',
				title: 'Mild',
				desc: 'Pencucian bagian luar dan dalam sepatu untuk menjaga sepatu tetap bersih',
				price: 60000,
				additionalCosts: [
					{ name: 'One Day Service', price: 10000 },
					{ name: 'Suede/Nubuck', price: 10000 },
					{ name: 'White Shoes', price: 10000 },
				],
			},
			{
				value: 'medium',
				title: 'Medium',
				desc: 'Pencucian bagian luar dan dalam pada sepatu yang terdapat noda cenderung ringan',
				price: 65000,
				additionalCosts: [
					{ name: 'One Day Service', price: 10000 },
					{ name: 'Suede/Nubuck', price: 10000 },
					{ name: 'White Shoes', price: 10000 },
				],
			},
			{
				value: 'hard',
				title: 'Hard',
				desc: 'Pencucian bagian luar dan dalam pada sepatu yang terdapat noda berat atau cenderung berat',
				price: 70000,
				additionalCosts: [
					{ name: 'One Day Service', price: 10000 },
					{ name: 'Suede/Nubuck', price: 10000 },
					{ name: 'White Shoes', price: 10000 },
				],
			},
			{
				value: 'premium_suede',
				title: 'Premium For Suede',
				desc: 'Perawatan khusus untuk sepatu suede',
				price: 120000,
				basePrice: 120000,
				additionalCosts: [
					{ name: 'One Day Service', price: 10000 },
					{ name: 'Suede/Nubuck', price: 10000 },
					{ name: 'White Shoes', price: 10000 },
				],
			},
			{
				value: 'kids_shoes',
				title: 'Kids Shoes',
				desc: 'Pencucian sepatu anak-anak dengan perawatan khusus',
				price: 40000,
				basePrice: 40000,
				additionalCosts: [
					{ name: 'One Day Service', price: 10000 },
					{ name: 'Suede/Nubuck', price: 10000 },
					{ name: 'White Shoes', price: 10000 },
				],
			},
			{
				value: 'unyellowing',
				title: 'Unyellowing',
				desc: 'Perawatan khusus untuk menghilangkan noda kuning pada sepatu',
				price: 30000,
				basePrice: 30000,
			},
			// {
			// 	value: 'white_shoes',
			// 	title: 'White Shoes',
			// 	desc: 'Tambahan biaya untuk sepatu putih',
			// 	basePrice: 10000,
			// },
			// {
			// 	value: 'nubuck',
			// 	title: 'Nubuck',
			// 	desc: 'Tambahan biaya untuk bahan nubuck',
			// 	basePrice: 10000,
			// },
			// {
			// 	value: 'one_day_service',
			// 	title: 'One Day Service',
			// 	desc: 'Layanan selesai dalam satu hari',
			// 	basePrice: 10000,
			// },
		],
	},
	{
		label: 'Helmet Cleaning',
		options: [
			{
				value: 'helmet_reguler',
				title: 'Helmet Spa Reguler',
				desc: 'Pembersihan dasar untuk helm',
				price: 35000,
			},
			{
				value: 'helmet_premium',
				title: 'Helmet Spa Premium',
				desc: 'Pembersihan dan perawatan khusus untuk helm',
				price: 70000,
			},
		],
	},
	{
		label: 'Bag Cleaning',
		options: [
			{
				value: 'bag_small',
				title: 'Small Bag Clean (Canvas/Fabric)',
				desc: 'Tas kecil berukuran maksimal 25cm berbahan canvas atau fabric',
				price: 40000,
			},
			{
				value: 'bag_small_leather',
				title: 'Small Bag Clean (Leather/Nubuck)',
				desc: 'Tas kecil berukuran maksimal 25cm berbahan leather atau nubuck',
				price: 60000,
			},
			{
				value: 'bag_medium',
				title: 'Medium Bag Clean (Canvas/Fabric)',
				desc: 'Tas sedang berukuran maksimal 35cm berbahan canvas atau fabric',
				price: 55000,
			},
			{
				value: 'bag_medium_leather',
				title: 'Medium Bag Clean (Leather/Nubuck)',
				desc: 'Tas sedang berukuran maksimal 35cm berbahan leather atau nubuck',
				price: 75000,
			},
			{
				value: 'bag_large',
				title: 'Large Bag Clean (Canvas/Fabric)',
				desc: 'Tas besar berukuran maksimal 60cm berbahan canvas atau fabric',
				price: 70000,
			},
			{
				value: 'bag_large_leather',
				title: 'Large Bag Clean (Leather/Nubuck)',
				desc: 'Tas besar berukuran maksimal 60cm berbahan leather atau nubuck',
				price: 85000,
			},
			{
				value: 'bag_extra_large',
				title: 'Extra Large Bag Clean (Canvas/Fabric)',
				desc: 'Tas ekstra besar berukuran lebih dari 60cm berbahan canvas atau fabric',
				price: 85000,
			},
			{
				value: 'bag_extra_large_leather',
				title: 'Extra Large Bag Clean (Leather/Nubuck)',
				desc: 'Tas ekstra besar berukuran lebih dari 60cm berbahan leather atau nubuck',
				price: 100000,
			},
		],
	},
	{
		label: 'Painting Service',
		options: [
			{
				value: 'premium_painting',
				title: 'Premium Painting',
				desc: 'Pewarnaan pada sepatu di bagian upper',
				price: 150000,
				basePrice: 150000,
			},
			{
				value: 'midsole_painting',
				title: 'Midsole Painting / Recolor',
				desc: 'Pewarnaan pada sepatu di bagian midsole',
				price: 180000,
			},
		],
	},
]
