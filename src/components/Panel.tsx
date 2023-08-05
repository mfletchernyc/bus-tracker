interface Props {
  userPosition: LatLngTuple
  userPositionAccuracy: number
}

const Panel = (props: Props) => {
  const { userPosition, userPositionAccuracy } = props

  return (
    <div className="panel-container">
      <div className="panel">
        <h1>bus-tracker</h1>
        <p id="user-position">
          😐 → {userPosition[0].toFixed(4)}, {userPosition[1].toFixed(4)}
          {' '}
          (+/- {userPositionAccuracy.toFixed(1)} meters)
        </p>
      </div>
    </div>
  )
}

export default Panel
