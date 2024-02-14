import { LatLngTuple } from 'leaflet'
import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import drawBuses from '../indicators/drawBuses'
import drawBusRoutes from '../indicators/drawBusRoutes'
import drawBusStops from '../indicators/drawBusStops'
import drawUser from '../indicators/drawUser'
import { attribution, defaultCenter, defaultZoom, tilesURL } from '../settings/map'
import { MonitoredVehicleJourneyRoute, Theme } from '../types'
import 'leaflet/dist/leaflet.css'

interface Props {
  buses: MonitoredVehicleJourneyRoute[] | undefined
  openPanel: () => void
  theme: Theme
  userPosition: LatLngTuple
}

const Tracker = (props: Props) => {
  const { buses, openPanel, theme, userPosition } = props
  const [zoom, setZoom] = useState(defaultZoom)

  const ScaledMapElements = () => {
    const mapEvents = useMapEvents({
      zoomend: () => {
        setZoom(mapEvents.getZoom())
      }
    })

    return (
      <>
        {drawBusStops(openPanel, zoom)}
        {buses && drawBuses(buses, zoom)}
        {userPosition && drawUser(userPosition, zoom)}
      </>
    )
  }

  return (
    <div className="map-container">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        zoomControl={false}
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      >
        <TileLayer attribution={attribution} url={tilesURL(theme)} />
        {drawBusRoutes()}
        <ScaledMapElements />
      </MapContainer>
    </div>
  )
}

export default Tracker
