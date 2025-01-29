'use strict';

const express = require('express');
const { boat, ROUTE_500 } = require('./model');

const app = express();
app.use(express.json());

// Rota GET para buscar barcos
app.get('/boat/:id', async (req, res) => {
    try {
        const data = await boat.read(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        if (err.code === 'E_NOT_FOUND') {
            return res.status(404).send();
        }
        if (req.params.id === ROUTE_500) {
            return res.status(500).send();
        }
        res.status(500).send();
    }
});

// Rota POST não permitida para barcos
app.post('/boat/:id', (req, res) => {
    res.status(405).send(); // Método não permitido
});

// Rota para rotas não encontradas
app.all('*', (req, res) => {
    res.status(404).send();
});

module.exports = app;
