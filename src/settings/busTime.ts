// https://bustime.mta.info/wiki/Developers/

const busTimeAPIKey = import.meta.env.VITE_BUS_TRACKER_BUS_TIME_API_KEY

const busTimeAPI = 'https://bustime.mta.info/api/siri'
export const busTimeStopMonitoringAPI = `${busTimeAPI}/stop-monitoring.json?key=${busTimeAPIKey}&version=2&StopMonitoringDetailLevel=minimum&MaximumStopVisits=3&MonitoringRef=`
export const busTimeVehicleMonitoringAPI = `${busTimeAPI}/vehicle-monitoring.json?key=${busTimeAPIKey}&version=2&VehicleMonitoringDetailLevel=minimum&LineRef=`
export const busTimeLineRefPrefix = 'MTA%20NYCT_'
