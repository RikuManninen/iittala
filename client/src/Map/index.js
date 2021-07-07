import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, Polyline, LayersControl, Tooltip } from "react-leaflet";
import { LocateControl } from "./LocateControlComponent";
import GeometryUtil from 'leaflet-geometryutil'
import Markers from "./Markers";

const Map = () => {

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
				<Markers />
				<LocateControl />
			</MapContainer>
		</>
	)
	
}

export default Map;
