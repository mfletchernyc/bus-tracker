import proxyServer from '../settings/proxyServer'
import { v4 as uuidv4 } from 'uuid'
import routeConfig from '../settings/busRoutes'
import {
  busTimeLineRefPrefix,
  busTimeVehicleMonitoringAPI
} from '../settings/busTime'
import time from '../utilities/convertISO8601ToTime'

interface SiriRouteData {
  contents: {
    Siri: {
      ServiceDelivery: {
        ResponseTimestamp: string
        VehicleMonitoringDelivery: VehicleMonitoringDelivery[]
      }
    }
  }
}

interface VehicleMonitoringDelivery {
  VehicleActivity: VehicleActivity[]
}

interface VehicleActivity {
  MonitoredVehicleJourney: MonitoredVehicleJourney
}

export interface MonitoredVehicleJourney {
  Bearing: number
  PublishedLineName: string[]
  VehicleLocation: {
    Latitude: number
    Longitude: number
  }
  VehicleRef: string
}

const getVehicleActivity = (
  data: SiriRouteData
): VehicleActivity[] => (
  data.contents?.Siri?.ServiceDelivery?.VehicleMonitoringDelivery[0]?.VehicleActivity
)

const getTimestamp = (
  data: SiriRouteData
): string => (
  time(data.contents?.Siri?.ServiceDelivery?.ResponseTimestamp) ?? ''
)

const fetchBusesForOneRoute = async (routeName: string) => {
  const encodedAPI = encodeURIComponent(
    `${busTimeVehicleMonitoringAPI}${busTimeLineRefPrefix}${routeName}&nocache=${uuidv4()}`
  )

  const response = await fetch(`${proxyServer}${encodedAPI}`).catch((error) => {
    throw new Error(
      `Failed to fetch bus data for ${routeName}. ${error.message}`
    )
  })

  const data: SiriRouteData = await response.json()

  return data
}

const fetchBusesForAllRoutes = async () => {
  const apiRequests: Promise<SiriRouteData>[] = []
  const busesForAllRoutes: MonitoredVehicleJourney[] = []
  let timestamp = ''

  for (const route in routeConfig) {
    const routePromise = fetchBusesForOneRoute(route)

    apiRequests.push(routePromise)
  }

  const routesData = await Promise.all(apiRequests).catch((error) => {
    throw new Error(`Failed to fetch bus data for all routes. ${error.message}`)
  })

  routesData.forEach((route) => {
    const vehicles: VehicleActivity[] = getVehicleActivity(route)
    timestamp = getTimestamp(route)

    vehicles.map((vehicle: VehicleActivity) => {
      const bus: MonitoredVehicleJourney = vehicle.MonitoredVehicleJourney

      busesForAllRoutes.push(bus)
    })
  })

  return {
    buses: busesForAllRoutes,
    timestamp: timestamp
  }
}

const busTimeAPI = { fetchBusesForAllRoutes }

export default busTimeAPI
