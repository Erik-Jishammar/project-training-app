import express, { Request, Response } from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

import routesSessions from './src/routes/routesSessions.js';
import { connectDB } from "./src/models/sessionModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use('/api', routesSessions);

if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
  app.use(vite.middlewares);
} else {
  // In production, server.js lives in dist/, and the built client is in dist/client
  const clientDist = join(__dirname, "client");

  app.use(express.static(clientDist));
  
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(join(clientDist, "index.html"));
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
