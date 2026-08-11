class NoArvore {
  constructor(valor) {
    this.valor = valor;
    this.esquerda = null;
    this.direita = null;
  }
}

class ArvoreBinariaBusca {
  constructor() {
    this.raiz = null;
  }

  // Inserção -> O(log n) em média, O(n) no pior caso
  inserir(valor) {
    const novoNo = new NoArvore(valor);
    if (!this.raiz) {
      this.raiz = novoNo;
      return;
    }
    let atual = this.raiz;
    while (true) {
      if (valor < atual.valor) {
        if (!atual.esquerda) {
          atual.esquerda = novoNo;
          return;
        }
        atual = atual.esquerda;
      } else {
        if (!atual.direita) {
          atual.direita = novoNo;
          return;
        }
        atual = atual.direita;
      }
    }
  }

  // Busca -> O(log n) em média
  buscar(valor, no = this.raiz) {
    if (!no) return false;
    if (valor === no.valor) return true;
    return valor < no.valor
      ? this.buscar(valor, no.esquerda)
      : this.buscar(valor, no.direita);
  }

  // Percurso em ordem (in-order): resulta em valores ordenados
  emOrdem(no = this.raiz, resultado = []) {
    if (no) {
      this.emOrdem(no.esquerda, resultado);
      resultado.push(no.valor);
      this.emOrdem(no.direita, resultado);
    }
    return resultado;
  }

  // Percurso pré-ordem: raiz -> esquerda -> direita
  preOrdem(no = this.raiz, resultado = []) {
    if (no) {
      resultado.push(no.valor);
      this.preOrdem(no.esquerda, resultado);
      this.preOrdem(no.direita, resultado);
    }
    return resultado;
  }
}

// ---- Exemplo de uso ----
const arvore = new ArvoreBinariaBusca();
[50, 30, 70, 20, 40, 60, 80].forEach((v) => arvore.inserir(v));

console.log("Árvore binária de busca com valores:", [50, 30, 70, 20, 40, 60, 80]);
console.log("Percurso em ordem (ordenado):", arvore.emOrdem());
console.log("Percurso pré-ordem:", arvore.preOrdem());
console.log("Buscar 40?", arvore.buscar(40));
console.log("Buscar 99?", arvore.buscar(99));

module.exports = { ArvoreBinariaBusca };
