const express = require('express')

const routes = express.Router()

let produtos = require('../../products')

routes.post('/', (req, res) => {
    console.log(req.body)
    const content = [...produtos, req.body]
    produtos = content
    res.status(201).json(produtos)
    })

routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;
    const produto = produtos.find((produto) => produto.id === id)

    if (!produto) {
        return res.status(400).json({"message": "Produto nao encontrado"})
    }

    produtos=produtos.map((produto) => produto.id === id ? content : produto) 
    res.status(200).json(produtos)
})


routes.delete('/:id', (req, res) => {
const id = Number(req.params.id);
const content = req.body;

const produto = produtos.find((produto) => produto.id === id)

if (!produto) {
    return res.status(400).json({"message": "Produto nao encontrado"})
}

produtos=produtos.filter((produto) => produto.id !== id) 

res.status(200).json(produtos)
})

    
routes.get('/', (req, res) => {
    res.status(200).json(produtos)
})


module.exports = routes;