const mysql = require('mysql2/promise');

// Configuração da conexão com o MySQL.
// Os valores padrão servem para o XAMPP/phpMyAdmin local; para mudar,
// defina as variáveis de ambiente DB_HOST, DB_USER, DB_PASSWORD, DB_NAME e DB_PORT.
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'crud_funcionarios',
  waitForConnections: true,
  connectionLimit: 10
};

// Pool de conexões: reaproveita conexões abertas, o que é mais eficiente
// do que abrir uma nova conexão a cada requisição.
const db = mysql.createPool(dbConfig);

// Testa se o banco está acessível (usado ao iniciar o servidor).
async function testConnection() {
  const connection = await db.getConnection();
  try {
    await connection.ping();
    console.log(`✅ Conectado ao MySQL (${dbConfig.host}:${dbConfig.port}/${dbConfig.database})`);
  } finally {
    connection.release();
  }
}

module.exports = { db, testConnection };
