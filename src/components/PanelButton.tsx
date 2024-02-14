import GearIcon from '../icons/GearIcon'

interface Props {
  onClick: () => void
}

const PanelButton = (props: Props) => {
  return (
    <button className="button panel-button" onClick={props.onClick}>
      <GearIcon color="#ddddddaa" />
    </button>
  )
}

export default PanelButton
