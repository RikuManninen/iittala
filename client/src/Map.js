import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { geolocated } from "react-geolocated";
import ReactModal from "react-modal";

const positions = [
    [[61.089, 24.12884], "talo 1"],
    [[61.0894, 24.12903], "talo 2"],
    [[61.0899, 24.1287], "talo 3"],
    [[61.0895, 24.12778], "parkkipaikka 1"],
    [[61.08878, 24.1282], "parkkipaikka 2"],
];

const props = {};
class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            contentLabel: "",
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal(contentLabel) {
        this.setState({ showModal: true, contentLabel: contentLabel });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    render() {
        return (
            <div>
                <MapContainer
                    center={positions[0][0]}
                    zoom={17}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup>
                        {positions.map((value, index) => {
                            return (
                                <Marker
                                    key={index}
                                    position={value[0]}
                                    eventHandlers={{
                                        click: (e) => {
                                            this.handleOpenModal(value[1]);
                                        },
                                    }}
                                ></Marker>
                            );
                        })}
                    </MarkerClusterGroup>

                    {this.props.coords && (
                        <div>
                            <Marker
                                position={[
                                    this.props.coords.latitude,
                                    this.props.coords.longitude,
                                ]}
                            >
                                <Popup>
                                    You are within {this.props.coords.accuracy}{" "}
                                    meters from this point
                                </Popup>
                            </Marker>
                            <Circle
                                center={[
                                    this.props.coords.latitude,
                                    this.props.coords.longitude,
                                ]}
                                radius={this.props.coords.accuracy}
                            ></Circle>
                        </div>
                    )}
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
                        contentLabel={this.state.contentLabel}
                        className="modal"
                        overlayClassName="modal-container"
                    >
                        <button onClick={this.handleCloseModal}>x</button>
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
