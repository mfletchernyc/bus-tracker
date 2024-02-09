import { CircleMarker } from 'react-leaflet'
import { v4 as uuidv4 } from 'uuid'
import stopSettings from '../settings/busStops'
import zoomToMarkerScale from '../utilities/getMarkerScale'

const drawBusStops = (zoom: number) =>
  Object.values(stopSettings).map((stop) => (
    <CircleMarker
      center={stop.position}
      key={uuidv4()}
      pathOptions={{ color: '#0ba', opacity: 0.5, fillOpacity: 0.5 }}
      radius={5 * zoomToMarkerScale(zoom)}
    />
  ))

export default drawBusStops
