interface Props {
  onClick: () => void
}

const PanelButton = (props: Props) => {
  return (
    <button id="panel-button" onClick={props.onClick}>
      <img src="./gearIcon.svg" alt="panel" width="30" height="30" />
    </button>
  )
}

export default PanelButton
