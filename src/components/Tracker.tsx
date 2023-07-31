// import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
// import { LatLngTuple } from 'leaflet'
import mapSettings from '../config/map'
// import 'leaflet/dist/leaflet.css'

const Tracker = () => {
  return (
    <MapContainer
      center={mapSettings.center}
      zoom={mapSettings.zoom}
      zoomControl={false}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <TileLayer
        attribution={mapSettings.attribution}
        url={mapSettings.tilesURL.dark}
      />
    </MapContainer>
  )
}

export default Tracker
