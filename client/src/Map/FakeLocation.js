import { useEffect } from "react";
import { useRef, useMemo, useState } from "react";
import { Marker } from "react-leaflet";
import { iconMarkerDraggable } from "./Icons";

const FakeLocation = (props) => {
  const center = [0, 0]
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const active = props.useFakeLocation
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

  useEffect(() => {
    props.locationHandler({
      loaded: true,
      coordinates: {
        latitude: position[0],
        longitude: position[1],
        accuracy: 20,
      },
    })
    active && setPosition([61.089625, 24.134696])
  }, [active])

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