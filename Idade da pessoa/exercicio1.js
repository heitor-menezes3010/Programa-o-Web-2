const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite seu nome: ', (nome) => {
    rl.question('Digite o ano de seu nascimento: ', (ano) => {
        console.log(`Seu nome é ${nome}, e você tem ${2026 - parseInt(ano)} anos`);
        rl.close();
    });
});