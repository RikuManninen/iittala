import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { LocateControl } from "./LocateControlComponent";
import Markers from "./Markers";
import UserLocation from "./UserLocation";
import DebugText from './DebugText';
import useGeolocation from "./useGeolocation";
import useDeviceOrientation from 'react-hook-device-orientation'
import useCompass from './useCompass'

const Map = () => {
  const location = useGeolocation()
  const deviceOrientation = useDeviceOrientation()
  const compassAlpha = useCompass()

	return (
		<>
			<MapContainer
				center={[61.089, 24.12884]}
				zoom={17}
				scrollWheelZoom={true}
				attributionControl={false}
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
