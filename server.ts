import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import routesSessions from './src/routes/routesSessions';
import { connectDB } from "./src/models/sessionModel.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use('/', routesSessions);

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log('servern kör på ${PORT}');
    });
  } catch (err: unknown) {
    console.error('fel vid start', err);
  }
})();
