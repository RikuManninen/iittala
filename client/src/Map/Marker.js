import { useState, useEffect } from 'react'
import { Marker as LeafletMarker, Popup } from "react-leaflet";
import { iconMarker, iconMarkerNear, iconMarkerVisited } from './Icons'
import { Route, BrowserRouter as Router } from "react-router-dom";
import GeometryUtil from 'leaflet-geometryutil'
import L from 'leaflet'

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
          },
        }}
      >
        {!markerIsActive && <Popup>This marker is not active</Popup>}
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