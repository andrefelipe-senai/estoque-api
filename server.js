import dotenv from 'dotenv';
dotenv.config();

import {loggerMiddleware, valorProdutoMiddleware} from './src/middleware/index.js';
import express, {json, urlencoded} from 'express';

const app = express();
const port = 3000;

// Middleware para formatar o body para JSON
app.use(json());
//Para formatar os dados do formulário (x-www-form-urlencoded)
app.use(urlencoded({extended: true}));

app.use(loggerMiddleware);
app.use(valorProdutoMiddleware);

app.get('/', function(req, res){
    res.send('Ola, mundo. meu nome é ' + process.env.nome);
});

app.post('/produtos', (req, res) => {
    let produto = req.body
    //res.send(`O produto foi criado! Nome: ${produto.nome}, Valor: ${produto.preco}`)
    res.status(201).json({
        "status": "Criado",
        "codigo": 200,
        "mensagem": `O produto foi criado! Nome: ${produto.nome}, Valor: ${produto.preco}`
    })
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