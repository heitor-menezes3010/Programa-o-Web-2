class NoCircular {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null;
  }
}

class ListaCircular {
  constructor() {
    this.cabeca = null;
    this.tamanho = 0;
  }

  // Inserção no final -> O(n)
  inserir(valor) {
    const novoNo = new NoCircular(valor);
    if (!this.cabeca) {
      this.cabeca = novoNo;
      novoNo.proximo = this.cabeca; // aponta para si mesmo
    } else {
      let atual = this.cabeca;
      while (atual.proximo !== this.cabeca) {
        atual = atual.proximo;
      }
      atual.proximo = novoNo;
      novoNo.proximo = this.cabeca;
    }
    this.tamanho++;
  }

  // Percorre a lista "n" vezes (dá voltas) para demonstrar o ciclo
  percorrer(voltas = 1) {
    if (!this.cabeca) return;
    const valores = [];
    let atual = this.cabeca;
    const totalPassos = this.tamanho * voltas;
    for (let i = 0; i < totalPassos; i++) {
      valores.push(atual.valor);
      atual = atual.proximo;
    }
    console.log(valores.join(" -> ") + " -> (volta ao início)");
  }
}

// ---- Exemplo de uso ----
const listaCircular = new ListaCircular();
listaCircular.inserir("A");
listaCircular.inserir("B");
listaCircular.inserir("C");

console.log("Lista circular (percorrendo 2 voltas):");
listaCircular.percorrer(2);

module.exports = { ListaCircular };
