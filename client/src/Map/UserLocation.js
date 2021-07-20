import { Marker, Circle } from "react-leaflet"
import { iconUser, iconCompass } from './Icons'
import { useRef, useEffect } from 'react'
import 'leaflet-rotatedmarker'
import { LayersControl } from "react-leaflet"

const UserLocation = (props) => {

  const compassMarker = useRef()

  useEffect(() => {
    props.alpha && compassMarker.current.setRotationAngle(-props.alpha)
  })

  return (
    props.coords ? (
      <div>
        <LayersControl.Overlay checked name={"Show accuracy"}>
          <Circle
            center={[
              props.coords.latitude,
              props.coords.longitude,
            ]}
            radius={props.coords.accuracy}
            stroke={false}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name={"Show geolocation"}>
          <Marker
            icon={iconUser}
            position={[
              props.coords.latitude,
              props.coords.longitude,
            ]}
            zIndexOffset={1000}
          />
        </LayersControl.Overlay>
        {props.alpha && 
          <LayersControl.Overlay checked name={"Show compass"}>
            <Marker
              icon={iconCompass}
              ref={compassMarker}
              position={[
                props.coords.latitude,
                props.coords.longitude,
              ]}
            />
          </LayersControl.Overlay>
        }
      </div>
    ) : (null)
  )
}

export default UserLocation