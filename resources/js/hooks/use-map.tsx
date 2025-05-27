import { LatLng } from 'leaflet'
import { createContext, useContext, useState } from 'react'

interface LocationContextType {
	position: LatLng | undefined
	address: string
	road: string
	village: string
	subdistrict: string
	city: string
	postcode: string
	setPosition: (position: LatLng) => void
	setAddress: (address: string) => void
	setRoad: (road: string) => void
	setVillage: (village: string) => void
	setSubdistrict: (subdistrict: string) => void
	setCity: (city: string) => void
	setPostcode: (postcode: string) => void
}

const LocationContext = createContext<LocationContextType | undefined>(
	undefined
)

export function LocationProvider({ children }: { children: React.ReactNode }) {
	const [position, setPosition] = useState<LatLng | undefined>(undefined)
	const [address, setAddress] = useState<string>('')
	const [road, setRoad] = useState<string>('')
	const [village, setVillage] = useState<string>('')
	const [subdistrict, setSubdistrict] = useState<string>('')
	const [city, setCity] = useState<string>('')
	const [postcode, setPostcode] = useState<string>('')

	return (
		<LocationContext.Provider
			value={{
				position,
				address,
				road,
				village,
				subdistrict,
				city,
				postcode,
				setPosition,
				setAddress,
				setRoad,
				setVillage,
				setSubdistrict,
				setCity,
				setPostcode,
			}}
		>
			{children}
		</LocationContext.Provider>
	)
}

export function useLocation() {
	const context = useContext(LocationContext)
	if (!context) {
		throw new Error('useLocation must be used within a LocationProvider')
	}
	return context
}
