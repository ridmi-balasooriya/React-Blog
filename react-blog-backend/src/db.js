import { MongoClient } from "mongodb";

let db;

async function connectToDb(cb){
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.zfjsjya.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();

    db = client.db('react-blog-db');

    cb(); //server loading function. Load after database connected.
}

export{
    db,
    connectToDb,
};