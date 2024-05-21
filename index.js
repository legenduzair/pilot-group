import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import geolib from "geolib";


const app = express();

const PORT = 5000;

const issLocatorApi = 'http://api.open-notify.org/iss-now.json';

const targetAddressCoordinates = {
    latitude: 53.4912462, 
    longitude: -2.2438893
};

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// API Route

app.get('/iss-tracker', async (req, res) => {
    try {
      const issApiResponse = await axios.get(issLocatorApi);
      const issPosition = issApiResponse.data.iss_position;
      console.log(issPosition);
      
      const distance = geolib.getPreciseDistance(targetAddressCoordinates, issPosition);
      console.log(distance);

      const distanceInMiles = Math.round(geolib.convertDistance(distance, 'mi'));
      console.log(distanceInMiles);

      const reverseGeoApiResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${issPosition.latitude},${issPosition.longitude}&key=AIzaSyDIExpGgbAfyoce9lzBp1kFoxOmhgmmTEI`);
      const results = reverseGeoApiResponse.data.results;

      const country = results.find(r => r.types.includes('country'));
      console.log(country);

      res.status(200).json({
        distanceInMiles: `The ISS is currently ${distanceInMiles} miles away from The Pilot Group HQ.`,
        country: country ? `The ISS is currently over ${country.formatted_address}` : 'The ISS is currently not over a country.',
        message: 'Successfully acquired country and distance in miles'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unable to fetch information on the ISS tracker."});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});