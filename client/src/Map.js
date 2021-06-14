import React, { Component, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import useGeolocation from "react-navigator-geolocation";

const positions = 
[
    [[61.08900, 24.12884], "talo 1"], 
    [[61.08940, 24.12903], "talo 2"], 
    [[61.08990, 24.12870], "talo 3"], 
    [[61.08945, 24.12797], "talo 4"],
    [[61.08950, 24.12778], "parkkipaikka 1"],
    [[61.08878, 24.12820], "parkkipaikka 2"],
]

class Map extends Component {
    render() {
        return (
            <MapContainer center={ positions[0][0] } zoom={ 17 } scrollWheelZoom={ true }>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                positions.map((value, index) => {
                    return <Marker position={value[0]}><Popup>{value[1]}</Popup></Marker>
                })
                }
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