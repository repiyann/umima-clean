export const groupedSteps = [
	{
		label: 'Service',
		paths: ['/order/service'],
	},
	{
		label: 'Detail',
		paths: ['/order/contact', '/order/summary'],
	},
	{
		label: 'Payment',
		paths: ['/order/payment', '/order/confirmation'],
	},
]

export const serviceGroups = [
	{
		label: 'Shoe Cleaning',
		options: [
			{
				value: 'shoe_basic',
				title: 'Basic Clean',
				desc: 'Surface cleaning and polish',
				price: 15000,
			},
			{
				value: 'shoe_premium',
				title: 'Premium Clean',
				desc: 'Deep cleaning, stain removal, and premium polish',
				price: 25000,
			},
			{
				value: 'shoe_express',
				title: 'Express Service',
				desc: 'Quick clean and polish in under 30 minutes',
				price: 20000,
			},
		],
	},
	{
		label: 'Helmet Cleaning',
		options: [
			{
				value: 'helmet_basic',
				title: 'Basic Helmet Clean',
				desc: 'Surface cleaning for helmets',
				price: 10000,
			},
			{
				value: 'helmet_premium',
				title: 'Premium Helmet Clean',
				desc: 'Deep cleaning and deodorizing',
				price: 18000,
			},
		],
	},
	{
		label: 'Bag Cleaning',
		options: [
			{
				value: 'bag_basic',
				title: 'Basic Bag Clean',
				desc: 'Surface cleaning for bags',
				price: 12000,
			},
			{
				value: 'bag_premium',
				title: 'Premium Bag Clean',
				desc: 'Deep cleaning and stain removal',
				price: 20000,
			},
		],
	},
]
