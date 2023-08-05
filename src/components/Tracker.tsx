import { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import { MonitoredVehicleJourney } from '../api/busTime'
import drawBuses from '../indicators/drawBuses'
import drawBusRoutes from '../indicators/drawBusRoutes'
import drawBusStops from '../indicators/drawBusStops'
import drawUser from '../indicators/drawUser'
import mapSettings from '../settings/map'
import 'leaflet/dist/leaflet.css'

interface Props {
  buses: MonitoredVehicleJourney[] | undefined
  userPosition: LatLngTuple
}

const Tracker = (props: Props) => {
  const { buses, userPosition } = props

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
        {buses && drawBuses(buses)}
        {userPosition && drawUser(userPosition)}
      </MapContainer>
    </div>
  )
}

export default Tracker
