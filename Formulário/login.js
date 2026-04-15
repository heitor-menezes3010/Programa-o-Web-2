const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = form.querySelector("input[type='email']").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        errorMsg.textContent = "Preencha todos os campos!";
        return;
    }

    if (password.length < 4) {
        errorMsg.textContent = "Senha muito curta!";
        return;
    }

    errorMsg.textContent = "";

    alert("Login realizado com sucesso!");
});