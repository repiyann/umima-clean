export interface ServiceData {
	service: string
	quantity: number
	message: string
}

export interface ContactData {
	name: string
	phone: string
	email: string
	address: string
	date: Date | undefined
	time: string
}
