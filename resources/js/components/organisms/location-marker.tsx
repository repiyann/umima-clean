import L, { LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

import { useLocation } from '@/hooks/use-map'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useEffect } from 'react'

L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
})

export default function LocationMarker() {
	const {
		position,
		setPosition,
		setAddress,
		setRoad,
		setVillage,
		setSubdistrict,
		setCity,
		setPostcode,
	} = useLocation()

	const map = useMapEvents({
		click(e) {
			setPosition(e.latlng)
			fetchAddress(e.latlng)
		},
	})

	useEffect(() => {
		if (position) {
			map.flyTo(position, 15)
		}
	}, [position, map])

	async function fetchAddress(latlng: LatLng) {
		const { lat, lng } = latlng
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
			)
			const data = await response.json()

			if (data && data.address) {
				setRoad(data.address.road)
				setVillage(data.address.village)
				setSubdistrict(data.address.subdistrict)
				setCity(data.address.city || data.address.county)
				setPostcode(data.address.postcode)
			}

			if (data && data.display_name) {
				setAddress(data.display_name)
			} else {
				setAddress('No address found')
			}
		} catch (error) {
			console.error('Error fetching address:', error)
			setAddress('Error fetching address')
		}
	}

	return (
		<>
			{/* <TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/> */}
			<TileLayer
				attribution="Google Maps Satellite"
				url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
			/>

			{position !== undefined && (
				<Marker position={position}>
					<Popup>You clicked here!</Popup>
				</Marker>
			)}
		</>
	)
}
