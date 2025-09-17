import { getCollection } from "../models/exerciseModel.js";

export const getExercises = async (req, res) => {
  // Hämta exercises
  try {
    const collection = getCollection();
    const exercises = await collection.find({}).toArray();
    res.json(exercises);
  } catch (error) {
    console.error("Problem vid hämtning från databasen", error);
    res.status(500).json({ error: "Kunde inte hämta övningar" });
  }
};

export const createExercise = async (req, res) => {
  // skapa ny övning
  try {
    const collection = getCollection();
    const newExercise = req.body;
    const result = await collection.insertOne(newExercise);
    res.json({
      message: "Övning mottagen",
      exercise: { ...newExercise, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Problem vid sparande i databasen", error);
    res.status(500).json({ error: "Kunde inte spara övningen" });
  }
};

export const updateExercise = async (req, res) => {
  try {
    const collection = getCollection();
    const { id } = req.params;
    const updateExercise = req.body;
    await collection.updateOne({ ID: Number(id) }, { $set: updateExercise }); // FIX här
    res.json({ message: "Övning uppdaterad" });
  } catch (error) {
    console.error("Problem vid uppdatering", error);
    res.status(500).json({ error: "Gick inte att uppdatera övningen" });
  }
};
export const deleteExercise = async (req, res) => {
  try {
    const collection = getCollection(); // Radera övning
    const { id } = req.params;
    await collection.deleteOne({ ID: Number(id) });
    res.json({ message: "övning raderad" });
  } catch (error) {
    console.error("funkade inte att radera övning", error);
    res.status(500).json({ error: "gick inte att radera övningen" });
  }
};
