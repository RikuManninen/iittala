import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const position = [61.089, 24.12884]

export default class Map extends Component {
    render() {
        return(
            <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
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
        )
    }
}