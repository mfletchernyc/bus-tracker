// https://bustime.mta.info/wiki/Developers/

const busTimeAPIKey = import.meta.env.VITE_BUS_TRACKER_BUS_TIME_API_KEY

const busTimeAPI = 'https://bustime.mta.info/api/siri'
const busTimeStopMonitoringAPI = `${busTimeAPI}/stop-monitoring.json?key=${busTimeAPIKey}&version=2&StopMonitoringDetailLevel=minimum&MonitoringRef=`
const busTimeVehicleMonitoringAPI = `${busTimeAPI}/vehicle-monitoring.json?key=${busTimeAPIKey}&version=2&VehicleMonitoringDetailLevel=minimum&LineRef=`
const busTimeLineRefPrefix = 'MTA%20NYCT_'

export {
  busTimeLineRefPrefix,
  busTimeStopMonitoringAPI,
  busTimeVehicleMonitoringAPI
}
