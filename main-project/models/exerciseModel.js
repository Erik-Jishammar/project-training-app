import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017"; // MongoDB setup
const client = new MongoClient(uri);

let collection; 

 async function connectDB () {
    
 
    try {
        await client.connect();
        const db = client.db("trainingApp");
        collection = db.collection("exercises");
        console.log('MongoDB ansluten');

    } catch(err){
        console.log('Misslyckades med att ansluta till mongoDB', err);}
        };

 function getCollection(){
    if( !collection){
        throw new Error ('MongoDB collection är inte ansluten ännu')
    }
    return collection;
}

export {getCollection, connectDB}; 