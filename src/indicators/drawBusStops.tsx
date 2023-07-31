import { ReactNode } from 'react'
import { CircleMarker } from 'react-leaflet'
import { v4 as uuidv4 } from 'uuid'
import stopSettings, { busStopSetting } from '../settings/busStops'

const drawStop = (stopSetting: busStopSetting): ReactNode => (
  <CircleMarker
    center={stopSetting.position}
    key={uuidv4()}
    pathOptions={{ color: '#0ba', opacity: 0.5, fillOpacity: 0.5 }}
    radius={4.5}
  />
)

const drawStops = () => (
  stopSettings.map((setting) => drawStop(setting))
)

export default drawStops
