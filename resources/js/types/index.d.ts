import type { Config } from 'ziggy-js'

export interface Auth {
	user: User
}

export interface SharedData {
	name: string
	auth: Auth
	ziggy: Config & { location: string }
	[key: string]: unknown
}

export interface User {
	id: number
	name: string
	email: string
	email_verified_at: string | null
	created_at: string
	updated_at: string
	[key: string]: unknown // This allows for additional properties...
}
