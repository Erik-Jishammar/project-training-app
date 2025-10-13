import {Request, Response } from "express"
import { getCollection, Session, Exercise } from "../models/sessionModel.js";


export const getSession = async (req: Request, res: Response) => {
  try {
    const collection = getCollection();
    const sessions = await collection.find({}).toArray();
    res.json(sessions);  // Returnerar: en array av sparade sessions.
  } catch (error) {
    console.error("Problem vid hämtning från databasen", error);
    res.status(500).json({ error: "Kunde inte hämta övningar" });
  }
};

export const createSession = async (req: Request<{},{}, Session>, res: Response) => {
  try {
    const collection = getCollection();
    const newSession: Session = req.body; 
     if (!newSession._id) {
      newSession._id = Date.now().toString(); 
    }
    newSession.exercises = newSession.exercises || [];

    const result = await collection.insertOne(newSession);
    res.json(newSession);
  } catch (err) {
    console.error("Problem vid sparande i databasen", err);
    res.status(500).json({ error: "Kunde inte spara session" });
  }
};
export const updateSession = async (req: Request <{id: string},{}, Partial <Session>>,
   res: Response) => {
  try {
    const collection = getCollection();
    const { id } = req.params;
    const updateSession: Partial<Session> = req.body;

    await collection.updateOne(
      { _id: id },
      { $set: updateSession }
    );  

    res.json({ message: "Session uppdaterad" });
  } catch (error) {
    console.error("Problem vid uppdatering", error);
    res.status(500).json({ error: "Gick inte att uppdatera träningspasset" });
  }
};

export const deleteSession = async (req: Request <{id:string}> , res: Response) => {
  try {
    const collection = getCollection();
    const { id } = req.params;

    await collection.deleteOne({ _id:id });

    res.json({ message: "Pass raderad" });
  } catch (error) {
    console.error("Funkade inte att radera sessionen", error);
    res.status(500).json({ error: "gick inte att radera session" });
  }
};
