// Atividade: Registro de distância
const prompt = require('prompt-sync')();

const placa = prompt('Placa: ');
const distancia = Number(prompt('Distância (km): '));

console.log(`Veículo: ${placa}`);
console.log(`Distância: ${distancia} km`);
console.log(`Número finito: ${Number.isFinite(distancia)}`);
