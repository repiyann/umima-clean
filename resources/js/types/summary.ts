import { CartItem } from "./order"

export interface ServiceData {
	cartItems: CartItem[]
	totalPrice: number
	totalItems: number
}

export interface ContactData {
	name: string
	phone: string
	address: string
	date: Date | undefined
	time: string
}
