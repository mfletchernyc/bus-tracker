import { LatLngTuple } from 'leaflet'
import { MonitoredVehicleJourneyStop} from '../types'
import '../styles/Panel.css'

interface Props {
  stops: MonitoredVehicleJourneyStop[] | undefined
  timestamp: string
  userPosition: LatLngTuple
  userPositionAccuracy: number
}

// const trimVehicleRef = (ref: string) => ref.split('_')[1]

const Panel = (props: Props) => {
  const { stops, timestamp, userPosition, userPositionAccuracy } = props

  const renderTimestamp = () => (
    <p>
      {
        timestamp
          ? `Bus data last fetched at ${timestamp}.`
          : 'Error fetching timestamp.'
      }
    </p>
  )

  const renderBusesForStops = () => (
    <p className="bus-data">
      {
        stops
          ? stops.map((stop, i) => {
            return (
              <span key={i}>
                🚌 → {stop.PublishedLineName} {stop.VehicleRef}
                </span>
            )})
          : 'Waiting for bus data...'
      }
    </p>
  )

  const renderUserPosition = () => (
    <p>
      😐 → {userPosition[0].toFixed(4)}, {userPosition[1].toFixed(4)}
      {' '}
      (+/- {userPositionAccuracy.toFixed(1)} meters)
    </p>
  )

  return (
    <div className="panel-container">
      <div className="panel">
        <h1>bus-tracker</h1>
        <p>To do: theme, tests, bus data for stops, Prettier support.</p>
        {renderTimestamp()}
        {renderUserPosition()}
        {renderBusesForStops()}
      </div>
    </div>
  )
}

export default Panel
