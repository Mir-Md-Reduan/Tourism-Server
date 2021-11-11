const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qdqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const uri = `mongodb+srv://TorismPlaces:${process.env.DB_PASS}@cluster0.qdqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();

        const database = client.db("Torism");
        const userCollection = database.collection("Places");
        const userBooking = database.collection("Booking");
        console.log("db Connected")
        app.get('/places', async (req, res) => {
            const cursor = userCollection.find({});
            const places = await cursor.toArray();
            res.send(places);
        })
        app.get('/admin', async (req, res) => {
            const cursor = userCollection.find({});
            const places = await cursor.toArray();
            res.send(places);
        })

        // POST API
        app.post('/booking', async (req, res) => {
            const service = req.body;
            console.log('Hit the post API', service);
            const result = await userBooking.insertOne(service);
            console.log(result);
            res.json(result);

        });

        // get single product
        app.get("/singlePlace/:id", async (req, res) => {
            const result = await userCollection
                .find({ _id: ObjectId(req.params.id) })
                .toArray();
            res.send(result[0]);
        });
        // Get All My Orders
        app.get("/myOrders/:email", async (req, res) => {
            const result = await userBooking
                .find({ email: req.params.email })
                .toArray();
            res.send(result);
        });

        /// delete order

        app.delete("/delteOrder/:id", async (req, res) => {
            const result = await userBooking.deleteOne({
                _id: ObjectId(req.params.id),
            });
            res.send(result);
        });

        app.post('/addTourSpot', async (req, res) => {
            const service = req.body;
            console.log('Hit the post API', service);
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);

        });
    }
    finally {
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