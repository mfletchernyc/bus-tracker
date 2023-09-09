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

// Time stamps for both route and stop?

const getVehicleActivity = (
  data: SiriStopData
): MonitoredStopVisit[] => (
  data.contents?.Siri?.ServiceDelivery?.StopMonitoringDelivery[0]?.MonitoredStopVisit
)

// ex: https://bustime.mta.info/api/siri/stop-monitoring.json?key=e8491098-5217-4a3b-9ec5-848d45688157&version=2&VehicleMonitoringDetailLevel=minimum&MonitoringRef=305167

const fetchBusesForOneStop = async (stopId: number) => {
  const encodedAPI = encodeURIComponent(
    `${busTimeStopMonitoringAPI}${stopId}&nocache=${uuidv4()}`
  )

  const response = await fetch(`${proxyServer}${encodedAPI}`).catch((error) => {
    throw new Error(
      `Failed to fetch stop data for ${stopId}. ${error.message}`
    )
  })

  const data: SiriStopData = await response.json()

  // SOMETIMES THERE ARE NO BUSES
  // StopMonitoringDelivery has no MonitoredStopVisit 
  // so: Unhandled Promise Rejection: TypeError: undefined is not an object (evaluating 'vehicles.map')
  
  return data
}

const fetchBusesForAllStops = async () => {
  const apiRequests: Promise<SiriStopData>[] = []
  const busesForAllStops: MonitoredVehicleJourneyStop[] = []

  stopSettings.forEach((stop) => {
    apiRequests.push(fetchBusesForOneStop(stop.id))
  })

  const stopsData = await Promise.all(apiRequests).catch((error) => {
    throw new Error(`Failed to fetch bus data for all stops. ${error.message}`)
  })

  stopsData.forEach((stop) => {
    const vehicles: MonitoredStopVisit[] = getVehicleActivity(stop)
    // console.log('stopsData.forEach: vehicles: MonitoredVehicleJourney ->', vehicles[0].MonitoredVehicleJourney)

    vehicles.map((vehicle: MonitoredStopVisit) => {
      const bus: MonitoredVehicleJourneyStop = vehicle.MonitoredVehicleJourney

      busesForAllStops.push(bus)
    })
  })

  return busesForAllStops
}


export default fetchBusesForAllStops
