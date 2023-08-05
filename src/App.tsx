import Tracker from './components/Tracker'
import Settings from './components/Settings'
import SettingsButton from './components/SettingsButton'
import './styles/App.css'

const App = () => (
  <div className="app-container">
    <SettingsButton />
    <div id="app">
      <Tracker />
      <Settings />
    </div>
  </div>
)

export default App
