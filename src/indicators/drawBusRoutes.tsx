import { GeoJSON } from 'react-leaflet'
import routeSettings from '../settings/busRoutes'

const drawBusRoutes = () =>
  Object.values(routeSettings).map((route) => (
    <GeoJSON
      // @ts-expect-error See settings/busRoutes.
      data={route.path}
      key={route.name}
      style={{ color: `${route.color}33` }}
    />
  ))

export default drawBusRoutes
