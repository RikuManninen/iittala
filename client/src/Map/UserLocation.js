import { Marker, Circle } from "react-leaflet"
import { iconUser, iconCompass } from './Icons'
import { useRef, useEffect } from 'react'
import 'leaflet-rotatedmarker'

const UserLocation = (props) => {

  const compassMarker = useRef()

  useEffect(() => {
    props.alpha && compassMarker.current.setRotationAngle(-props.alpha)
  })

  return (
    props.coords ? (
      <div>
        <Circle
          center={[
            props.coords.latitude,
            props.coords.longitude,
          ]}
          radius={props.coords.accuracy}
          stroke={false}
        ></Circle>
        <Marker
          icon={iconUser}
          position={[
            props.coords.latitude,
            props.coords.longitude,
          ]}
          zIndexOffset={1000}
        >
        </Marker>
        {props.alpha && 
          <Marker
            icon={iconCompass}
            ref={compassMarker}
            position={[
              props.coords.latitude,
              props.coords.longitude,
            ]}
          >
          </Marker>
        }
      </div>
    ) : (null)
  )
}

export default UserLocation