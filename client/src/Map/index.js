import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LocateControl } from "./LocateControlComponent";
import Markers from "./Markers";
import UserLocation from "./UserLocation";
import useGeolocation from "./useGeolocation";

const Map = () => {
  const location = useGeolocation()

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
        <UserLocation coords={ location.coordinates } />
        {location.loaded && <LocateControl coords={ [location.coordinates.latitude, location.coordinates.longitude] } />}

			</MapContainer>

      <div className="debug-text-container">
        {location.coordinates ? (
          <div>
            <p className="debug-text">
                coordinates: ({location.coordinates.latitude},{" "}
                {location.coordinates.longitude})
            </p>
            <p className="debug-text">
                {" "}
                accuracy: {location.coordinates.accuracy}
            </p>
            {location.coordinates.heading && (
              <p className="debug-text">
                {" "}
                heading: {location.coordinates.heading}
              </p>
            )}
            {location.coordinates.speed && (
              <p className="debug-text">
                {" "}
                speed: {location.coordinates.speed}
              </p>
            )}
          </div>
        ) : (
          <p className="debug-text">
            Getting the location data&hellip;{" "}
          </p>
        )}
      </div>
		</>
	)
	
}

export default Map;
