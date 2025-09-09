import express from "express";
import cors from "cors";
import {MongoClient} from "mongodb";
const app = express();

const port = 3000;

app.use(cors()); 
app.use(express.json()); 


const uri = "mongodb://127.0.0.1:27017" // MongoDB setup
const client = new MongoClient(uri); 

app.get('/', (req, res) => {
    res.send('Express server funkar');
});

app.post('/form',async (req, res) => {
    const newExercise = req.body; // Hämta objekt från frontend
    console.log('Data mottagen', newExercise);
    
    async function saveExercise(data) {
        try {
            await client.connect();
            const db = client.db("trainingApp");
            const collection = db.collection("exercises");
            await collection.insertOne(data);
        } catch (error) {
            console.log("Problem vid sparande i databasen", error);
        } finally {
            await client.close();
        }
    }

    await saveExercise(newExercise)
    res.json({Messege: 'Övning mottagen', exercise: newExercise})
});

app.listen(port, () => {
    console.log(`Servern kör på http://localhost:${port}`);
});

// app.Get - hämta och visa data

// app.Post - skicka data -> skicka formulär/data till databas

// app.Pu:ID - uppdatera data - koppla ihop med "editbtn"

// app.delete:ID - ta bort data -> koppla ihop med "removebtn"