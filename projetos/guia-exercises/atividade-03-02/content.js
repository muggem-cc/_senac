// Atividade: Orçamento de impressão
const prompt = require('prompt-sync')();

const quantidade = Number(prompt('Quantidade de páginas: '));
const precoUnitario = Number(prompt('Preço por página: '));
const total = quantidade * precoUnitario;

console.log(`Total: ${total}`);
