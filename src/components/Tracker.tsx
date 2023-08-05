import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'
import { MonitoredVehicleJourney } from '../api/busTime'
import busTimeAPI from '../api/busTime'
import mapSettings from '../settings/map'
import drawBuses from '../indicators/drawBuses'
import drawUser from '../indicators/drawUser'
import drawBusRoutes from '../indicators/drawBusRoutes'
import drawBusStops from '../indicators/drawBusStops'
import 'leaflet/dist/leaflet.css'

interface Props {
  userPosition: LatLngTuple
}

// TO DO: refactor App to get data; pass as props to Tracker and Panel.
const Tracker = (props: Props) => {
  const { userPosition } = props
  const [busPositions, setBusPositions] = useState<MonitoredVehicleJourney[]>()

  const getBusPositions = () => {
    busTimeAPI
      .fetchBusesForAllRoutes()
      .then((buses: MonitoredVehicleJourney[]) => {
        setBusPositions(buses)
      })
  }

  useEffect(() => {
    getBusPositions()

    setInterval(() => {
      getBusPositions()
    }, 15000)
  }, [])

  return (
    <div className="map-container">
      <MapContainer
        center={mapSettings.center}
        zoom={mapSettings.zoom}
        zoomControl={false}
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <TileLayer
          attribution={mapSettings.attribution}
          url={mapSettings.tilesURL.dark}
        />
        {drawBusRoutes()}
        {drawBusStops()}
        {busPositions && drawBuses(busPositions)}
        {userPosition && drawUser(userPosition)}
      </MapContainer>
    </div>
  )
}

export default Tracker
