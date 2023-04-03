const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
const port = 3000;

const mongoCredentials = {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    cluster: process.env.MONGO_CLUSTER,
    database: process.env.MONGO_DATABASE,
    hash: process.env.MONGO_HASH
}

const uri = `mongodb+srv://${mongoCredentials.username}:${mongoCredentials.password}@${mongoCredentials.cluster}.g32v3ox.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) throw err
    else console.log('Conectado ao banco de dados!');
});

app.use(bodyParser.json());

app.get('/produtos', (req, res) => {
    res.send('Listagem de produtos');
});

app.get("/clientes", async (req, res) => {
    const db = client.db(mongoCredentials.database);
    const clientes = await db.collection('clients').find().toArray();
    res.send(clientes);
})

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
