// IMPORTAÇÕES
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const logger = require('./middlewares/logger');

require("dotenv").config();

// CONEXÃO COM O BANCO DE DADOS
const { MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL, {})
    .then(() => { 
        console.log("Conectado ao MongoDB."); 
    })
    .catch((err) => { 
        console.log("Falha ao conectar com o MongoDB: ", err);
    });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', logger, indexRouter);
app.use('/auth', logger, require('./routes/auth'));
app.use('/users', logger, usersRouter);

module.exports = app;
