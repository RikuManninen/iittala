import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Circle, Polyline, LayersControl, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { geolocated } from "react-geolocated";
import ReactModal from "react-modal";
import marker from "./marker.svg"
import markerVisited from "./markerVisited.svg"
import user from "./user.svg"
import { LocateControl } from "./LocateControlComponent";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GeometryUtil from 'leaflet-geometryutil'

const iconMarker = L.icon({
    iconUrl: marker,
    iconSize: [28, 42],
    iconAnchor: [14, 42],
});

const iconMarkerVisited = L.icon({
    iconUrl: markerVisited,
    iconSize: [28, 42],
    iconAnchor: [14, 42],
});

const iconUser = L.icon({
    iconUrl: user,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            showModal: false,
            modalContent: "",
            markers: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal(modalContent) {
        this.setState({ showModal: true, modalContent: modalContent });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    componentDidMount() {
        ReactModal.setAppElement('body');

        // get marker data from marker api
        fetch("/api/markers/")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    markers: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { markers } = this.state;
        return (
            <div>
                <MapContainer
                    center={[61.089, 24.12884]}
                    zoom={17}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LayersControl position="topright">
                        <MarkerClusterGroup>
                            {markers.map((marker, index) => {
                                const markerLatLng = [marker.latitude, marker.longitude]
                                let distance = null
                                if(this.props.coords) {
                                    distance = GeometryUtil.length(L.polyline([[this.props.coords.latitude, this.props.coords.longitude], markerLatLng]))
                                }
                                return (
                                    <>
                                        <Marker
                                            key={index}
                                            position={markerLatLng}
                                            icon={iconMarker}
                                            eventHandlers={{
                                                click: (e) => {
                                                    this.handleOpenModal(marker.content);
                                                    e.target.options.icon = iconMarkerVisited
                                                },
                                            }}
                                        ></Marker>
                                        <Router>
                                            <Route exact path={'/'+index} render={() => {
                                                    alert(marker.content);
                                                }
                                            }/>
                                        </Router>
                                        <LayersControl.Overlay name={"Distance to marker " + (index+1)}>
                                            {this.props.coords && (
                                                <Polyline color="red" positions={[[this.props.coords.latitude, this.props.coords.longitude], markerLatLng]}>
                                                    <Tooltip sticky>
                                                        {'Distance: ' + distance + ' meters'}
                                                    </Tooltip>
                                                </Polyline>
                                            )}
                                        </LayersControl.Overlay>
                                    </>
                                );
                            })}
                        </MarkerClusterGroup>
                    </LayersControl>

                    {this.props.coords && (
                        <div>
                            <Marker
                                icon={iconUser}
                                position={[
                                    this.props.coords.latitude,
                                    this.props.coords.longitude,
                                ]}
                            >
                            </Marker>
                            <Circle
                                center={[
                                    this.props.coords.latitude,
                                    this.props.coords.longitude,
                                ]}
                                radius={this.props.coords.accuracy}
                                stroke={false}
                            ></Circle>
                        </div>
                    )}

                    <LocateControl />

                </MapContainer>
                <div className="debug-text-container">
                    {!this.props.isGeolocationAvailable ? (
                        <p className="debug-text-warning">
                            Your browser does not support Geolocation
                        </p>
                    ) : !this.props.isGeolocationEnabled ? (
                        <p className="debug-text-warning">
                            Location permission is not enabled
                        </p>
                    ) : this.props.coords ? (
                        <div>
                            <h3 className="debug-text">
                                Geolocation has been enabled
                            </h3>
                            <p className="debug-text">
                                coordinates: ({this.props.coords.latitude},{" "}
                                {this.props.coords.longitude})
                            </p>
                            <p className="debug-text">
                                {" "}
                                accuracy: {this.props.coords.accuracy}
                            </p>
                            {this.props.coords.heading && (
                                <p className="debug-text">
                                    {" "}
                                    heading: {this.props.coords.heading}
                                </p>
                            )}
                            {this.props.coords.speed && (
                                <p className="debug-text">
                                    {" "}
                                    speed: {this.props.coords.speed}
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="debug-text">
                            Getting the location data&hellip;{" "}
                        </p>
                    )}
                </div>
                <div>
                    <ReactModal
                        isOpen={this.state.showModal}
                        className="modal"
                        overlayClassName="modal-container"
                    >
                        <div dangerouslySetInnerHTML={{__html: this.state.modalContent}} />
                        <button onClick={this.handleCloseModal}><ArrowBackIcon/></button>
                    </ReactModal>
                </div>
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    watchPosition: true,
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    geolocationProvider: navigator.geolocation,
    isOptimisticGeolocationEnabled: true,
})(Map);
