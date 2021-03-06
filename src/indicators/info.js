import { useState } from 'react'
import uniqid from 'uniqid'
import time from '../destructurers/time'

const getStopInfo = (stopData) => {
  const stops = []
  let timestamp = 'unknown'

  Object.values(stopData).forEach((dataPoint) => {
    const { buses, color, name } = dataPoint
    timestamp = dataPoint.timestamp

    stops.push({ buses, color, name })
  })

  return { stops, timestamp }
}

const getStatus = (arrival) => {
  const {
    status, eta, departure, terminal
  } = arrival
  let markup = ''

  if (terminal) {
    // MTA data gets weird sometimes.
    const departs = departure || terminal
    markup = `At terminal. Departs ${time(departs)}.`
  } else {
    const arrives = eta ? time(eta) : 'unknown'
    markup = `${status} (ETA ${arrives}).`
  }

  return markup
}

const generateArrivals = (stops) => (
  stops.map((stop) => (
    <section key={uniqid()}>
      <h2 style={{ background: stop.color }}>{stop.name}</h2>
      {
        stop.buses.length === 0
          ? 'No buses scheduled for this stop.'
          : stop.buses.map((bus) => {
            const { line, arrival } = bus

            return (
              <p key={uniqid()}>
                <strong>{line}</strong>: {getStatus(arrival)}
              </p>
            )
          })
      }
    </section>
  ))
)

const drawToggle = (stopData) => (
  stopData.map((stop) => (
    <div
      className="stripe"
      key={uniqid()}
      style={{ background: stop.color }}
    />
  ))
)

const showInfo = (stopData) => {
  const [panel, setPanel] = useState(true)
  const stopInfo = getStopInfo(stopData)

  return (
    <>
      <button
        className={`panel leaflet-control ${panel && 'visible'}`}
        onMouseDown={() => setPanel(false)}
        type="button"
      >
        { generateArrivals(stopInfo.stops) }
        <em>Latest data fetched at {stopInfo.timestamp}.</em>
      </button>

      <button
        className={`toggle leaflet-control ${panel && 'hidden'}`}
        onMouseDown={() => setPanel(true)}
        type="button"
      >
        { drawToggle(stopData) }
      </button>
    </>
  )
}

export default showInfo
