const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_funcionarios',
  dateStrings: true // devolve DATE como 'AAAA-MM-DD' (evita problema de fuso horário)
};

module.exports = mysql.createPool(dbConfig);
