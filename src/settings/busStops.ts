import { LatLngTuple } from 'leaflet'

export interface busStopSetting {
  id: number
  name: string
  position: LatLngTuple
}

const busStopSettings: busStopSetting[] = [
  {
    // B43, B62
    id: 305167,
    name: 'Manhattan Av/Freeman St',
    position: [40.73407, -73.95513]
  },
  {
    // B43
    id: 307121,
    name: 'Manhattan Av/Nassau Av',
    position: [40.7236, -73.95043]
  },
  {
    // B62
    id: 801198,
    name: 'Nassau Av/Manhattan Av',
    position: [40.72352, -73.951]
  },
  {
    // B48
    id: 307096,
    name: 'Nassau Av/Manhattan Av',
    position: [40.72382, -73.9501]
  },
  {
    // B48
    id: 303844,
    name: 'Nassau Av/Hausman St',
    position: [40.72628, -73.9393]
  }
]

export default busStopSettings
