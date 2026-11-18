// Atividade: Pagamento de diária
const prompt = require('prompt-sync')();

const hospede = prompt('Hóspede: ');
const diarias = Number(prompt('Diárias: '));
const valorDiaria = Number(prompt('Valor da diária: '));
const total = diarias * valorDiaria;

console.log(`Total bruto: ${total}`);
