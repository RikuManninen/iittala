import React, { useState, useEffect } from 'react';
import { Marker, Polyline, Tooltip, LayersControl } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { getMarkerInfo } from "../Api";
import Modal from './Modal';
import { iconMarker, iconMarkerNear, iconMarkerVisited } from './Icons'
import { Route, BrowserRouter as Router } from "react-router-dom";
import GeometryUtil from 'leaflet-geometryutil'
import L from 'leaflet'
import ReactModal from 'react-modal';

const Markers = (props) => {
	const [markers, setMarkers] = useState([]);

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState("");
	const [modalMarkerId, setModalMarkerId] = useState("");

	const userLatLng = [props.coords.latitude, props.coords.longitude];

	const openModal = (content, id) => {
		setModalIsOpen(true);
		setModalContent(content);
		setModalMarkerId(id);
	}
	const closeModal = () => setModalIsOpen(false);

	useEffect(() => {
		const fetchData = async () => {
			const markers = await getMarkerInfo();
			setMarkers(markers);
		}
		fetchData();
    ReactModal.setAppElement('body');
	}, [])

	return (
    <LayersControl>
      <MarkerClusterGroup>
        {markers.map((marker, index) => {
          const markerLatLng = [marker.latitude, marker.longitude]
          const distance = GeometryUtil.length(L.polyline([markerLatLng, userLatLng]))
          return (
            <div key={index}>
              <Marker
                position={markerLatLng}
                icon={
                  distance > 20 || !distance ? (
                    iconMarker
                  ):(
                    iconMarkerNear
                  )
                }
                eventHandlers={{
                  click: (e) => {
                    e.target.options.icon = iconMarkerVisited
                    openModal(marker.content, marker.id)
                  },
                }}
              ></Marker>
              <Router>
                <Route exact path={'/'+index} render={() => {
                  openModal(marker.content)
                }}/>
              </Router>
              <LayersControl.Overlay name={"Distance to marker " + (index+1)}>
                <Polyline color="red" positions={[userLatLng, markerLatLng]}>
                  <Tooltip sticky>
                    {'Distance ' + distance + ' meters.'}
                  </Tooltip>
                </Polyline>
              </LayersControl.Overlay>
            </div>
          );
        })}
      </MarkerClusterGroup>
      <Modal modalIsOpen={ modalIsOpen } closeModal={ closeModal } content={ modalContent } markerId={ modalMarkerId }/>
    </LayersControl>
	)
}

export default Markers