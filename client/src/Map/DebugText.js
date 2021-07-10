const DebugText = (props) => {
  const location = props.location
  const orientation = props.orientation

  return (
    <div className="debug-text-container">
      
      <h1 className="debug-text">Geolocation: </h1>
      {location.coordinates ?
        <>
          <p className="debug-text">Coordinates: ({location.coordinates.latitude},{" "}{location.coordinates.longitude})</p>
          <p className="debug-text">Accuracy: {location.coordinates.accuracy}</p>
          {location.coordinates.heading && <p className="debug-text">Heading: {location.coordinates.heading}</p>}
          {location.coordinates.speed && <p className="debug-text">Speed: {location.coordinates.speed}</p>}
        </>
      : <p className="debug-text-warning">No geolocation data available</p>}

      <h1 className="debug-text">Device orientation: </h1>
      {orientation.alpha ? <p className="debug-text">Alpha: {orientation.alpha}</p> : <p className="debug-text-warning">No orientation data available</p>}
      {orientation.beta && <p className="debug-text">Beta: {orientation.beta}</p>}
      {orientation.gamma && <p className="debug-text">Gamma: {orientation.gamma}</p>}
      {orientation.absolute && <p className="debug-text">Absolute: {orientation.absolute ? 'yes' : 'no'}</p>}

    </div>
  )
}

export default DebugText