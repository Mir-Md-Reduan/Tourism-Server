const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qdqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const uri = `mongodb+srv://TorismPlaces:${process.env.DB_PASS}@cluster0.qdqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();

        const database = client.db("Torism");
        const userCollection = database.collection("Places");
        console.log("db Connected")
        app.get('/places', async (req, res) => {
            const cursor = userCollection.find({});
            const places = await cursor.toArray();
            res.send(places);
        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello From Assignment 11');
});

app.listen(port, (req, res) => {
    console.log("listening From Web and Port No:", port);
})