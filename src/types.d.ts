import { LatLngTuple } from 'leaflet'

interface RouteSettings {
  [key: string]: {
    name: string
    color: string
    lineRef: string
    path: object
  }
}

interface StopSettings {
  [key: string]: {
    name: string
    position: LatLngTuple
    route: string
  }
}

// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

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
  MonitoredVehicleJourney: MonitoredVehicleJourneyRoute
}

interface MonitoredVehicleJourneyRoute {
  Bearing: number
  PublishedLineName: string[]
  VehicleLocation: {
    Latitude: number
    Longitude: number
  }
  VehicleRef: string
}

// https://bustime.mta.info/wiki/Developers/SIRIStopMonitoring

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
  MonitoredVehicleJourney: MonitoredVehicleJourneyStop
}

interface MonitoredVehicleJourneyStop {
  MonitoredCall: {
    ArrivalProximityText: string
    ExpectedArrivalTime: string
  }
  PublishedLineName: string[]
  VehicleRef: string
}

export {
  BusesForOneStop,
  MonitoredStopVisit,
  MonitoredVehicleJourneyRoute,
  MonitoredVehicleJourneyStop,
  RouteSettings,
  SiriRouteData,
  SiriStopData,
  StopSettings,
  VehicleActivity
}
