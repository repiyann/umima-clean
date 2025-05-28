import L, { LatLng } from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useEffect, useState } from 'react'
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from 'react-leaflet'
import { toast } from 'sonner'

export interface MapProps {
	position: LatLng
	onPositionChange?: (position: LatLng) => void
}

const customIcon = new L.Icon({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
})

function MapEvents({
	setPosition,
	position,
}: {
	position: LatLng
	setPosition: (latlng: LatLng) => void
}) {
	const map = useMapEvents({
		click(e) {
			setPosition(e.latlng)
		},
	})

	useEffect(() => {
		map.flyTo(position, 15)
	}, [map, position])

	return null
}

export default function MapComponent({ position, onPositionChange }: MapProps) {
	const [isDefaultLocation, setIsDefaultLocation] = useState<boolean>(true)

	useEffect(() => {
		getCurrentLocation()
	}, [])

	function getCurrentLocation() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					const latLng = L.latLng(latitude, longitude)
					onPositionChange?.(latLng)
					setIsDefaultLocation(false)
					toast.success('Berhasil mendapatkan lokasi Anda')
				},
				(error) => {
					toast.error('Gagal mendapatkan lokasi')
					onPositionChange?.(position)
					setIsDefaultLocation(true)
				}
			)
		} else {
			toast.error(
				'Browser Anda tidak mendukung geolokasi. Menggunakan lokasi default.'
			)
			onPositionChange?.(position)
			setIsDefaultLocation(true)
		}
	}

	function handlePositionChange(newPosition: LatLng) {
		onPositionChange?.(newPosition)
		setIsDefaultLocation(false)
	}

	return (
		<div
			style={{ height: '400px', width: '100%' }}
			role="application"
			aria-label="Interactive location map"
		>
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				preferCanvas={true}
				style={{
					height: '100%',
					width: '100%',
					position: 'relative',
					zIndex: 0,
				}}
			>
				<TileLayer
					attribution="Google Maps Satellite"
					url="https://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
				/>
				<MapEvents setPosition={handlePositionChange} position={position} />
				<Marker position={position} icon={customIcon}>
					<Popup>
						{isDefaultLocation ? 'Lokasi Umima Clean' : 'Lokasi Anda Sekarang'}
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}
