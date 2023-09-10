import { CircleMarker } from 'react-leaflet'
import { v4 as uuidv4 } from 'uuid'
import stopSettings from '../settings/busStops'

const drawBusStops = () =>
  Object.values(stopSettings).map((stop) => (
    <CircleMarker
      center={stop.position}
      key={uuidv4()}
      pathOptions={{ color: '#0ba', opacity: 0.5, fillOpacity: 0.5 }}
      radius={4.5}
    />
  ))

export default drawBusStops
