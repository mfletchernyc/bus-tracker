# bus-tracker

Personal NYC MTA bus tracker for the Greenpoint neighborhood of Brooklyn.

🚌 &nbsp;&nbsp;&nbsp; 🚌 &nbsp;&nbsp;&nbsp; 🚌

## service alert for B48

B48 stops along Lorimer St between Grand St and Meeker Ave are closed.

Map data will need to be updated when the construction at the Lorimer Street L Station is complete.

## made with

- [React](https://react.dev) and [Vite](https://vitejs.dev/)
- [MTA Bus Time API](https://bustime.mta.info/wiki/Developers/) and [transit data](http://web.mta.info/developers/developer-data-terms.html)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Leaflet](https://leafletjs.com) and [React Leaflet](https://react-leaflet.js.org)
- [Mapbox Studio](https://studio.mapbox.com)
- [QGIS](https://qgis.org/)

## local use

- Clone this repo.
- Add local [security certificates](https://www.makeswift.com/blog/accessing-your-local-nextjs-dev-server-using-https) to the project root.
- Create the file `.env.local` in the project root.
- Request a Bus Time API key from [the MTA](https://register.developer.obanyc.com/).
- Add `BUS_TRACKER_BUS_TIME_API_KEY = '<your API key>'` to `.env.local`.
- Create an account at [Mapbox](https://www.mapbox.com) and request an access token.
- Add `BUS_TRACKER_MAPBOX_TOKEN = '<your access token>'` to `.env.local`.
- In the terminal: `yarn`.
- In the terminal: `yarn dev`.
- In a separate terminal: `yarn dev:https`.
