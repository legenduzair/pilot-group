import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const PORT = 5000;

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// API Route



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});