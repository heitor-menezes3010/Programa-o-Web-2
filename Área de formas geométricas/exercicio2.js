const prompt = require('prompt-sync')();

let a = parseInt(prompt("Digite o valor da forma geometrica: "));
let b = parseInt(prompt("Digite o segundo valor da forma geometrica: "));
let pi = 3.14;

console.log("A área do quadrado é: ", + a*a);
console.log("A área do retangulo é: ", + (a*b / 2));
let c = parseInt(prompt("Digite o raio do circulo: "));

console.log("A área do círculo é: ", + pi * a*a)