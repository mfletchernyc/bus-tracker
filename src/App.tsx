import { LatLngTuple } from 'leaflet'
import { useEffect, useState } from 'react'
import fetchBusesForAllRoutes from './api/busTimeRoute'
import fetchBusesForAllStops from './api/busTimeStop'
import Panel from './components/Panel'
import PanelButton from './components/PanelButton'
import Tracker from './components/Tracker'
import { BusesForAllStops, MonitoredVehicleJourneyRoute, Theme } from './types'
import './styles/App.css'

interface BusData {
  buses: MonitoredVehicleJourneyRoute[]
  timestamp: string
}

const App = () => {
  const [theme, setTheme] = useState<Theme>('dark')
  const [panelIsOpen, setPanelIsOpen] = useState(false)

  const [buses, setBuses] = useState<MonitoredVehicleJourneyRoute[]>()
  const [stops, setStops] = useState<BusesForAllStops>()
  const [userPosition, setUserPosition] = useState<LatLngTuple>([0, 0])
  const [userPositionAccuracy, setUserPositionAccuracy] = useState(0)
  const [timestamp, setTimestamp] = useState<string>('')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const togglePanel = () => {
    setPanelIsOpen(!panelIsOpen)
  }

  const getPanelClass = () => (panelIsOpen ? 'panel' : '')

  const getBusesForRoutes = () => {
    fetchBusesForAllRoutes().then((data: BusData) => {
      const { buses, timestamp } = data
      setBuses(buses)
      setTimestamp(timestamp)
    })
  }

  const getBusesForStops = () => {
    fetchBusesForAllStops().then((data) => {
      setStops(data)
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
    <div className={`app-container ${theme}`}>
      <div id="app" className={getPanelClass()}>
        <Tracker buses={buses} userPosition={userPosition} openPanel={togglePanel} theme={theme} />
        <Panel
          stops={stops}
          toggleTheme={toggleTheme}
          timestamp={timestamp}
          userPositionAccuracy={userPositionAccuracy}
        />
      </div>
      <PanelButton onClick={togglePanel} />
    </div>
  )
}

export default App
