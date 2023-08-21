import { ReactNode } from 'react'
import L from 'leaflet'
import { Marker } from 'react-leaflet'
import { Buffer } from 'buffer'
import busMarker from './busMarker'
import { MonitoredVehicleJourneyRoute } from '../api/busTimeRoute'
import routeConfig from '../settings/busRoutes'

const drawBuses = (buses: MonitoredVehicleJourneyRoute[]): ReactNode =>
  Object.values(buses).map((bus: MonitoredVehicleJourneyRoute, i) => {
    const routeName: string = bus.PublishedLineName[0]

    // leaflet-rotatedmarker broke with react-leaflet 2, so L.divIcon + CSS.
    const getBusMarker = () => {
      const svg = 'data:image/svg+xml;base64,'
      const marker = busMarker(routeConfig[routeName].color)
      const source = `src="${svg}${Buffer.from(marker).toString('base64')}"`

      const size = 'width="12px" height="22px"'

      const translation = `translate(-10%, -25%)`
      const rotation = `rotate(${-bus.Bearing + 90}deg)`
      const style = `style="transform: ${translation} ${rotation}"`

      return `<img ${source} ${size} ${style} alt="" />`
    }

    return (
      <Marker
        key={i}
        icon={L.divIcon({ className: 'busMarker', html: getBusMarker() })}
        position={[bus.VehicleLocation.Latitude, bus.VehicleLocation.Longitude]}
      />
    )
  })

export default drawBuses
