import { LatLngTuple } from 'leaflet'
import stopSettings from '../settings/busStops'
// import time from '../utilities/convertISO8601ToTime'
import '../styles/Panel.css'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stops: any
  timestamp: string
  userPosition: LatLngTuple
  userPositionAccuracy: number
}

const trimVehicleRef = (ref: string) => ref.split('_')[1]

const Panel = (props: Props) => {
  const {stops, timestamp, userPosition, userPositionAccuracy } = props

  console.log('Panel: stops ->', stops)

  const renderTimestamp = () => (
    <p>
      {
        timestamp
          ? `Bus data last fetched at ${timestamp}.`
          : 'Error fetching timestamp.'
      }
    </p>
  )

  /*
    status: MonitoredCall.ArrivalProximityText,
    eta: MonitoredCall.ExpectedArrivalTime,
    departure: MonitoredCall.ExpectedDepartureTime,
    terminal: OriginAimedDepartureTime
  */

  const renderBusesForStops = () => (
    <div className="stop-data">
      {
        Object.keys(stopSettings).map((stopId, i) =>
          <>
            <p className="stop-header" key={`header${i}`}>
              {stopSettings[stopId]?.name} [{stopSettings[stopId]?.route}]
            </p>

            {
              stops[stopId]
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  stops[stopId].map((stop: any, i: number) =>
                    <span key={`bus${i}`}>
                      🚌 → {stop.PublishedLineName[0]} ({trimVehicleRef(stop.VehicleRef)}):
                      {' '}
                      {
                        // MTA data gets weird sometimes.
                        stop.OriginAimedDepartureTime
                        ? `At terminal. Departs ${stop.MonitoredCall.ExpectedDepartureTime || stop.OriginAimedDepartureTime}`
                        : `
                          ${stop.MonitoredCall?.ArrivalProximityText}
                            (ETA ${stop.MonitoredCall.ExpectedArrivalTime || 'unkown'})
                        `
                      }
                    </span>
                  )
                : `🚫 No buses found for stop ${stopId}.`
            }
          </>
        )
      }
    </div>
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
        <p>To do: theme, tests, variable marker size, Prettier support.</p>
        {renderTimestamp()}
        {renderUserPosition()}
        {stops
          ? renderBusesForStops()
          : <p>Waiting for bus data...</p>
        }
      </div>
    </div>
  )
}

export default Panel
