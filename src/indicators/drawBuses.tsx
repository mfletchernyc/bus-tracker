import { Buffer } from 'buffer'
import L from 'leaflet'
import { ReactNode } from 'react'
import { Marker } from 'react-leaflet'
import busMarker from './busMarker'
import routeConfig from '../settings/busRoutes'
import { MonitoredVehicleJourneyRoute } from '../types'
import zoomToMarkerScale from '../utilities/getMarkerScale'

const drawBuses = (buses: MonitoredVehicleJourneyRoute[], zoom: number): ReactNode =>
  Object.values(buses).map((bus: MonitoredVehicleJourneyRoute, i) => {
    const routeName: string = bus.PublishedLineName[0]

    // leaflet-rotatedmarker broke with react-leaflet 2, so L.divIcon + CSS.
    const getBusMarker = () => {
      const svg = 'data:image/svg+xml;base64,'
      const marker = busMarker(routeConfig[routeName].color)
      const source = `src="${svg}${Buffer.from(marker).toString('base64')}"`
      const markerScale = zoomToMarkerScale(zoom)

      const size = `width="${12 * markerScale}px" height="${22 * markerScale}px"`

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
