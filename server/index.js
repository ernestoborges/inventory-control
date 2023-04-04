const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");

const app = express();
const port = 3000;

const mongoCredentials = {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    cluster: process.env.MONGO_CLUSTER,
    database: process.env.MONGO_DATABASE,
    hash: process.env.MONGO_HASH
}

const uri = `mongodb+srv://${mongoCredentials.username}:${mongoCredentials.password}@${mongoCredentials.cluster}.g32v3ox.mongodb.net/TokeTok?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true });

const clientSchema = {
    code: String,
    name: String,
    cpf: Number,
    address: {
        street: String,
        district: String,
        number: Number,
        city: String,
        state: String,
        complement: String
    },
    phone: Number,
    entity: String
}

const Client = mongoose.model("Client", clientSchema)

app.use(bodyParser.json());
app.use(cors());

app.get('/produtos', (req, res) => {
    res.send('Listagem de produtos');
});

app.get("/clientes", async (req, res) => {
    const result = await Client.find({})
    console.log(result)
    res.send(JSON.stringify(result));
})

app.post("/add/clientes", async (req, res) => {

    const { cpf, code } = req.body;

    const existingCPF = Client.findOne({cpf})
    if(existingCPF){
        return res.status(400).json({ message: "CPF já cadastrado" });
    }

    const existingCode = Client.findOne({code})
    if(existingCode){
        return res.status(400).json({ message: "Código já cadastrado" });
    }

    const client = new Client(req.body)
    client
        .save()
        .then(client => {
            res.send(client)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Error saving client");
        });
})

app.get("/clientes/code", async (req, res) => {
    const result = await Client.find({}, { _id: 0, code: 1 });
    res.send(result.map(item => item.code));
})

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
