const time = (date: string): string => {
  const match = date.match(/\d\d:\d\d:\d\d/)
  if (!match) return ''

  const military = match[0]
  const hours = Number(military.substring(0, 2)) % 12 || 12

  return `${hours}${military.slice(2)}`
}

export default time
