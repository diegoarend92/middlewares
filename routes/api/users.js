const express = require('express');

const routes = express.Router();

let users = require('../../users')



function validateUser (req, res, next) {
  const user  = req.body;
  let requiredKeys = ['username','email','password']

  let validate = requiredKeys.every((currentkey) => Object.keys(user).includes(currentkey))
  if (validate) {
    next();
  }

  return res.status(400).send('INFORMACOES INCOMPLETAS')
}

routes.post('/', validateUser, (req, res) => {
    const content = [...users, req.body]
    users = content
    res.status(201).json(users)
    })

routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;
    const user = users.find((user) => user.id === id)

    if (!user) {
        return res.status(400).json({"message": "user nao encontrado"})
    }

    users=users.map((user) => user.id === id ? content : user) 
    res.status(200).json(users)
})
routes.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const newPassword = req.body.password;
  const user = users.find((user) => user.id === id)

  if (!user) {
      return res.status(400).json({"message": "user nao encontrado"})
  }

  user.password=newPassword

  users=[...users,user]
  res.status(200).json(users)
})


routes.delete('/:id', (req, res) => {
const id = Number(req.params.id);
const content = req.body;

const user = users.find((user) => user.id === id)

if (!user) {
    return res.status(400).json({"message": "user nao encontrado"})
}

users=users.filter((user) => user.id !== id) 

res.status(200).json(users)
})

    
routes.get('/', (req, res) => {
    res.status(200).json(users)
})


module.exports = routes;