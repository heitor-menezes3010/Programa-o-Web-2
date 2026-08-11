// Criação de um array
const numeros = [10, 20, 30, 40, 50];
console.log("Array original:", numeros);

// Acesso a um elemento por índice -> O(1)
console.log("Elemento no índice 2:", numeros[2]);

// Inserção no final -> O(1) amortizado
numeros.push(60);
console.log("Após push(60):", numeros);

// Inserção no início -> O(n), pois desloca todos os elementos
numeros.unshift(0);
console.log("Após unshift(0):", numeros);

// Remoção do final -> O(1)
numeros.pop();
console.log("Após pop():", numeros);

// Remoção do início -> O(n)
numeros.shift();
console.log("Após shift():", numeros);

// Busca de um elemento -> O(n)
console.log("Índice do valor 30:", numeros.indexOf(30));

// Percorrendo o array -> O(n)
console.log("Percorrendo o array:");
for (let i = 0; i < numeros.length; i++) {
  console.log(`  posição ${i}: ${numeros[i]}`);
}

// Inserção/remoção em posição arbitrária com splice -> O(n)
numeros.splice(2, 0, 25); // insere 25 na posição 2
console.log("Após splice (inserir 25 na posição 2):", numeros);

module.exports = { numeros };
