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
  MonitoredStopVisit,
  MonitoredVehicleJourneyRoute,
  MonitoredVehicleJourneyStop,
  SiriRouteData,
  SiriStopData,
  VehicleActivity
}
