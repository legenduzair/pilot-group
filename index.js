import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import geolib from "geolib";


const app = express();

const PORT = 5000;

const issLocatorApi = 'http://api.open-notify.org/iss-now.json';
const reverseGeoApi = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=50.8028,-121.0255&key=AIzaSyDIExpGgbAfyoce9lzBp1kFoxOmhgmmTEI';

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
      const issApi = await axios.get(issLocatorApi);
      const issPosition = issApi.data.iss_position;
      console.log(issPosition);
      
      const distance = geolib.getPreciseDistance(targetAddressCoordinates, issPosition);
      console.log(distance);

      const distanceInMiles = geolib.convertDistance(distance, 'mi');
      console.log(distanceInMiles);

      res.status(200).json({message: 'Success'});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unable to fetch information on the ISS tracker."});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});