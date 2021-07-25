import React, { useState, useEffect } from 'react';
import { Polyline, Tooltip, LayersControl, LayerGroup, Circle } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { getMarkerInfo } from "../Api";
import Modal from './Modal';
import GeometryUtil from 'leaflet-geometryutil'
import L from 'leaflet'
import ReactModal from 'react-modal';
import Marker from './Marker'

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
    return () => setMarkers([]);
	}, [])

	return (
    <>

      <MarkerClusterGroup>
        {markers.map((marker, index) => {
          return <Marker key={index} marker={marker} openModal={openModal} userLatLng={userLatLng} scoreHandler={props.scoreHandler} activateAll={props.activateAll}/>
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

      <LayersControl.Overlay name={`Show activation zones`}>
        <LayerGroup>
          {markers.map((marker, index) => {
            const markerLatLng = [marker.latitude, marker.longitude]
            return (
            <Circle 
              key={index}
              center={markerLatLng}
              radius={20}
              color={'#b9242e'}
              stroke={false}
            />
            )
          })}
        </LayerGroup>
      </LayersControl.Overlay>

      <Modal modalIsOpen={ modalIsOpen } closeModal={ closeModal } content={ modalContent } markerId={ modalMarkerId }/>
    </>
	)
}

export default Markers