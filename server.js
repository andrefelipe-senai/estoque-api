import db from './src/database/database.js'

import {loggerMiddleware} from './src/middleware/index.js';
import express, {json, urlencoded} from 'express';

const app = express();
const port = 3000;

// Middleware para formatar o body para JSON
app.use(json());
//Para formatar os dados do formulário (x-www-form-urlencoded)
app.use(urlencoded({extended: true}));

app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.status(200).json({
        "status": "OK",
        "codigo": 200,
        "mensagem": `Bem Vindo!`
    });
});

app.post('/produtos', (req, res) => {
    let produto = req.body;
    res.status(201).json({
        "status": "Criado",
        "codigo": 200,
        "mensagem": `O produto foi criado! Nome: ${produto.nome}, Valor: ${produto.preco}`
    });
});

app.put('/produtos/:id', (req, res) => {
    let id = req.params.id;
    let produto = req.body;
    res.status(200).json({
        "status": "Criado",
        "codigo": 200,
        "mensagem": `O produto ${id} foi alterado! Nome: ${produto.nome}, Valor: ${produto.preco}`
    });
});

app.delete('/produtos/:id', (req, res) => {
    let id = req.params.id;
    let produto = req.body;
    res.status(200).json({
        "status": "Deletado",
        "codigo": 200,
        "mensagem": `O produto ${id} foi Deletado! Nome: ${produto.nome}, Valor: ${produto.preco}`
    });
});


app.get('/usuarios', (req, res) => {

    db('usuarios').select('*')
        
        .then((usuarios) => {
            res.status(200).json({
            "status": "OK",
            "codigo": 200,
            "mensagem": "usuarios"
            })        
        })

        .catch((error) => {
            console.log('Erro ao consultar os usuários', error)
            res.status(500).json({
                "status": "Erro",
                "codigo": 500,
                "mensagem": "Erro ao consular os usuários"
            })     
        }) 

});


app.listen(port, () => {console.log('Servidor rodando na porta ' + port);});