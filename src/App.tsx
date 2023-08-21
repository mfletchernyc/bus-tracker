import { LatLngTuple } from 'leaflet'
import { useEffect, useState } from 'react'
import fetchBusesForAllRoutes, { MonitoredVehicleJourney } from './api/busTimeRoute'
import fetchBusesForAllStops from './api/busTimeStop'
import Panel from './components/Panel'
import PanelButton from './components/PanelButton'
import Tracker from './components/Tracker'
import './styles/App.css'

interface BusData {
  buses: MonitoredVehicleJourney[];
  timestamp: string;
}

const App = () => {
  const [buses, setBuses] = useState<MonitoredVehicleJourney[]>()
  const [userPosition, setUserPosition] = useState<LatLngTuple>([0, 0])
  const [userPositionAccuracy, setUserPositionAccuracy] = useState(0)
  const [timestamp, setTimestamp] = useState<string>('')
  
  const getBusesForRoutes = () => {
    fetchBusesForAllRoutes()
      .then((data: BusData) => {
        const { buses, timestamp } = data
        setBuses(buses)
        setTimestamp(timestamp)
      })
  }

  const getBusesForStops = () => {
    fetchBusesForAllStops()
      .then((data) => {
        console.log('App -> getBusesForStops', data)
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
    getBusesForRoutes()
    locateAndPositionUser()
    getBusesForStops()

    setInterval(() => {
      getBusesForRoutes()
      locateAndPositionUser()
      getBusesForStops()
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
          timestamp={timestamp}
          userPosition={userPosition}
          userPositionAccuracy={userPositionAccuracy}
        />
      </div>
    </div>
  )
}

export default App
