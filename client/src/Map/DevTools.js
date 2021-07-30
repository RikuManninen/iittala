import './DevTools.scss'

const DevTools = (props) => {

  const setActivateAll = props.setActivateAll
  const setDisableBounds = props.setDisableBounds
  const setShowDebugInfo = props.setShowDebugInfo
  const setUseFakeLocation = props.setUseFakeLocation

  return (
    <div className="dev-tools">
      <button href="#" onClick={ setActivateAll }><p>activate all markers</p></button>
      <button href="#" onClick={ setDisableBounds }><p>disable bounds</p></button>
      <button href="#" onClick={ setShowDebugInfo }><p>show location info</p></button>
      <button href="#" onClick={ setUseFakeLocation }><p>use fake location</p></button>
    </div>
  )
}

export default DevTools