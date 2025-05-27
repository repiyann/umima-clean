import { LatLng } from "leaflet"

export interface CartItem {
	id: string
	quantity: number
	message?: string
}

export interface OrderServiceFormData {
	service: string
	quantity: number
	message: string
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
