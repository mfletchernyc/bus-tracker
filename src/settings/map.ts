import { LatLngTuple } from 'leaflet'
import { Theme } from '../types'

export const defaultCenter: LatLngTuple = [40.73, -73.951]
export const defaultZoom = 14

const mapboxAPI = 'https://api.mapbox.com/styles/v1/'
const mapboxTiles = {
  dark: 'mfletchernyc/clen4u3vf000t01o2ormwyvjn',
  light: 'mfletchernyc/cleorg7ao001h01mpqvqmy8w4'
}
const mapboxToken = import.meta.env.VITE_BUS_TRACKER_MAPBOX_TOKEN

const tilesPathAndToken = `/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`
export const tilesURL = (theme: Theme) =>
  theme === 'dark'
    ? `${mapboxAPI}${mapboxTiles.dark}${tilesPathAndToken}`
    : `${mapboxAPI}${mapboxTiles.light}${tilesPathAndToken}`

const openStreetMapAttr = '<a href="http://osm.org/copyright">OpenStreetMap</a>'
const mapboxAttr = ' <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
export const attribution = `${openStreetMapAttr} | ${mapboxAttr}`

const mapSettings = {
  tilesURL
}

export default mapSettings
