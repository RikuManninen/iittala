import L from 'leaflet'
import marker from "./svg/marker.svg";
import markerVisited from "./svg/markerVisited.svg";
import markerNear from "./svg/markerNear.svg";
import user from "./svg/user.svg";

export const iconMarker = L.icon({
	iconUrl: marker,
	iconSize: [28, 42],
	iconAnchor: [14, 42],
});

export const iconMarkerVisited = L.icon({
	iconUrl: markerVisited,
	iconSize: [28, 42],
	iconAnchor: [14, 42],
});

export const iconMarkerNear = L.icon({
	iconUrl: markerNear,
	iconSize: [28, 42],
	iconAnchor: [14, 42],
});

export const iconUser = L.icon({
	iconUrl: user,
	iconSize: [16, 16],
	iconAnchor: [8, 8],
});