import ThemeIcon from '../icons/ThemeIcon'

interface Props {
  onClick: () => void
}

const ThemeButton = (props: Props) => {
  return (
    <button className="button theme-button" onClick={props.onClick}>
      <ThemeIcon />
    </button>
  )
}

export default ThemeButton
