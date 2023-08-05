import { LatLngTuple } from 'leaflet'
import { useEffect, useState } from 'react'
import Panel from './components/Panel'
import PanelButton from './components/PanelButton'
import Tracker from './components/Tracker'
import './styles/App.css'

const App = () => {
  const [userPosition, setUserPosition] = useState<LatLngTuple>([0, 0])
  const [userPositionAccuracy, setUserPositionAccuracy] = useState(0)

  const locateAndPositionUser = () => {
    const doGeolocation = (position: GeolocationPosition) => {
      const coords = position.coords
      setUserPosition([coords.latitude, coords.longitude])
      setUserPositionAccuracy(coords.accuracy)
    }

    navigator.geolocation.getCurrentPosition(doGeolocation)
  }

  useEffect(() => {
    locateAndPositionUser()

    setInterval(() => {
      locateAndPositionUser()
    }, 15000)
  }, [])

  return (
    <div className="app-container">
      <PanelButton />
      <div id="app">
        <Tracker userPosition={userPosition}/>
        <Panel
          userPosition={userPosition}
          userPositionAccuracy={userPositionAccuracy}
        />
      </div>
    </div>
  )
}

export default App
