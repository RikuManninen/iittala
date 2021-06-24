import React, { useState, useCallback, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const center = [61.089, 24.12884]
const zoom = 17

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter())

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])
  return(<p>latitude: {position.lat.toFixed(6)} <br/> longitude: {position.lng.toFixed(6)}</p>)
}

const Map = (props) => {
  const { record, onChange } = props
  const [map, setMap] = useState(null)
  const markerPos = record.id ? [record.params.latitude, record.params.longitude] : center

  return (
    <div>{map ? <DisplayPosition map={map} /> : null}
      <MapContainer
        center={markerPos}
        zoom={zoom}
        scrollWheelZoom={true}
        whenCreated={setMap}
        style={{height: '400px', marginBottom: '3em'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div style={{
          height: '5px',
          width: '5px',
          background: 'red',
          position: 'absolute',
          display: 'block',
          zIndex: '999',
          top: '0',
          bottom: '0',
          right: '0',
          left: '0',
          margin: 'auto',
          borderRadius: '100%'}}>
        </div>
      </MapContainer>
    </div>
  )
}

export default Map