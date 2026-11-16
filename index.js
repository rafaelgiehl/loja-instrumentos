const express = require('express');
const mongoose = require('mongoose');
const Instrumento = require('./models/Instrumento');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/instrumentosDB')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.get('/instrumento/add',  (req, res) => {
    res.render('instrumento/add');
});

app.post('/instrumento/add', async (req, res) => {
    try {
        const novoInstrumento = new Instrumento(req.body);
        await novoInstrumento.save();
        res.render('instrumento/addok', { instrumento: novoInstrumento });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar instrumento');
    }
});

app.get('/instrumento/list', async (req, res) => {
    try {
        const instrumentos = await Instrumento.find();
        res.render('instrumento/lst', { instrumentos });
    } catch (error) {
        console.error(err);
        res.status(500).send('Erro ao listar instrumentos');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});