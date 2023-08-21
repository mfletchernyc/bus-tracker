import { LatLngTuple } from 'leaflet'
import { MonitoredVehicleJourney } from '../api/busTimeRoute'
import '../styles/Panel.css'

interface Props {
  buses: MonitoredVehicleJourney[] | undefined
  timestamp: string
  userPosition: LatLngTuple
  userPositionAccuracy: number
}

const trimVehicleRef = (ref: string) => ref.split('_')[1]

const Panel = (props: Props) => {
  const { buses, userPosition, timestamp, userPositionAccuracy } = props

  const getTimestamp = () => (
    <p>
      {
        timestamp
          ? `Bus data last fetched at ${timestamp}.`
          : 'Error fetching timestamp.'
      }
    </p>
  )
  
  const getBusInfo = () => (
    <p className="bus-data">
      {
        buses
          ? buses.map((bus: MonitoredVehicleJourney, i) => {
            return (
              <span key={i}>
                🚌 → {bus.PublishedLineName} #{trimVehicleRef(bus.VehicleRef)}
                {' '}
                [{bus.VehicleLocation.Latitude.toFixed(4)}, {bus.VehicleLocation.Longitude.toFixed(4)}]
                {' '}
                bearing: {bus.Bearing}
              </span>
            )
          })
        : 'Error fetching bus data.'
      }
    </p>
  )

  const getUserPosition = () => (
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
        {getTimestamp()}
        {getUserPosition()}
        {getBusInfo()}
      </div>
    </div>
  )
}

export default Panel
