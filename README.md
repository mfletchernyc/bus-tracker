# bus-tracker

Personal NYC MTA bus tracker for the Greenpoint neighborhood of Brooklyn.

🚌 &nbsp;&nbsp;&nbsp; 🚌 &nbsp;&nbsp;&nbsp; 🚌

## made with

- [TypeScript](https://www.typescriptlang.org), [React](https://react.dev), and [Vite](https://vitejs.dev/)
- [MTA Bus Time API](https://bustime.mta.info/wiki/Developers/) and [transit data](http://web.mta.info/developers/developer-data-terms.html)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Leaflet](https://leafletjs.com) and [React Leaflet](https://react-leaflet.js.org)
- [Mapbox Studio](https://studio.mapbox.com)
- [QGIS](https://qgis.org/)

## active alert for the G train

No G between Bedford-Nostrand Avs, Brooklyn and Court Sq, Queens Until 8:30 PM Sunday, Aug 11
G runs between Church Av and Bedford-Nostrand Avs, the last stop.
Free B98 shuttle buses make stops between Bedford-Nostrand Avs and Court Sq.

These shuttles are barely being handled. Need to add map data for this route.

Need to handle changes like this better.

## service alert for B48

<s>B48 stops along Lorimer St between Grand St and Meeker Ave are closed.</s>

Construction at the Lorimer Street L Station is complete. Map data needs to be restored.

## local use

- Clone this repo.
- Add local [security certificates](https://www.makeswift.com/blog/accessing-your-local-nextjs-dev-server-using-https) to the project root.
- Create the file `.env.local` in the project root.
- Request a Bus Time API key from [the MTA](https://register.developer.obanyc.com/).
- Add `VITE_BUS_TRACKER_BUS_TIME_API_KEY = '<your API key>'` to `.env.local`.
- Create an account at [Mapbox](https://www.mapbox.com) and request an access token.
- Add `VITE_BUS_TRACKER_MAPBOX_TOKEN = '<your access token>'` to `.env.local`.
- In the terminal: `yarn`.
- In the terminal: `yarn dev`.
- In a separate terminal: `yarn dev:https`.
