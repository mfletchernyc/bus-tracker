import B43geography from '../geojson/B43.json'
import B48geography from '../geojson/B48.json'
import B62geography from '../geojson/B62.json'

// These bus routes are GeoJSON, but cause constant problems when I treat
// them like GeoJSON. Syntax errors, type errors. Try again another time. 
// It works like this for now (except in indicators/drawBusRoutes.tsx). 🤷‍♂️

export interface RouteConfig {
  [key: string]: {
    name: string
    color: string
    lineRef: string
    path: object
  }
}

const routeConfig: RouteConfig = {
  B43: {
    name: 'B43',
    color: '#cc00ff',
    lineRef: 'MTA%20NYCT_B43',
    path: B43geography
  },
  B48: {
    name: 'B48',
    color: '#a4c215',
    lineRef: 'MTA%20NYCT_B48',
    path: B48geography
  },
  B62: {
    name: 'B62',
    color: '#cc6600',
    lineRef: 'MTA%20NYCT_B62',
    path: B62geography
  }
}

export default routeConfig
