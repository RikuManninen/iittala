import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { LocateControl } from "./LocateControlComponent";
import Markers from "./Markers";
import UserLocation from "./UserLocation";
import DebugText from './DebugText';
import useGeolocation from "./useGeolocation";
import useDeviceOrientation from 'react-hook-device-orientation'
import useCompass from './useCompass'
import L from 'leaflet'

const Map = () => {
  const location = useGeolocation()
  const deviceOrientation = useDeviceOrientation()
  const compassAlpha = useCompass()

	return (
		<>
			<MapContainer
				center={[61.089625, 24.134696]}
				zoom={15}
				scrollWheelZoom={true}
				attributionControl={false}
				maxBounds={L.latLngBounds([[61.086739, 24.123656], [61.092388, 24.146800]])}
				maxBoundsViscosity={1.0}
				minZoom={14}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

        <Markers coords={ location.coordinates } />
        <UserLocation coords={ location.coordinates } alpha={ compassAlpha } />
        {location.loaded && <LocateControl coords={ [location.coordinates.latitude, location.coordinates.longitude] } />}

        <DebugText location={ location } orientation={ deviceOrientation } />

			</MapContainer>
		</>
	)
	
}

export default Map;
