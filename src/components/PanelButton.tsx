const PanelButton = () => {
  const togglePanel = () => {
    const app = document.getElementById('app')
    app?.classList.toggle('panel')
  }

  return (
    <button id="panel-button" onClick={togglePanel}>
      <img src="./gearIcon.svg" alt="panel" width="30" height="30" />
    </button>
  )
}

export default PanelButton
