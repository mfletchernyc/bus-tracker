import { CircleMarker } from 'react-leaflet'
import stopSettings from '../settings/busStops'
import zoomToMarkerScale from '../utilities/getMarkerScale'
import { collapseAllStops, toggleStop } from '../utilities/togglePanelStops'

const showStopInfo = (openPanel: () => void, id: string) => {
  openPanel()
  collapseAllStops()
  toggleStop(id)
}

const drawBusStops = (openPanel: () => void, zoom: number) =>
  Object.keys(stopSettings).map((id) => (
    <CircleMarker
      center={stopSettings[id].position}
      eventHandlers={{ click: () => showStopInfo(openPanel, id) }}
      key={id}
      pathOptions={{ color: '#0ba', opacity: 0.5, fillOpacity: 0.5 }}
      radius={5 * zoomToMarkerScale(zoom)}
    />
  ))

export default drawBusStops
