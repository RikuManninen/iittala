import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';

const position = [61.089, 24.12884]

function App() {
  return (
    <MapContainer center={position} zoom={20} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Iittala Village
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
