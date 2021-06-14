import React, { Component, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import useGeolocation from "react-navigator-geolocation";

const position = [61.089, 24.12884]

class Map extends Component {
    render() {
        return (
            <MapContainer center={ position } zoom={ 20 } scrollWheelZoom={ true }>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={ position }>
                    <Popup>
                        Iittala Village
                    </Popup>
                </Marker>
                <LocationMarker />
            </MapContainer>
        )
    }
}

function LocationMarker() {
    
    const [position, setPosition] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            setAccuracy(e.accuracy);
        });
    }, []);

    return position === null ? null : (
        <div>
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
            <Circle center={position} radius={accuracy}></Circle>
        </div>
    );
}

export default () => {
    const { isEnabled, coords } = useGeolocation();
    const lat = coords?.latitude;
    const long = coords?.longitude;
    return isEnabled ? (
        <div>
            <div className="debug-text-container">
                <p className="debug-text">User location: { lat + ', ' + long }</p>
                <p className="debug-text">Accuracy: { coords?.accuracy }</p>
            </div>
            <Map />
        </div>
    ) : (
        <div>
            <div className="debug-text-container">
                <p className="debug-text-warning">Location permission is not enabled</p>
            </div>
            <Map />
        </div>
    ) 
}