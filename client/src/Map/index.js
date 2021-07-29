import React, { useState } from "react";
import { MapContainer, TileLayer, LayersControl, Rectangle, LayerGroup, MapConsumer } from "react-leaflet";
import { LocateControl } from "./LocateControlComponent";
import Markers from "./Markers";
import UserLocation from "./UserLocation";
import useGeolocation from "./useGeolocation";
import useCompass from './useCompass'
import L from 'leaflet'
import Score from "./Score";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import LocationInfo from "./LocationInfo";
import DevTools from "./DevTools";
import FakeLocation from "./FakeLocation";

const Map = (props) => {
  const geolocation = useGeolocation()
  const compassAlpha = useCompass()

  const [location, setLocation] = useState({
    loaded: true,
    coordinates: {
      latitude: 0,
      longitude: 0,
      accuracy: 100,
    },
  })

  const activateDevTools = props.activateDevTools
  const [activateAll, setActivateAll] = useState(false)
  const [disableBounds, setDisableBounds] = useState(false)
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const [useFakeLocation, setUseFakeLocation] = useState(true)

  const handleLocation = (fakeLocation) => {
    setLocation(!useFakeLocation ? geolocation : fakeLocation)
    console.log(location)
  }

  const bounds = L.latLngBounds([[61.086739, 24.123656], [61.092388, 24.146800]])

  const [score, setScore] = useState(0)
  const scoreHandler = () => {
    setScore(score+1)
  }

	return (
		<>
      <ReactNotification />
			<MapContainer
				center={[61.089625, 24.134696]}
				zoom={15}
				scrollWheelZoom={true}
				attributionControl={false}
				maxBounds={bounds}
				maxBoundsViscosity={.5}
				minZoom={14}
			>

        <MapConsumer>
          {(map) => {
            if(disableBounds) {
              map.setMaxBounds(null)
              return null
            }
            return null
          }}
        </MapConsumer>

				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

        <Score score={ score } />

        <LayersControl position="bottomright">

					<LayersControl.Overlay checked name={`Show markers`}>
						<LayerGroup>
							<Markers coords={ location.coordinates } scoreHandler={ scoreHandler } activateAll={ activateAll }/>
						</LayerGroup>
					</LayersControl.Overlay>

					<LayersControl.Overlay checked name={`Show user location`}>
						<UserLocation coords={ location.coordinates } alpha={ compassAlpha } />
					</LayersControl.Overlay>

					<LayersControl.Overlay name={`Show bounds`}>
						<Rectangle bounds={bounds} fill={false} />
					</LayersControl.Overlay>
        </LayersControl>

        <FakeLocation locationHandler={ handleLocation }/>
        
        {location.loaded && bounds.contains([location.coordinates.latitude, location.coordinates.longitude]) && <LocateControl coords={ [location.coordinates.latitude, location.coordinates.longitude] } />}

        {showDebugInfo && <LocationInfo location={ location } />}

        {activateDevTools && <DevTools setActivateAll={ setActivateAll } setDisableBounds={ setDisableBounds } setShowDebugInfo={ setShowDebugInfo } setUseFakeLocation={ setUseFakeLocation } />}

			</MapContainer>

      
		</>
	)
	
}

export default Map;
