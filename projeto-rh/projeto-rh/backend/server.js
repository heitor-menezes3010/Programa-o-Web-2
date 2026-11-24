const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Em produção, use uma variável de ambiente (process.env.JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_de_aula_troque_em_producao';

/* ============================================================
   AUTENTICAÇÃO
   ============================================================ */

// POST /api/login  -> valida login/senha e devolve um token JWT
app.post('/api/login', async (req, res) => {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ error: 'Informe usuário e senha' });
    }

    const [rows] = await db.execute(
      'SELECT id, login, senha FROM usuarios WHERE login = ?',
      [login]
    );
    const usuario = rows[0];

    // Compara a senha digitada com o hash salvo no banco
    const senhaOk = usuario && (await bcrypt.compare(senha, usuario.senha));

    if (!senhaOk) {
      // Mesma mensagem para usuário inexistente ou senha errada (não revela qual falhou)
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, login: usuario.login },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ success: true, token, usuario: { id: usuario.id, login: usuario.login } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware: bloqueia rotas para quem não enviou um token válido
function autenticar(req, res, next) {
  const header = req.headers.authorization || '';
  const [tipo, token] = header.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

/* ============================================================
   DEPARTAMENTOS (usado no <select> do formulário)
   ============================================================ */

app.get('/api/departamentos', autenticar, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM departamentos ORDER BY nome');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ============================================================
   FUNCIONÁRIOS (CRUD protegido)
   ============================================================ */

// GET /api/funcionarios
app.get('/api/funcionarios', autenticar, async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT f.*, d.nome AS departamento
      FROM funcionarios f
      LEFT JOIN departamentos d ON d.id = f.departamento_id
      ORDER BY f.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/funcionarios
app.post('/api/funcionarios', autenticar, async (req, res) => {
  try {
    const { nome, funcao, salario, email, data_admissao, status, departamento_id } = req.body;

    if (!nome || !funcao || !salario || !departamento_id) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    const [result] = await db.execute(
      `INSERT INTO funcionarios
        (nome, funcao, salario, email, data_admissao, status, departamento_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        funcao,
        parseFloat(salario),
        email || null,
        data_admissao || null,
        status || 'Ativo',
        departamento_id
      ]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/funcionarios/:id
app.put('/api/funcionarios/:id', autenticar, async (req, res) => {
  try {
    const { nome, funcao, salario, email, data_admissao, status, departamento_id } = req.body;

    if (!nome || !funcao || !salario || !departamento_id) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    await db.execute(
      `UPDATE funcionarios
       SET nome = ?, funcao = ?, salario = ?, email = ?,
           data_admissao = ?, status = ?, departamento_id = ?
       WHERE id = ?`,
      [
        nome,
        funcao,
        parseFloat(salario),
        email || null,
        data_admissao || null,
        status || 'Ativo',
        departamento_id,
        req.params.id
      ]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/funcionarios/:id
app.delete('/api/funcionarios/:id', autenticar, async (req, res) => {
  try {
    await db.execute('DELETE FROM funcionarios WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('Endpoints: POST /api/login | /api/departamentos | /api/funcionarios (protegidos por token)');
});
