import { ReactNode } from 'react'
import { LatLngTuple } from 'leaflet'
import { CircleMarker } from 'react-leaflet'

const drawUser = (userPosition: LatLngTuple): ReactNode => (
  <CircleMarker center={userPosition}></CircleMarker>
)

export default drawUser
