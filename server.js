require('dotenv').config();
const loggerMiddleware = require('./src/middleware/logger');
const valorProdutoMiddleware = require('./src/middleware/valor');
const valorDobradoMiddleware = require('./src/middleware/valorDobrado')
const express = require('express');
const app = express();
const port = 3000;

// Middleware para formatar o body para JSON
app.use(express.json());
//Para formatar os dados do formulário (x-www-form-urlencoded)
app.use(express.urlencoded({extended: true}));

app.use(loggerMiddleware);

app.use(valorProdutoMiddleware);

app.use(valorDobradoMiddleware)

app.get('/', function(req, res){
    res.send('Ola, mundo. meu nome é ' + process.env.nome);
});

app.post('/produtos', (req, res) => {
    let produto = req.body
    res.send(`O produto foi criado! Nome: ${produto.nome}, Valor: ${produto.preco}`)
});

app.put('/produtos/:id', (req, res) => {
    let id = req.params.id
    res.send(`O produto ${id} foi alterado`)    
});

app.delete('/produtos/:id', (req, res) => {
    let id = req.params.id
    res.send(`O produto ${id} foi deletado.`)
});

app.listen(port, function(){
    console.log('Servidor rodando na porta ' + port);
});