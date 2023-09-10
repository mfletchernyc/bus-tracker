import { v4 as uuidv4 } from 'uuid'
import stopSettings from '../settings/busStops'
import {
  busTimeStopMonitoringAPI
} from '../settings/busTime'
import proxyServer from '../settings/proxyServer'
import {
  MonitoredStopVisit,
  MonitoredVehicleJourneyStop,
  SiriStopData
} from '../types'

// https://bustime.mta.info/wiki/Developers/SIRIStopMonitoring

const getVehicleActivity = (
  data: SiriStopData
): MonitoredStopVisit[] => (
  data.contents?.Siri?.ServiceDelivery?.StopMonitoringDelivery[0]?.MonitoredStopVisit
)

const fetchBusesForOneStop = async (stopId: string) => {
  const encodedAPI = encodeURIComponent(
    `${busTimeStopMonitoringAPI}${stopId}&nocache=${uuidv4()}`
  )

  const response = await fetch(`${proxyServer}${encodedAPI}`)
    .catch((error) => {
      throw new Error(
        `Failed to fetch stop data for ${stopId}. ${error.message}`
      )
    })

  const data: SiriStopData = await response.json()

  return data
}

// TO DO: type
const fetchBusesForAllStops = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const busesForAllStops: any = {} // MonitoredVehicleJourneyStop[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stopsData: any = {}

  for (const stopId in stopSettings) {
    const buses = await fetchBusesForOneStop(stopId)
    stopsData[stopId] = buses
  }

  for (const [stopId, stopData] of Object.entries(stopsData)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const busesForThisStop: any = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vehicles: MonitoredStopVisit[] = getVehicleActivity(<any>stopData)

    // Sometimes there are no buses, and StopMonitoringDelivery has no MonitoredStopVisit.
    // -> Unhandled Promise Rejection: TypeError: undefined is not an object (evaluating 'vehicles.map')
    if (vehicles) {
      vehicles.map((vehicle: MonitoredStopVisit) => {
        const bus: MonitoredVehicleJourneyStop = vehicle.MonitoredVehicleJourney

        busesForThisStop.push(bus)
      })

      busesForAllStops[stopId] = busesForThisStop
    }
  }

  return busesForAllStops
}
export default fetchBusesForAllStops
