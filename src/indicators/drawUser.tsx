import { ReactNode } from 'react'
import { LatLngTuple } from 'leaflet'
import { CircleMarker } from 'react-leaflet'
import zoomToMarkerScale from '../utilities/getMarkerScale'

const drawUser = (userPosition: LatLngTuple, zoom: number): ReactNode => (
  <CircleMarker center={userPosition} radius={6 * zoomToMarkerScale(zoom)} />
)

export default drawUser
