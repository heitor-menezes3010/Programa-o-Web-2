class ArrayDinamico {
  constructor(capacidadeInicial = 2) {
    this.capacidade = capacidadeInicial;
    this.tamanho = 0;
    this.dados = new Array(this.capacidade); // "bloco" alocado
  }

  // Insere um elemento; se não houver espaço, redimensiona (realoca)
  inserir(valor) {
    if (this.tamanho === this.capacidade) {
      this._redimensionar();
    }
    this.dados[this.tamanho] = valor;
    this.tamanho++;
  }

  // Simula a realocação dinâmica: dobra a capacidade
  _redimensionar() {
    const novaCapacidade = this.capacidade * 2;
    console.log(
      `  [alocando novo bloco de memória: ${this.capacidade} -> ${novaCapacidade}]`
    );
    const novoBloco = new Array(novaCapacidade);
    for (let i = 0; i < this.tamanho; i++) {
      novoBloco[i] = this.dados[i]; // copia os dados existentes
    }
    this.dados = novoBloco;
    this.capacidade = novaCapacidade;
  }

  imprimir() {
    console.log(
      `Dados: [${this.dados.slice(0, this.tamanho).join(", ")}] | tamanho=${this.tamanho} capacidade=${this.capacidade}`
    );
  }
}

// ---- Exemplo de uso ----
const arr = new ArrayDinamico();
console.log("Inserindo elementos um a um (observe as realocações):");
for (let i = 1; i <= 6; i++) {
  arr.inserir(i * 10);
  arr.imprimir();
}

module.exports = { ArrayDinamico };
