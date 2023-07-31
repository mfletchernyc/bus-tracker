import { LatLngTuple } from 'leaflet'

const center: LatLngTuple = [40.73, -73.951]
const zoom = 15

const mapboxAPI = 'https://api.mapbox.com/styles/v1/'
const mapboxTiles = {
  // TO DO: return a single value.
  dark: 'mfletchernyc/clen4u3vf000t01o2ormwyvjn',
  // light: 'mfletchernyc/cleorg7ao001h01mpqvqmy8w4'
}
const mapboxToken = import.meta.env.VITE_BUS_TRACKER_MAPBOX_TOKEN

const tilesPathAndToken = `/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`
const tilesURL = {
  // TO DO: return a single value.
  dark: `${mapboxAPI}${mapboxTiles.dark}${tilesPathAndToken}`,
  // light: `${mapboxAPI}${mapboxTiles.light}${tilesPathAndToken}`
}

const openStreetMapAttr = '<a href="http://osm.org/copyright">OpenStreetMap</a>'
const mapboxAttr = ' <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
const attribution = `${openStreetMapAttr} | ${mapboxAttr}`

const mapSettings = {
  attribution,
  center,
  tilesURL,
  zoom
}

export default mapSettings
