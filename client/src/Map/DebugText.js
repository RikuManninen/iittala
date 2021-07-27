const DebugText = (props) => {
  const location = props.location

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

    </div>
  )
}

export default DebugText