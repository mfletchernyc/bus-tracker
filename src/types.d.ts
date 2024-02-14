import { LatLngTuple } from 'leaflet'

export type Theme = 'dark' | 'light'

export interface RouteSettings {
  [key: string]: {
    name: string
    color: string
    lineRef: string
    path: object
  }
}

export interface StopSettings {
  [key: string]: {
    name: string
    position: LatLngTuple
    route: string
  }
}

// https://bustime.mta.info/wiki/Developers/SIRIVehicleMonitoring

export interface SiriRouteData {
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

export interface VehicleActivity {
  MonitoredVehicleJourney: MonitoredVehicleJourneyRoute
}

export interface MonitoredVehicleJourneyRoute {
  Bearing: number
  PublishedLineName: string[]
  VehicleLocation: {
    Latitude: number
    Longitude: number
  }
  VehicleRef: string
}

// https://bustime.mta.info/wiki/Developers/SIRIStopMonitoring

export interface SiriStopData {
  contents: {
    Siri: {
      ServiceDelivery: {
        ResponseTimestamp: string
        StopMonitoringDelivery: StopMonitoringDelivery[]
      }
    }
  }
}

export interface StopsData {
  [stopId: string]: SiriStopData
}

interface StopMonitoringDelivery {
  MonitoredStopVisit: MonitoredStopVisit[]
}

export interface MonitoredStopVisit {
  MonitoredVehicleJourney: MonitoredVehicleJourneyStop
}

export interface MonitoredVehicleJourneyStop {
  MonitoredCall: {
    ArrivalProximityText: string
    ExpectedArrivalTime: string
  }
  PublishedLineName: string[]
  VehicleRef: string
}

export interface StopData {
  PublishedLineName: string[]
  VehicleRef: string
  OriginAimedDepartureTime?: string
  MonitoredCall: {
    ExpectedDepartureTime?: string
    ArrivalProximityText: string
    ExpectedArrivalTime?: string
  }
}

export interface BusesForAllStops {
  [stopId: string]: MonitoredVehicleJourneyStop[]
}
