class Pilha {
  constructor() {
    this.itens = [];
  }

  // Empilha -> O(1)
  push(valor) {
    this.itens.push(valor);
  }

  // Desempilha -> O(1)
  pop() {
    if (this.vazia()) return undefined;
    return this.itens.pop();
  }

  // Olha o topo sem remover -> O(1)
  topo() {
    return this.itens[this.itens.length - 1];
  }

  vazia() {
    return this.itens.length === 0;
  }

  imprimir() {
    console.log("Topo ->", [...this.itens].reverse().join(", "), "<- Base");
  }
}

// ---- Exemplo de uso ----
const pilha = new Pilha();
pilha.push(1);
pilha.push(2);
pilha.push(3);
console.log("Pilha após empilhar 1, 2, 3:");
pilha.imprimir();

console.log("Desempilhando:", pilha.pop());
pilha.imprimir();

// Aplicação prática: verificar se uma expressão de parênteses está balanceada
function parenteseBalanceado(expressao) {
  const p = new Pilha();
  for (const char of expressao) {
    if (char === "(") p.push(char);
    else if (char === ")") {
      if (p.vazia()) return false;
      p.pop();
    }
  }
  return p.vazia();
}

console.log('"(a+b)*(c-d)" balanceada?', parenteseBalanceado("(a+b)*(c-d)"));
console.log('"(a+b*(c-d)" balanceada?', parenteseBalanceado("(a+b*(c-d)"));

module.exports = { Pilha };
