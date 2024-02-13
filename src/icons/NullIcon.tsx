interface Props {
  color: string
}

const NullIcon = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12">
      <path
        fill={props.color}
        d="M12,1.1L10.9,0L9.7,1.3C8.7,0.5,7.4,0,6,0C2.7,0,0,2.7,0,6c0,1.4,0.5,2.7,1.3,3.7L0,10.9L1.1,12l1.3-1.3
	C3.3,11.5,4.6,12,6,12c3.3,0,6-2.7,6-6c0-1.4-0.5-2.7-1.3-3.7L12,1.1z M1.5,6c0-2.5,2-4.5,4.5-4.5c1,0,1.9,0.3,2.6,0.8L2.3,8.6
	C1.8,7.9,1.5,7,1.5,6z M10.5,6c0,2.5-2,4.5-4.5,4.5c-1,0-1.9-0.3-2.6-0.8l6.3-6.3C10.2,4.1,10.5,5,10.5,6z"
      />
    </svg>
  )
}

export default NullIcon
