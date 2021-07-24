import React, { useState } from "react";
import { MapContainer, TileLayer, LayersControl, Rectangle, LayerGroup } from "react-leaflet";
import { LocateControl } from "./LocateControlComponent";
import Markers from "./Markers";
import UserLocation from "./UserLocation";
import useGeolocation from "./useGeolocation";
import useCompass from './useCompass'
import L from 'leaflet'
import Score from "./Score";


const Map = () => {
  const location = useGeolocation()
  const compassAlpha = useCompass()

  const bounds = L.latLngBounds([[61.086739, 24.123656], [61.092388, 24.146800]])

  const [score, setScore] = useState(0)
  const scoreHandler = () => {
    setScore(score+1)
  }

	return (
		<>
			<MapContainer
				center={[61.089625, 24.134696]}
				zoom={15}
				scrollWheelZoom={true}
				attributionControl={false}
				maxBounds={bounds}
				maxBoundsViscosity={1.0}
				minZoom={14}
			>

				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

        <Score score={ score } />

				<LayersControl>

					<LayersControl.Overlay checked name={`Show markers`}>
						<LayerGroup>
							<Markers coords={ location.coordinates } scoreHandler={ scoreHandler } />
						</LayerGroup>
					</LayersControl.Overlay>

					<LayersControl.Overlay checked name={`Show user location`}>
						<UserLocation coords={ location.coordinates } alpha={ compassAlpha } />
					</LayersControl.Overlay>

					{location.loaded && bounds.contains([location.coordinates.latitude, location.coordinates.longitude]) && <LocateControl coords={ [location.coordinates.latitude, location.coordinates.longitude] } />}

					<LayersControl.Overlay name={`Show bounds`}>
						<Rectangle bounds={bounds} fill={false} />
					</LayersControl.Overlay>

				</LayersControl>

			</MapContainer>
		</>
	)
	
}

export default Map;
