// Importações
const http = require("http");
const express = require("express");

// Instanciando uma app do Express
const app = express();

// Definindo Rotas da aplição
app.get("/", function(request, response) {
    response.send("<h1>API executando!</h1>");
});

// Obter todos usuários
app.get("/users", (req, res) => {
    const arr = [ {nome: "Juca"}, {nome: "Zé"} ];

    res.status(200).json(arr); //gerando a resposta ao cliente
});


// Executando express no servidor HTTP
http.createServer(app)
    .listen(3000, () => {
        console.log("Servidor executando na porta 3000")
    });