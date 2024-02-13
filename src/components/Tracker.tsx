import { LatLngTuple } from 'leaflet'
import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import drawBuses from '../indicators/drawBuses'
import drawBusRoutes from '../indicators/drawBusRoutes'
import drawBusStops from '../indicators/drawBusStops'
import drawUser from '../indicators/drawUser'
import mapSettings from '../settings/map'
import { MonitoredVehicleJourneyRoute } from '../types'
import 'leaflet/dist/leaflet.css'

interface Props {
  buses: MonitoredVehicleJourneyRoute[] | undefined
  openPanel: () => void
  userPosition: LatLngTuple
}

const Tracker = (props: Props) => {
  const { buses, openPanel, userPosition } = props
  const [zoom, setZoom] = useState(mapSettings.zoom)

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
        center={mapSettings.center}
        zoom={mapSettings.zoom}
        zoomControl={false}
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      >
        <TileLayer attribution={mapSettings.attribution} url={mapSettings.tilesURL.dark} />
        {drawBusRoutes()}
        <ScaledMapElements />
      </MapContainer>
    </div>
  )
}

export default Tracker
