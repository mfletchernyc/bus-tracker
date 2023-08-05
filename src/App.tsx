import Tracker from './components/Tracker'
import Panel from './components/Panel'
import PanelButton from './components/PanelButton'
import './styles/App.css'

const App = () => (
  <div className="app-container">
    <PanelButton />
    <div id="app">
      <Tracker />
      <Panel />
    </div>
  </div>
)

export default App
