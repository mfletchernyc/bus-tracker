import GearIcon from '../icons/GearIcon'
import { ButtonProps } from '../types'

const PanelButton = (props: ButtonProps) => {
  return (
    <button className="button panel-button" onClick={props.onClick}>
      <GearIcon color="#ddddddaa" />
    </button>
  )
}

export default PanelButton
