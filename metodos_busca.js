// 1) Busca Linear -> O(n): percorre elemento por elemento
// Funciona em arrays ordenados ou não ordenados.
function buscaLinear(arr, alvo) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === alvo) return i;
  }
  return -1;
}

// 2) Busca Binária -> O(log n): exige array ORDENADO.
// Divide o espaço de busca ao meio a cada passo.
function buscaBinaria(arr, alvo) {
  let inicio = 0;
  let fim = arr.length - 1;

  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    if (arr[meio] === alvo) return meio;
    if (arr[meio] < alvo) inicio = meio + 1;
    else fim = meio - 1;
  }
  return -1;
}

// ---- Exemplo de uso ----
const naoOrdenado = [23, 5, 42, 8, 15, 4, 16];
console.log("Array não ordenado:", naoOrdenado);
console.log("Busca linear por 15:", buscaLinear(naoOrdenado, 15));
console.log("Busca linear por 99:", buscaLinear(naoOrdenado, 99));

const ordenado = [4, 5, 8, 15, 16, 23, 42];
console.log("\nArray ordenado:", ordenado);
console.log("Busca binária por 16:", buscaBinaria(ordenado, 16));
console.log("Busca binária por 99:", buscaBinaria(ordenado, 99));

module.exports = { buscaLinear, buscaBinaria };
