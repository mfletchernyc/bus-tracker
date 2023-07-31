import { ReactNode } from 'react'
import { LatLngTuple } from 'leaflet'
import { CircleMarker } from 'react-leaflet'

const drawUser = (userPosition: LatLngTuple): ReactNode => (
  <CircleMarker center={userPosition} radius={8}></CircleMarker>
)

export default drawUser
