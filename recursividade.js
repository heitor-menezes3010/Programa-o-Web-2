// Exemplo 1: Fatorial de um número
function fatorial(n) {
  if (n === 0 || n === 1) return 1; // caso base
  return n * fatorial(n - 1); // caso recursivo
}
console.log("Fatorial de 5:", fatorial(5));

// Exemplo 2: Sequência de Fibonacci
function fibonacci(n) {
  if (n <= 1) return n; // caso base
  return fibonacci(n - 1) + fibonacci(n - 2); // caso recursivo
}
console.log("Fibonacci(7):", fibonacci(7));

// Exemplo 3: Soma dos elementos de um array recursivamente
function somaArray(arr, indice = 0) {
  if (indice === arr.length) return 0; // caso base
  return arr[indice] + somaArray(arr, indice + 1); // caso recursivo
}
console.log("Soma de [1,2,3,4,5]:", somaArray([1, 2, 3, 4, 5]));

// Exemplo 4: Busca binária recursiva (também usada na seção de busca)
function buscaBinariaRecursiva(arr, alvo, inicio = 0, fim = arr.length - 1) {
  if (inicio > fim) return -1; // caso base: não encontrado
  const meio = Math.floor((inicio + fim) / 2);
  if (arr[meio] === alvo) return meio; // caso base: encontrado
  if (arr[meio] < alvo) return buscaBinariaRecursiva(arr, alvo, meio + 1, fim);
  return buscaBinariaRecursiva(arr, alvo, inicio, meio - 1);
}
const ordenado = [1, 3, 5, 7, 9, 11, 13];
console.log(
  "Busca binária recursiva por 9:",
  buscaBinariaRecursiva(ordenado, 9)
);

module.exports = { fatorial, fibonacci, somaArray, buscaBinariaRecursiva };
