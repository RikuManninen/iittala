import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Tabs from "./Tabs"; 
import './App.css';


const position = [61.089, 24.12884]


const App3 = () => {
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
const App2 = () => {
  return (
  <Tabs> 
  <div label="Gator" > 
    See ya later, <em>Alligator</em>! 
  </div> 
  <div label="Croc"> 
    After 'while, <em>Crocodile</em>! 
  </div> 
</Tabs> 
 );
}




export {App3,App2,}