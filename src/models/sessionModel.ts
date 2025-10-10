import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

export interface Exercise {
  _id?: string;
  övning: string;
  set: number;
  reps: number;
  vikt: number;
  kommentar?: string;
}
export interface Session {
  _id?: string;
  split: string;
  date: string;
  exercises: Exercise[];
}
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"; // MongoDB setup 
const client = new MongoClient(uri);

let collection: Collection<Session>;

 export async function connectDB(): Promise<void> {
  try {
    await client.connect();
    const db = client.db("trainingApp");
    collection = db.collection<Session>("sessions");
    console.log("MongoDB ansluten");
  } catch (err) {
    console.log("Misslyckades med att ansluta till mongoDB", err);
  }
}

export function getCollection(): Collection<Session> {
  if (!collection) throw new Error("MongoDB collection är inte ansluten ännu");
  return collection;
}

