import 'leaflet/dist/leaflet.css'
import '../css/app.css'

import Layout from '@/components/templates/app-layout'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

interface PageModule {
	default: {
		layout?: (page: React.ReactNode) => React.JSX.Element
	}
}

const appName = import.meta.env.VITE_APP_NAME || 'UmimaClean'

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => {
		const pages = import.meta.glob<PageModule>('./pages/**/*.tsx', {
			eager: true,
		})
		let page = pages[`./pages/${name}.tsx`]

		page.default.layout =
			page.default.layout || ((page) => <Layout children={page} />)

		return page
	},
	setup({ el, App, props }) {
		const root = createRoot(el)

		root.render(<App {...props} />)
	},
	progress: {
		color: '#4B5563',
	},
})
