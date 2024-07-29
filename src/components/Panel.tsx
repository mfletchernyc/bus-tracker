import ThemeButton from './ThemeButton'
import BusIcon from '../icons/BusIcon'
import NullIcon from '../icons/NullIcon'
import routeSettings from '../settings/busRoutes'
import stopSettings from '../settings/busStops'
import time from '../utilities/convertISO8601ToTime'
import { toggleStop } from '../utilities/togglePanelStops'
import { BusesForAllStops, StopData } from '../types'
import '../styles/Panel.css'

interface Props {
  stops: BusesForAllStops | undefined
  timestamp: string
  toggleTheme: () => void
  userPositionAccuracy: number
}

const trimVehicleRef = (ref: string) => ref.split('_')[1]

const Panel = (props: Props) => {
  const { stops, timestamp, toggleTheme, userPositionAccuracy } = props

  const renderTimestamp = () => (
    <span>{timestamp ? `Bus data fetched at ${timestamp}.` : 'Error fetching timestamp.'}</span>
  )

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
        <section id={stopId} key={`section${i}`}>
          <p className="stop-header" key={`header${i}`} onClick={() => toggleStop(stopId)}>
            {stopSettings[stopId]?.name}{' '}
            <span>
              ({stopSettings[stopId]?.route} #{stopId})
            </span>
          </p>

          <div className="stops-animation">
            <div className="stops">
              {stops?.[stopId] ? (
                stops[stopId].map((stop: StopData, i: number) => (
                  <span key={`bus${i}`}>
                    <BusIcon color={`${routeSettings[stop.PublishedLineName[0]].color}`} /> →{' '}
                    {getFormattedStopData(stop)}
                  </span>
                ))
              ) : (
                <span>
                  <NullIcon color="#cc0000" /> → No buses en route to this stop.
                </span>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  )

  const renderUserPosition = () => <span>User +/- {userPositionAccuracy.toFixed(1)} meters.</span>

  return (
    <div className="panel-container">
      <div className="panel">
        <h1>bus-tracker</h1>
        <p>
          {renderTimestamp()} {renderUserPosition()}
        </p>
        {stops ? renderBusesForStops() : <p>Waiting for bus data...</p>}
      </div>
      <ThemeButton onClick={() => toggleTheme()} />
    </div>
  )
}

export default Panel
