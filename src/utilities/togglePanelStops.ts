export const toggleStop = (stopId: string) => {
  const stop = document.getElementById(stopId)
  stop?.classList.toggle('collapsed')
}

export const collapseAllStops = () => {
  const stops = document.querySelectorAll('.stop-data > section')

  stops.forEach((stop) => {
    stop.classList.add('collapsed')
  })
}
