import proxyServer from '../settings/proxyServer'
import { v4 as uuidv4 } from 'uuid'
import stopSettings from '../settings/busStops'
import {
  busTimeStopMonitoringAPI
} from '../settings/busTime'

interface SiriStopData {
  contents: {
    Siri: {
      ServiceDelivery: {
        ResponseTimestamp: string
        StopMonitoringDelivery: StopMonitoringDelivery[]
      }
    }
  }
}

interface StopMonitoringDelivery {
  MonitoredStopVisit: MonitoredStopVisit[]
}

interface MonitoredStopVisit {
  MonitoredVehicleJourney: MonitoredVehicleJourney
}

export interface MonitoredVehicleJourney {
  MonitoredCall: {
    ArrivalProximityText: string
    ExpectedArrivalTime: string
  }
  PublishedLineName: string[]
  VehicleRef: string
}

const getVehicleActivity = (
  data: SiriStopData
): MonitoredStopVisit[] => (
  data.contents?.Siri?.ServiceDelivery?.StopMonitoringDelivery[0]?.MonitoredStopVisit
)

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
  
  return data
}

const fetchBusesForAllStops = async () => {
  const apiRequests: Promise<SiriStopData>[] = []
  const busesForAllStops: MonitoredVehicleJourney[] = []

  stopSettings.forEach((stop) => {
    const stopPromise = fetchBusesForOneStop(stop.id)

    apiRequests.push(stopPromise)
  })

  const stopsData = await Promise.all(apiRequests).catch((error) => {
    throw new Error(`Failed to fetch bus data for all stops. ${error.message}`)
  })

  stopsData.forEach((stop) => {
    const vehicles: MonitoredStopVisit[] = getVehicleActivity(stop)

    vehicles.map((vehicle: MonitoredStopVisit) => {
      const bus: MonitoredVehicleJourney = vehicle.MonitoredVehicleJourney

      busesForAllStops.push(bus)
    })
  })

  return busesForAllStops
}


export default fetchBusesForAllStops
