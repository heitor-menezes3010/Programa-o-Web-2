const mongoose = require('mongoose')

// Entidade Person -> coleção "people" no MongoDB
const Person = mongoose.model('Person', {
  name: String,
  salary: Number,
  approved: Boolean,
})

module.exports = Person
