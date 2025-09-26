import express from "express";
import cors from "cors";

import routesExercises from './routes/routesExercises.js'
import { connectDB } from "./models/exerciseModel.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use('/', routesExercises);


(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log('servern kör på http://localhost:3000');
    });
  } catch (err) {
    console.error('fel vid start', err);
  }
})();
