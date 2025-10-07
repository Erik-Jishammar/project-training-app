import express from "express";
import cors from "cors";

import routesSessions from './src/routes/routesSessions';
import { connectDB } from "./src/models/sessionModel.ts";

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use('/', routesSessions);


(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log('servern kör på http://localhost:3000');
    });
  } catch (err: unknown) {
    console.error('fel vid start', err);
  }
})();
