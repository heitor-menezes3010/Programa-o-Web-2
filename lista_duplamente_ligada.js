class NoDuplo {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null;
    this.anterior = null;
  }
}

class ListaDuplamenteLigada {
  constructor() {
    this.cabeca = null;
    this.cauda = null;
    this.tamanho = 0;
  }

  // Inserção no final -> O(1), pois guardamos referência da cauda
  inserirFinal(valor) {
    const novoNo = new NoDuplo(valor);
    if (!this.cabeca) {
      this.cabeca = novoNo;
      this.cauda = novoNo;
    } else {
      novoNo.anterior = this.cauda;
      this.cauda.proximo = novoNo;
      this.cauda = novoNo;
    }
    this.tamanho++;
  }

  // Inserção no início -> O(1)
  inserirInicio(valor) {
    const novoNo = new NoDuplo(valor);
    if (!this.cabeca) {
      this.cabeca = novoNo;
      this.cauda = novoNo;
    } else {
      novoNo.proximo = this.cabeca;
      this.cabeca.anterior = novoNo;
      this.cabeca = novoNo;
    }
    this.tamanho++;
  }

  // Remoção por valor -> O(n) para localizar, O(1) para remover
  remover(valor) {
    let atual = this.cabeca;
    while (atual && atual.valor !== valor) {
      atual = atual.proximo;
    }
    if (!atual) return false;

    if (atual.anterior) atual.anterior.proximo = atual.proximo;
    else this.cabeca = atual.proximo;

    if (atual.proximo) atual.proximo.anterior = atual.anterior;
    else this.cauda = atual.anterior;

    this.tamanho--;
    return true;
  }

  imprimirParaFrente() {
    const valores = [];
    let atual = this.cabeca;
    while (atual) {
      valores.push(atual.valor);
      atual = atual.proximo;
    }
    console.log("Frente:", valores.join(" <-> "));
  }

  imprimirParaTras() {
    const valores = [];
    let atual = this.cauda;
    while (atual) {
      valores.push(atual.valor);
      atual = atual.anterior;
    }
    console.log("Trás:  ", valores.join(" <-> "));
  }
}

// ---- Exemplo de uso ----
const listaDupla = new ListaDuplamenteLigada();
listaDupla.inserirFinal(1);
listaDupla.inserirFinal(2);
listaDupla.inserirFinal(3);
listaDupla.inserirInicio(0);

console.log("Lista duplamente ligada:");
listaDupla.imprimirParaFrente();
listaDupla.imprimirParaTras();

listaDupla.remover(2);
console.log("Após remover 2:");
listaDupla.imprimirParaFrente();

module.exports = { ListaDuplamenteLigada };
