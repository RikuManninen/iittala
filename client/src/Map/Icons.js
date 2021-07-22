import L from 'leaflet'
import marker from "./svg/marker.svg";
import markerVisited from "./svg/markerVisited.svg";
import markerNear from "./svg/markerNear.svg";
import user from "./svg/user.svg";
import userCompass from './svg/userCompass.svg'

export const iconMarker = L.icon({
	iconUrl: marker,
	iconSize: [28, 42],
	iconAnchor: [14, 42],
	popupAnchor: [0, -44],
});

export const iconMarkerVisited = L.icon({
	iconUrl: markerVisited,
	iconSize: [28, 42],
	iconAnchor: [14, 42],
	popupAnchor: [0, -44],
});

export const iconMarkerNear = L.icon({
	iconUrl: markerNear,
	iconSize: [28, 42],
	iconAnchor: [14, 42],
	popupAnchor: [0, -44],
});

export const iconUser = L.icon({
	iconUrl: user,
	iconSize: [20, 20],
	iconAnchor: [10, 10],
});

export const iconCompass = L.icon({
	iconUrl: userCompass,
	iconSize: [32, 32],
	iconAnchor: [16, 16],
});