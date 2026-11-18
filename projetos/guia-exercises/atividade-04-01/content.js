// Atividade: Cálculo do IMC
const prompt = require('prompt-sync')();

const peso = Number(prompt('Peso (kg): '));
const altura = Number(prompt('Altura (m): '));
const imc = peso / (altura ** 2);

console.log(`IMC: ${imc.toFixed(2)}`);
