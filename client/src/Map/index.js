import React, { useState } from "react";
import { MapContainer, TileLayer, LayersControl, Rectangle, LayerGroup, MapConsumer } from "react-leaflet";
import { LocateControl } from "./LocateControlComponent";
import Markers from "./Markers";
import UserLocation from "./UserLocation";
import useGeolocation from "./useGeolocation";
import useCompass from './useCompass'
import L, { map } from 'leaflet'
import Score from "./Score";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const Map = () => {
  const location = useGeolocation()
  const compassAlpha = useCompass()

  const [activateAll, setActivateAll] = useState(false)
  const [disableBounds, setDisableBounds] = useState(false)

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

        <LayersControl>

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
        
        {location.loaded && bounds.contains([location.coordinates.latitude, location.coordinates.longitude]) && <LocateControl coords={ [location.coordinates.latitude, location.coordinates.longitude] } />}

			</MapContainer>
      <button href="#" onClick={ setActivateAll } >activate all markers</button>
      <button href="#" onClick={ setDisableBounds } >disable bounds</button>
      {/*}
      <button href="#" onClick={ setActivateAll } style={{margin:'.25em'}}>show debug info</button>
      <button href="#" onClick={ setActivateAll } style={{margin:'.25em'}}>use fake location</button>
      {*/}
		</>
	)
	
}

export default Map;
