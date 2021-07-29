import { useRef, useMemo, useState } from "react";
import { Marker } from "react-leaflet";
import { iconMarkerDraggable } from "./Icons";

const center = [61.089625, 24.134696]

const FakeLocation = (props) => {
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          props.locationHandler({
            loaded: true,
            coordinates: {
              latitude: marker.getLatLng().lat,
              longitude: marker.getLatLng().lng,
              accuracy: 20,
            },
          })
        }
      },
    }),
    [],
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      zIndexOffset={1200}
      icon={iconMarkerDraggable}
      >
    </Marker>
  )
}

export default FakeLocation