import { Marker, Circle } from "react-leaflet"
import { iconUser } from './Icons'

const UserLocation = (props) => {
  return (
    props.coords ? (
      <div>
        <Marker
          icon={iconUser}
          position={[
            props.coords.latitude,
            props.coords.longitude,
          ]}
        >
        </Marker>
        <Circle
          center={[
            props.coords.latitude,
            props.coords.longitude,
          ]}
          radius={props.coords.accuracy}
          stroke={false}
        ></Circle>
      </div>
    ) : (null)
  )
}

export default UserLocation