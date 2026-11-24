const API_BASE = 'http://localhost:3000/api';

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const form = document.querySelector('#form-func')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const sEmail = document.querySelector('#m-email')
const sAdmissao = document.querySelector('#m-admissao')
const sDepartamento = document.querySelector('#m-departamento')
const sStatus = document.querySelector('#m-status')

let itens = []
let departamentos = []
let editingId // id do funcionário em edição (undefined = novo cadastro)

/* ---------- Sessão / autenticação ---------- */

document.querySelector('#usuario-logado').textContent =
  localStorage.getItem('usuario') || ''

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  window.location.replace('login.html')
}

// fetch que já envia o token. Se o servidor responder 401, a sessão expirou.
async function authFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (response.status === 401) {
    logout()
    throw new Error('Sessão expirada')
  }
  return response
}

/* ---------- Utilitários ---------- */

// Evita que texto digitado vire HTML na tabela
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
))

const formatarData = d => {
  if (!d) return '-'
  const [ano, mes, dia] = d.split('-')
  return `${dia}/${mes}/${ano}`
}

const formatarSalario = v =>
  Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

/* ---------- Modal ---------- */

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    const f = itens[index]
    sNome.value = f.nome
    sFuncao.value = f.funcao
    sSalario.value = f.salario
    sEmail.value = f.email || ''
    sAdmissao.value = f.data_admissao || ''
    sDepartamento.value = f.departamento_id
    sStatus.value = f.status
    editingId = f.id
  } else {
    form.reset()
    editingId = undefined
  }
}

function editItem(index) {
  openModal(true, index)
}

/* ---------- CRUD ---------- */

async function deleteItem(index) {
  if (!itens[index]?.id) return
  if (!confirm('Deseja realmente excluir este funcionário?')) return

  try {
    await authFetch(`${API_BASE}/funcionarios/${itens[index].id}`, { method: 'DELETE' })
    loadItens()
  } catch (error) {
    console.error('Erro ao deletar:', error)
  }
}

function insertItem(item, index) {
  let tr = document.createElement('tr')
  tr.innerHTML = `
    <td>${esc(item.nome)}</td>
    <td>${esc(item.funcao)}</td>
    <td>${esc(item.departamento || '-')}</td>
    <td>R$ ${formatarSalario(item.salario)}</td>
    <td>${formatarData(item.data_admissao)}</td>
    <td>${esc(item.status)}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

form.onsubmit = async e => {
  e.preventDefault() // a validação "required" do HTML já rodou antes daqui

  const dados = {
    nome: sNome.value,
    funcao: sFuncao.value,
    salario: sSalario.value,
    email: sEmail.value,
    data_admissao: sAdmissao.value,
    status: sStatus.value,
    departamento_id: sDepartamento.value
  }

  try {
    const url = editingId !== undefined
      ? `${API_BASE}/funcionarios/${editingId}` // UPDATE
      : `${API_BASE}/funcionarios`              // CREATE
    const method = editingId !== undefined ? 'PUT' : 'POST'

    const response = await authFetch(url, { method, body: JSON.stringify(dados) })
    if (!response.ok) throw new Error('Erro ao salvar')

    modal.classList.remove('active')
    editingId = undefined
    loadItens()
  } catch (error) {
    console.error('Erro ao salvar:', error)
    alert('Erro ao salvar. Verifique se o servidor está rodando.')
  }
}

const getItensBD = async () => {
  try {
    const response = await authFetch(`${API_BASE}/funcionarios`)
    if (!response.ok) throw new Error('Erro ao carregar')
    return await response.json()
  } catch (error) {
    console.error('Erro API:', error)
    return []
  }
}

async function loadDepartamentos() {
  try {
    const response = await authFetch(`${API_BASE}/departamentos`)
    if (!response.ok) throw new Error('Erro ao carregar departamentos')
    departamentos = await response.json()
    sDepartamento.innerHTML = departamentos
      .map(d => `<option value="${d.id}">${esc(d.nome)}</option>`)
      .join('')
  } catch (error) {
    console.error('Erro API:', error)
  }
}

async function loadItens() {
  itens = await getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => insertItem(item, index))
}

// Carrega ao iniciar
loadDepartamentos()
loadItens()
