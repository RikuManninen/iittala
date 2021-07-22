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

  const resetMarker = () => {
    !hasVisitedMarker && setMarkerIcon(iconMarker)
  }

  const activateMarker = () => {
    setMarkerIsActive(true)
    setMarkerIcon(iconMarkerNear)
  }

  const hasVisitedMarker = () => {
    setMarkerIsVisited(true)
    setMarkerIcon(iconMarkerVisited)
  }

  useEffect(() => {
    distance <= 20 ? ( markerIsVisited ? hasVisitedMarker() : activateMarker() ) : resetMarker()
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
        {!markerIsActive && <Popup>Marker is not active</Popup>}
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