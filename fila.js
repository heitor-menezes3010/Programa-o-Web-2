class Fila {
  constructor() {
    this.itens = [];
  }

  // Enfileira -> O(1)
  enqueue(valor) {
    this.itens.push(valor);
  }

  // Desenfileira -> O(n) com array (shift desloca os elementos);
  // em uma implementação com lista ligada seria O(1)
  dequeue() {
    if (this.vazia()) return undefined;
    return this.itens.shift();
  }

  frente() {
    return this.itens[0];
  }

  vazia() {
    return this.itens.length === 0;
  }

  imprimir() {
    console.log("Frente ->", this.itens.join(", "), "<- Fim");
  }
}

// ---- Exemplo de uso ----
const fila = new Fila();
fila.enqueue("Cliente 1");
fila.enqueue("Cliente 2");
fila.enqueue("Cliente 3");
console.log("Fila de atendimento:");
fila.imprimir();

console.log("Atendendo:", fila.dequeue());
fila.imprimir();

module.exports = { Fila };
