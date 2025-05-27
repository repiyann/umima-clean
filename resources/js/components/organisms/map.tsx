import { useLocation } from '@/hooks/use-map'
import { LatLng } from 'leaflet'
import { MapContainer } from 'react-leaflet'
import LocationMarker from './map'

export default function Map() {
	const {
		position,
		setPosition,
		road,
		village,
		subdistrict,
		city,
		postcode,
		setRoad,
		setVillage,
		setSubdistrict,
		setCity,
		setPostcode,
	} = useLocation()

	const bandungSubdistricts = [
		'Coblong',
		'Cidadap',
		'Andir',
		'Bandung Kidul',
		'Bandung Wetan',
		'Bojongloa Kidul',
		'Astana Anyar',
		'Kiaracondong',
		'Rancasari',
		'Sumur Bandung',
		'Cibeunying Kidul',
		'Cibeunying Wetan',
		'Batununggal',
		'Cimahi',
		'Leuwi Gajah',
		'Kopo',
	]

	async function searchAddress() {
		const query = [road, village, subdistrict, city, postcode]
			.filter(Boolean)
			.join(', ')
		if (!query) return alert('Please fill in some address fields.')

		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
			)
			const data = await response.json()

			if (data && data.length > 0) {
				const { lat, lon } = data[0]
				const latlng = new LatLng(lat, lon)
				console.log('latlng', latlng)

				setPosition(latlng)
			} else {
				alert('No matching address found')
			}
		} catch (error) {
			console.error('Error fetching address:', error)
		}
	}

	return (
		<>
			<MapContainer
				center={
					position
						? { lat: position.lat, lng: position.lng }
						: { lat: -6.914, lng: 107.609 }
				}
				zoom={15}
				preferCanvas={true}
				scrollWheelZoom={false}
				style={{ height: '250px', width: '100%' }}
			>
				<LocationMarker />
			</MapContainer>
			<div style={{ position: 'fixed', top: '500px', left: '10px' }}>
				<input
					type="text"
					placeholder="Road"
					value={road}
					onChange={(e) => setRoad(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Village"
					value={village}
					onChange={(e) => setVillage(e.target.value)}
				/>
				<select
					value={subdistrict}
					onChange={(e) => setSubdistrict(e.target.value)}
				>
					<option value="">Select a Subdistrict</option>
					{bandungSubdistricts.map((subdistrictName) => (
						<option key={subdistrictName} value={subdistrictName}>
							{subdistrictName}
						</option>
					))}
				</select>
				<input
					type="text"
					placeholder="City"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Post Code"
					value={postcode}
					onChange={(e) => setPostcode(e.target.value)}
				/>
				<button onClick={searchAddress}>Search</button>
			</div>
		</>
	)
}
