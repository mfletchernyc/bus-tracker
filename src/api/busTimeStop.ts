import { v4 as uuidv4 } from 'uuid'
import stopSettings from '../settings/busStops'
import { busTimeStopMonitoringAPI } from '../settings/busTime'
import proxyServer from '../settings/proxyServer'
import { BusesForAllStops, MonitoredStopVisit, MonitoredVehicleJourneyStop, SiriStopData, StopsData } from '../types'

// https://bustime.mta.info/wiki/Developers/SIRIStopMonitoring

const getVehicleActivity = (data: SiriStopData): MonitoredStopVisit[] =>
  data.contents?.Siri?.ServiceDelivery?.StopMonitoringDelivery[0]?.MonitoredStopVisit

const fetchBusesForOneStop = async (stopId: string) => {
  const encodedAPI = encodeURIComponent(`${busTimeStopMonitoringAPI}${stopId}&nocache=${uuidv4()}`)

  const response = await fetch(`${proxyServer}${encodedAPI}`).catch((error) => {
    throw new Error(`Failed to fetch stop data for ${stopId}. ${error.message}`)
  })

  const data: SiriStopData = await response.json()

  return data
}

const fetchBusesForAllStops = async () => {
  const busesForAllStops: BusesForAllStops = {}
  const stopsData: StopsData = {}

  for (const stopId in stopSettings) {
    const buses = await fetchBusesForOneStop(stopId)
    stopsData[stopId] = buses
  }

  for (const [stopId, stopData] of Object.entries(stopsData)) {
    const busesForThisStop: MonitoredVehicleJourneyStop[] = []
    const vehicles: MonitoredStopVisit[] = getVehicleActivity(stopData)

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
