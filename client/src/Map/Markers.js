import React, { useState, useEffect } from 'react';
import { Marker, Polyline, Tooltip, LayersControl, LayerGroup, Popup } from 'react-leaflet';
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
  const [modalOpenedWithUrl, setModalOpenedWithUrl] = useState(false);

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
    <>
      <MarkerClusterGroup>
        {markers.map((marker, index) => {
          const markerLatLng = [marker.latitude, marker.longitude]
          const distance = GeometryUtil.length(L.polyline([markerLatLng, userLatLng]))
          let isActive = false
          distance <= 20 && (isActive=true)
          return (
            <div key={index}>
              <Marker
                position={markerLatLng}
                icon={
                  isActive ? (
                    iconMarkerNear
                  ):(
                    iconMarker
                  )
                }
                eventHandlers={{
                  click: (e) => {
                    if (isActive) {
                      e.target.options.icon = iconMarkerVisited
                      openModal(marker.content, marker.id)
                    }
                  },
                }}
              >
              {!isActive && <Popup>Marker is not active</Popup>}
              </Marker>
              <Router>
                <Route exact path={'/' + marker.url} render={() => {
                  if (!modalOpenedWithUrl) { // detects if modal is opened with url
                    setModalOpenedWithUrl(true);
                    openModal(marker.content, marker.id)
                  }
                }}/>
              </Router>
            </div>
          );
        })}
      </MarkerClusterGroup>
      <LayersControl.Overlay name={`Show distances`}>
        <LayerGroup>
          {markers.map((marker, index) => {
            const markerLatLng = [marker.latitude, marker.longitude]
            const distance = GeometryUtil.length(L.polyline([markerLatLng, userLatLng]))
            return (
              <Polyline key={index} color="red" positions={[userLatLng, markerLatLng]}>
                <Tooltip sticky>
                  {'Distance ' + distance + ' meters.'}
                </Tooltip>
              </Polyline>
            )
          })}
        </LayerGroup>
      </LayersControl.Overlay>
      <Modal modalIsOpen={ modalIsOpen } closeModal={ closeModal } content={ modalContent } markerId={ modalMarkerId }/>
    </>
	)
}

export default Markers