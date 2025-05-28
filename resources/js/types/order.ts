import { LatLng } from 'leaflet'

export interface CartItem {
	id: string
	quantity: number
	selectedAddons?: string[]
}

interface ServiceGroup {
	value: string
	title: string
	desc: string
	price: number
	basePrice?: number
	additionalCosts?: {
		name: string
		price: number
	}[]
}

export interface ServiceOption {
	label: string
	options: ServiceGroup[]
}

export interface OrderServiceFormData {
	service: string
	quantity: number
}

export interface OrderContactFormData {
	name: string
	phone: string
	address: string
	date: Date | undefined
	time: string
	position: LatLng
}

export interface SelectChangeProps {
	value: string
	name: keyof OrderContactFormData
}
