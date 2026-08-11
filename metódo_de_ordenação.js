function bubbleSort(arr) {
  let array = [...arr]; // Copia para não alterar o original
  let n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Se o elemento atual for maior que o próximo, troca
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

// --- Testando Bubble Sort ---
const numerosDesordenados = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numerosDesordenados);
console.log("Bubble Sort:", bubbleSort(numerosDesordenados));
// Saída: [11, 12, 22, 25, 34, 64, 90]