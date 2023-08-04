import proxyServer from '../settings/proxyServer'
import { v4 as uuidv4 } from 'uuid'
import routeConfig from '../settings/busRoutes'
import {
  busTimeLineRefPrefix,
  busTimeVehicleMonitoringAPI
} from '../settings/busTime'

interface SiriRouteData {
  contents: {
    Siri: {
      ServiceDelivery: {
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

const destructureVehicleMonitoringData = (
  data: SiriRouteData
): VehicleActivity[] => {
  return data.contents?.Siri?.ServiceDelivery?.VehicleMonitoringDelivery[0]
    ?.VehicleActivity
}

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

  for (const route in routeConfig) {
    const routePromise = fetchBusesForOneRoute(route)

    apiRequests.push(routePromise)
  }

  const routesData = await Promise.all(apiRequests).catch((error) => {
    throw new Error(`Failed to fetch bus data for all routes. ${error.message}`)
  })

  routesData.forEach((route) => {
    const vehicles: VehicleActivity[] = destructureVehicleMonitoringData(route)

    vehicles.map((vehicle: VehicleActivity) => {
      const bus: MonitoredVehicleJourney = vehicle.MonitoredVehicleJourney

      busesForAllRoutes.push(bus)
    })
  })

  return busesForAllRoutes
}

const busTimeAPI = {
  fetchBusesForAllRoutes
}

export default busTimeAPI
