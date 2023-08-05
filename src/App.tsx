import { LatLngTuple } from 'leaflet'
import { useEffect, useState } from 'react'
import busTimeAPI, { MonitoredVehicleJourney } from './api/busTime'
import Panel from './components/Panel'
import PanelButton from './components/PanelButton'
import Tracker from './components/Tracker'
import './styles/App.css'

const App = () => {
  const [buses, setBuses] = useState<MonitoredVehicleJourney[]>()
  const [userPosition, setUserPosition] = useState<LatLngTuple>([0, 0])
  const [userPositionAccuracy, setUserPositionAccuracy] = useState(0)
  
  const getBuses = () => {
    busTimeAPI
      .fetchBusesForAllRoutes()
      .then((buses: MonitoredVehicleJourney[]) => {
        setBuses(buses)
      })
  }

  const locateAndPositionUser = () => {
    const doGeolocation = (position: GeolocationPosition) => {
      const coords = position.coords
      setUserPosition([coords.latitude, coords.longitude])
      setUserPositionAccuracy(coords.accuracy)
    }

    navigator.geolocation.getCurrentPosition(doGeolocation)
  }

  useEffect(() => {
    getBuses()
    locateAndPositionUser()

    setInterval(() => {
      getBuses()
      locateAndPositionUser()
    }, 15000)
  }, [])

  return (
    <div className="app-container">
      <PanelButton />
      <div id="app">
        <Tracker
          buses={buses}
          userPosition={userPosition}
        />
        <Panel
          buses={buses}
          userPosition={userPosition}
          userPositionAccuracy={userPositionAccuracy}
        />
      </div>
    </div>
  )
}

export default App
