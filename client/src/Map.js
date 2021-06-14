import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./App.css";

const position = [61.089, 24.12884]

class Map extends Component {
    render() {
        return(
            <MapContainer center={position} zoom={20} scrollWheelZoom={true}>
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
            <h3>User location: { lat + ', ' + long }</h3>
            <h4>Accuracy: { coords?.accuracy }</h4>
            <Map />
        </div>
    ) : (
        <div>
            <h4>Location permission is not enabled</h4>
            <Map />
        </div>
    ) 
}