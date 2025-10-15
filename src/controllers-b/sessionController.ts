import { Request, Response } from "express";
import { getCollection } from "../models/sessionModel.js";
import type { Session } from "../models/types.js";

export const getSessions = async (_req: Request, res: Response) => {
  try {
    const collection = getCollection();
    const sessions = await collection.find({}).toArray();
    res.json(sessions);
  } catch (error) {
    console.error("Problem vid hämtning från databasen", error);
    res.status(500).json({ error: "Kunde inte hämta sessions" });
  }
};

export const createSession = async (req: Request<{}, {}, Session>, res: Response) => {
  try {
    const collection = getCollection();
    const newSession: Session = req.body;

    if (!newSession._id) newSession._id = Date.now().toString();
    newSession.exercises = newSession.exercises || [];

    await collection.insertOne(newSession);
    res.json(newSession);
  } catch (error) {
    console.error("Problem vid sparande i databasen", error);
    res.status(500).json({ error: "Kunde inte spara session" });
  }
};

export const updateSession = async (
  req: Request<{ id: string }, {}, Partial<Session>>,
  res: Response
) => {
  try {
    const collection = getCollection();
    const { id } = req.params;
    const updateData = req.body;

    await collection.updateOne({ _id: id }, { $set: updateData });

    res.json({ message: "Session uppdaterad" });
  } catch (error) {
    console.error("Problem vid uppdatering", error);
    res.status(500).json({ error: "Gick inte att uppdatera sessionen" });
  }
};

export const deleteSession = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const collection = getCollection();
    const { id } = req.params;

    await collection.deleteOne({ _id: id });

    res.json({ message: "Session raderad" });
  } catch (error) {
    console.error("Problem vid radering", error);
    res.status(500).json({ error: "Gick inte att radera sessionen" });
  }
};