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


const Tracker = () => {
  const [userPosition, setUserPosition] = useState<LatLngTuple>([0, 0])
  const [busPositions, setBusPositions] = useState<MonitoredVehicleJourney[]>()

  const locateAndPositionUser = () => {
    const doGeolocation = (position: GeolocationPosition) => {
      const coords = position.coords

      setUserPosition([coords.latitude, coords.longitude])

      // TO DO: move this to the (upcoming) settings/info page.
      console.log(`😐 -> ${[coords.latitude, coords.longitude]}`)
      console.log(`User position accuracy: +/-${coords.accuracy} meters.`)
    }

    navigator.geolocation.getCurrentPosition(doGeolocation)
  }

  const getBusPositions = () => {
    busTimeAPI
      .fetchBusesForAllRoutes()
      .then((buses: MonitoredVehicleJourney[]) => {
        setBusPositions(buses)
      })
  }

  useEffect(() => {
    getBusPositions()
    locateAndPositionUser()

    setInterval(() => {
      getBusPositions()
      locateAndPositionUser()
    }, 15000)
  }, [])

  return (
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
  )
}

export default Tracker
