import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

import routesSessions from './src/routes/routesSessions.js';
import { connectDB } from "./src/models/sessionModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use('/', routesSessions);

if (process.env.NODE_ENV !== "production"){
  const vite = await createViteServer({
    server: {middlewareMode: true}, 
    appType: "spa",
  })
  app.use(vite.middlewares); 
} else {
  app.use(express.static(path.join(__dirname, "dist/client")));
    app.all("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist/client", "index.html"));
  });
}

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Servern kör på port ${port}`);
    });
  } catch (err: unknown) {
    console.error('fel vid start', err);
  }
})();
