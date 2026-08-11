class No {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null;
  }
}

class ListaLigadaSimples {
  constructor() {
    this.cabeca = null;
    this.tamanho = 0;
  }

  // Inserção no final -> O(n)
  inserirFinal(valor) {
    const novoNo = new No(valor);
    if (!this.cabeca) {
      this.cabeca = novoNo;
    } else {
      let atual = this.cabeca;
      while (atual.proximo) {
        atual = atual.proximo;
      }
      atual.proximo = novoNo;
    }
    this.tamanho++;
  }

  // Inserção no início -> O(1)
  inserirInicio(valor) {
    const novoNo = new No(valor);
    novoNo.proximo = this.cabeca;
    this.cabeca = novoNo;
    this.tamanho++;
  }

  // Remoção por valor -> O(n)
  remover(valor) {
    if (!this.cabeca) return false;

    if (this.cabeca.valor === valor) {
      this.cabeca = this.cabeca.proximo;
      this.tamanho--;
      return true;
    }

    let atual = this.cabeca;
    while (atual.proximo && atual.proximo.valor !== valor) {
      atual = atual.proximo;
    }
    if (atual.proximo) {
      atual.proximo = atual.proximo.proximo;
      this.tamanho--;
      return true;
    }
    return false;
  }

  // Busca -> O(n)
  buscar(valor) {
    let atual = this.cabeca;
    let posicao = 0;
    while (atual) {
      if (atual.valor === valor) return posicao;
      atual = atual.proximo;
      posicao++;
    }
    return -1;
  }

  // Imprime a lista
  imprimir() {
    const valores = [];
    let atual = this.cabeca;
    while (atual) {
      valores.push(atual.valor);
      atual = atual.proximo;
    }
    console.log(valores.join(" -> ") + " -> null");
  }
}

// ---- Exemplo de uso ----
const lista = new ListaLigadaSimples();
lista.inserirFinal(10);
lista.inserirFinal(20);
lista.inserirFinal(30);
lista.inserirInicio(5);
console.log("Lista ligada simples:");
lista.imprimir();

console.log("Busca pelo valor 20, posição:", lista.buscar(20));

lista.remover(20);
console.log("Após remover 20:");
lista.imprimir();

module.exports = { ListaLigadaSimples };
