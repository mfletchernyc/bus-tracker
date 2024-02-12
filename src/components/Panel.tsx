import { LatLngTuple } from 'leaflet'
import stopSettings from '../settings/busStops'
import time from '../utilities/convertISO8601ToTime'
import { BusesForAllStops, StopData } from '../types'
import '../styles/Panel.css'

interface Props {
  stops: BusesForAllStops | undefined
  timestamp: string
  userPosition: LatLngTuple
  userPositionAccuracy: number
}

const trimVehicleRef = (ref: string) => ref.split('_')[1]

const Panel = (props: Props) => {
  const { stops, timestamp, userPosition, userPositionAccuracy } = props

  const renderTimestamp = () => (
    <p>{timestamp ? `Bus data last fetched at ${timestamp}.` : 'Error fetching timestamp.'}</p>
  )

  /*
    status: MonitoredCall.ArrivalProximityText,
    eta: MonitoredCall.ExpectedArrivalTime,
    departure: MonitoredCall.ExpectedDepartureTime,
    terminal: OriginAimedDepartureTime
  */

  const getFormattedStopData = (stop: StopData) => {
    let markup = `${stop.PublishedLineName[0]} (${trimVehicleRef(stop.VehicleRef)}) `

    // MTA data gets weird sometimes.
    if (stop.OriginAimedDepartureTime) {
      const departureTime = stop.MonitoredCall.ExpectedDepartureTime || stop.OriginAimedDepartureTime

      markup += `At terminal. Departs ${time(departureTime)}.`
    } else {
      const status = stop.MonitoredCall.ArrivalProximityText
      const arrivalTime = stop.MonitoredCall?.ExpectedArrivalTime
      const eta = arrivalTime ? time(arrivalTime) : 'unknown'

      markup += `${status} (ETA ${eta}).`
    }

    return markup
  }

  const renderBusesForStops = () => (
    <div className="stop-data">
      {Object.keys(stopSettings).map((stopId, i) => (
        <section key={`section${i}`}>
          <p className="stop-header" key={`header${i}`}>
            {stopSettings[stopId]?.name} ({stopSettings[stopId]?.route})
          </p>

          {stops?.[stopId] ? (
            stops[stopId].map((stop: StopData, i: number) => (
              <span key={`bus${i}`}>🚌 → {getFormattedStopData(stop)}</span>
            ))
          ) : (
            <span>🚫 No buses en route to this stop.</span>
          )}
        </section>
      ))}
    </div>
  )

  const renderUserPosition = () => (
    <p>
      😐 → {userPosition[0].toFixed(4)}, {userPosition[1].toFixed(4)} (+/- {userPositionAccuracy.toFixed(1)} meters)
    </p>
  )

  return (
    <div className="panel-container">
      <div className="panel">
        <h1>bus-tracker</h1>
        {renderTimestamp()}
        {renderUserPosition()}
        {stops ? renderBusesForStops() : <p>Waiting for bus data...</p>}
      </div>
    </div>
  )
}

export default Panel
