import { defaultZoom } from '../settings/map'

const zoomRatioMultiplier = 2

const zoomToMarkerScale = (zoom: number) : number =>
  (zoom / defaultZoom) ** zoomRatioMultiplier

export default zoomToMarkerScale
