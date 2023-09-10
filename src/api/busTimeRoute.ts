import { v4 as uuidv4 } from 'uuid'
import routeSettings from '../settings/busRoutes'
import {
  busTimeLineRefPrefix,
  busTimeVehicleMonitoringAPI
} from '../settings/busTime'
import proxyServer from '../settings/proxyServer'
import time from '../utilities/convertISO8601ToTime'
import {
  MonitoredVehicleJourneyRoute,
  SiriRouteData,
  VehicleActivity
} from '../types'

// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

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
  const busesForAllRoutes: MonitoredVehicleJourneyRoute[] = []
  let timestamp = ''

  for (const route in routeSettings) {
    apiRequests.push(fetchBusesForOneRoute(route))
  }

  const routesData = await Promise.all(apiRequests).catch((error) => {
    throw new Error(`Failed to fetch bus data for all routes. ${error.message}`)
  })

  routesData.forEach((route) => {
    const vehicles: VehicleActivity[] = getVehicleActivity(route)
    timestamp = getTimestamp(route)

    vehicles.map((vehicle: VehicleActivity) => {
      const bus: MonitoredVehicleJourneyRoute = vehicle.MonitoredVehicleJourney

      busesForAllRoutes.push(bus)
    })
  })

  return {
    buses: busesForAllRoutes,
    timestamp: timestamp
  }
}

export default fetchBusesForAllRoutes
