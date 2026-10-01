// config inicial: chamar o express (vai procurar o módulo)
const express = require('express')
const app = express() // Inicializar o app

// depois do db
const mongoose = require('mongoose')

// Model (entidade Person)
const Person = require('./models/Person')

// forma de ler JSON: utilizar MIDDLEWARES
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rota inicial GET - endpoint
app.get('/', (req, res) => {
  // mostrar a requisição / resposta que vai ser JSON
  res.json({ message: 'Oi Express' })
})

// criação de dados - POST /person
app.post('/person', async (req, res) => {
  const { name, salary, approved } = req.body

  const person = { name, salary, approved }

  try {
    await Person.create(person)
    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// CONEXÃO NA MÁQUINA LOCAL: se funcionar vai no THEN, senão aponta o ERRO
mongoose
  .connect('mongodb://localhost:27017/ARQUIVO')
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000) // entregar a porta
  })
  .catch((err) => console.log(err))
