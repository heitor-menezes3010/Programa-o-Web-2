const API_LOGIN = 'http://localhost:3000/api/login';

const form = document.querySelector('#form-login');
const inputLogin = document.querySelector('#login');
const inputSenha = document.querySelector('#senha');
const msgErro = document.querySelector('#msg-erro');
const btnEntrar = document.querySelector('#btnEntrar');

// Se já está logado, não precisa ver a tela de login
if (localStorage.getItem('token')) {
  window.location.replace('index.html');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // impede o recarregamento da página
  msgErro.textContent = '';
  btnEntrar.disabled = true;
  btnEntrar.textContent = 'Entrando...';

  try {
    const response = await fetch(API_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: inputLogin.value.trim(),
        senha: inputSenha.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      msgErro.textContent = data.error || 'Não foi possível entrar.';
      return;
    }

    // Credenciais corretas: guarda a "flag" de sessão (token JWT) e vai para o sistema
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', data.usuario.login);
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Erro no login:', error);
    msgErro.textContent = 'Erro ao conectar. Verifique se o servidor está rodando.';
  } finally {
    btnEntrar.disabled = false;
    btnEntrar.textContent = 'Entrar';
  }
});
