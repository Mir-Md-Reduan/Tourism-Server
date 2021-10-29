const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://<username>:<password>@cluster0.qdqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        console.log('Data Base Connected');
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello From Assignment 11');
});

app.listen(port, (req, res) => {
    console.log("listening From Web and Port No:", port);
})