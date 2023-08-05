import { LatLngTuple } from 'leaflet'
import { MonitoredVehicleJourney } from '../api/busTime'
import '../styles/Panel.css'

interface Props {
  buses: MonitoredVehicleJourney[] | undefined
  userPosition: LatLngTuple
  userPositionAccuracy: number
}

const Panel = (props: Props) => {
  const { buses, userPosition, userPositionAccuracy } = props
  const trimVehicleRef = (ref: string) => ref.split('_')[1]
  
  const getBusInfo = () => (
    buses && buses.map((bus: MonitoredVehicleJourney, i) => {
      return (
        <span key={i}>
          🚌 → {bus.PublishedLineName} #{trimVehicleRef(bus.VehicleRef)}
          {' '}
          [{bus.VehicleLocation.Latitude.toFixed(4)}, {bus.VehicleLocation.Longitude.toFixed(4)}]
          {' '}
          bearing: ${bus.Bearing}
        </span>
      )
    })
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
        {getUserPosition()}
        <p className="bus-data">
          {getBusInfo()}
        </p>
      </div>
    </div>
  )
}

export default Panel
