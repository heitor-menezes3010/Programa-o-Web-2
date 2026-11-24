// Uso: node criarUsuario.js <login> <senha>
// Ex.: node criarUsuario.js admin 123456
const bcrypt = require('bcryptjs');
const db = require('./db');

async function main() {
  const [login, senha] = process.argv.slice(2);

  if (!login || !senha) {
    console.log('Uso: node criarUsuario.js <login> <senha>');
    process.exit(1);
  }

  try {
    const hash = await bcrypt.hash(senha, 10); // 10 = custo do hash
    await db.execute('INSERT INTO usuarios (login, senha) VALUES (?, ?)', [login, hash]);
    console.log(`✅ Usuário "${login}" criado com senha criptografada.`);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log(`⚠️  O login "${login}" já existe.`);
    } else {
      console.error('Erro:', error.message);
    }
  } finally {
    await db.end();
  }
}

main();
