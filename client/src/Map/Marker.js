import { useState, useEffect } from 'react'
import { Marker as LeafletMarker } from "react-leaflet";
import { iconMarker, iconMarkerNear, iconMarkerVisited } from './Icons'
import { Route, BrowserRouter as Router } from "react-router-dom";
import GeometryUtil from 'leaflet-geometryutil'
import L from 'leaflet'
import { store } from 'react-notifications-component';

const Marker = (props) => {

  const marker = props.marker
  const userLatLng = props.userLatLng
  const markerLatLng = [props.marker.latitude, props.marker.longitude]

  const [modalOpenedWithUrl, setModalOpenedWithUrl] = useState(false);
  const [markerIsActive, setMarkerIsActive] = useState(false);
  const [markerIsVisited, setMarkerIsVisited] = useState(false);
  const [markerIcon, setMarkerIcon] = useState(iconMarker)
  
  const distance = GeometryUtil.length(L.polyline([markerLatLng, userLatLng]))

  const activateMarker = () => {
    setMarkerIsActive(true)
    markerIsVisited ? setMarkerIcon(iconMarkerVisited) : setMarkerIcon(iconMarkerNear)
  }  
  
  const deactivateMarker = () => {
    setMarkerIsActive(false)
    markerIsVisited ? setMarkerIcon(iconMarkerVisited) : setMarkerIcon(iconMarker)
  }

  const hasVisitedMarker = () => {
    setMarkerIsVisited(true)
    !markerIsVisited && props.scoreHandler()
  }

  useEffect(() => {
    distance <= 20 ? activateMarker() : deactivateMarker()
  })

  return (
    <>
      <LeafletMarker
        position={markerLatLng}
        icon={markerIcon}
        eventHandlers={{
          click: (e) => {
            if (markerIsActive) {
              hasVisitedMarker()
              props.openModal(marker.content, marker.id)
            }
            else {
              store.addNotification({
                title: "This marker is not active",
                message: "You are not near enough to activate the marker",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                }
              });
            }
          },
        }}
      >
      </LeafletMarker>
      <Router>
        <Route exact path={'/' + marker.url} render={() => {
          if (!modalOpenedWithUrl) { // detects if modal is opened with url
            setModalOpenedWithUrl(true);
            props.openModal(marker.content, marker.id)
          }
        }}/>
      </Router>
    </>
  )
}

export default Marker