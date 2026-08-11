// Classe que representa cada nó da lista
class No {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null; // Aponta para o próximo nó (inicia como null)
  }
}

// Classe que gerencia a Lista Encadeada
class ListaEncadeada {
  constructor() {
    this.cabeca = null; // Início da lista
  }

  // Adiciona um elemento ao final da lista
  adicionar(valor) {
    const novoNo = new No(valor);

    if (this.cabeca === null) {
      this.cabeca = novoNo;
      return;
    }

    let atual = this.cabeca;
    while (atual.proximo !== null) {
      atual = atual.proximo;
    }
    atual.proximo = novoNo;
  }

  // Exibe todos os elementos da lista
  imprimir() {
    let atual = this.cabeca;
    const elementos = [];

    while (atual !== null) {
      elementos.push(atual.valor);
      atual = atual.proximo;
    }

    console.log(elementos.join(" -> ") + " -> null");
  }
}

// --- Testando a Lista Encadeada ---
const minhaLista = new ListaEncadeada();
minhaLista.adicionar(10);
minhaLista.adicionar(20);
minhaLista.adicionar(30);

minhaLista.imprimir(); 
// Saída: 10 -> 20 -> 30 -> null