import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;
// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

(async () => {
  try {
    const uri = "mongodb://127.0.0.1:27017"; // MongoDB setup
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("trainingApp");
    const collection = db.collection("exercises");

    app.get("/exercises", async (req, res) => {
      try {
        const exercises = await collection.find({}).toArray();
        res.json(exercises);
      } catch (error) {
        console.log("Problem vid hämtning från databasen", error);
        res.status(500).json({ error: "Kunde inte hämta övningar" });
      }
    });

    app.post("/form", async (req, res) => {
      const newExercise = req.body; // Hämta objekt från frontend
      console.log("Data mottagen", newExercise);

      try {
        const result = await collection.insertOne(newExercise);
        res.json({
          message: "Övning mottagen",
          exercise: { ...newExercise, _id: result.insertedId },
        });
      } catch (error) {
        console.log("Problem vid sparande i databasen", error);
        res.status(500).json({ error: "Kunde inte spara övningen" });
      }
    });

    app.put("exercises/:id", async(req,res) => {
      const { id } = req.params;
      const updateExercise = req.body;
      await collection.updateOne({ ID: Number(id) }, {$set: updateExercise});
      res.json({messege: "uppdaterad"})
    })

    app.delete("exercises/;id", async(req, res) => {
      const { id } = req.params;
      await collection.deleteOne({ID: Number(id) }); 
      res.json ({messege:"raderad"});
    })

    app.listen(port, () => {
      console.log(`Servern kör på http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Misslyckades med att koppla till mongodb", err);
  }
})();
