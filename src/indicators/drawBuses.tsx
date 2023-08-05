import { ReactNode } from 'react'
import L from 'leaflet'
import { Marker } from 'react-leaflet'
import { Buffer } from 'buffer'
import busMarker from './busMarker'
import { MonitoredVehicleJourney } from '../api/busTime'
import routeConfig from '../settings/busRoutes'

// const trimVehicleRef = (ref: string) => ref.split('_')[1]

const drawBuses = (buses: MonitoredVehicleJourney[]): ReactNode =>
  Object.values(buses).map((bus: MonitoredVehicleJourney, i) => {
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

    // console.log(
    //   `🚌 -> ${bus.PublishedLineName} #${trimVehicleRef(bus.VehicleRef)} [${
    //     bus.VehicleLocation.Latitude
    //   }, ${bus.VehicleLocation.Longitude}] bearing: ${bus.Bearing}`
    // )

    return (
      <Marker
        key={i}
        icon={L.divIcon({ className: 'busMarker', html: getBusMarker() })}
        position={[bus.VehicleLocation.Latitude, bus.VehicleLocation.Longitude]}
      />
    )
  })

export default drawBuses
