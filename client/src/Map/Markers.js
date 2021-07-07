import React, { useState, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { getMarkerInfo } from "../Api";
import Modal from './Modal';
import { iconMarker, iconMarkerVisited } from './Icons'
import { Route, BrowserRouter as Router } from "react-router-dom";

const Markers = () => {
	const [markers, setMarkers] = useState([]);

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState("");

	const openModal = (content) => {
		setModalIsOpen(true);
		setModalContent(content);
	}
	const closeModal = () => setModalIsOpen(false);

	useEffect(() => {
		const fetchData = async () => {
			const markers = await getMarkerInfo();
			setMarkers(markers);
		}
		fetchData();
	}, [])

	return (
		<>
			<MarkerClusterGroup>
				{markers.map((marker, index) => {
					const markerLatLng = [marker.latitude, marker.longitude]
					return (
						<>
							<Marker
								key={index}
								position={markerLatLng}
								icon={
									iconMarker
								}
								eventHandlers={{
									click: (e) => {
										e.target.options.icon = iconMarkerVisited
										openModal(marker.content)
									},
								}}
							></Marker>
							<Router>
								<Route exact path={'/'+index} render={() => {
									openModal(marker.content)
								}}/>
							</Router>
						</>
					);
				})}
			</MarkerClusterGroup>
			<Modal modalIsOpen={ modalIsOpen } closeModal={ closeModal } content={ modalContent }/>
		</>
	)
}

export default Markers