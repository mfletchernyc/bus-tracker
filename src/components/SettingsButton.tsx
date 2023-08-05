const SettingsButton = () => {
  const toggleSettings = () => {
    const app = document.getElementById('app')
    app?.classList.toggle('settings')
  }

  return (
    <button id="settings-button" onClick={toggleSettings}>
      <img src="./gearIcon.svg" alt="settings" width="30" height="30" />
    </button>
  )
}

export default SettingsButton
