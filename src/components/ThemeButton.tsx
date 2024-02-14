import ThemeIcon from '../icons/ThemeIcon'
import { ButtonProps } from '../types'

const ThemeButton = (props: ButtonProps) => {
  return (
    <button className="button theme-button" onClick={props.onClick}>
      <ThemeIcon />
    </button>
  )
}

export default ThemeButton
