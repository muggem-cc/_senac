// Atividade: Cadastro na recepção
const prompt = require('prompt-sync')();

const nome = prompt('Nome: ');
const idade = Number(prompt('Idade: '));
const bairro = prompt('Bairro: ');

console.log('Ficha:');
console.log(nome);
console.log(idade);
console.log(bairro);
console.log(`Idade inteira: ${Number.isInteger(idade)}`);
