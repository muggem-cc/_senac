// Atividade: Medição de temperatura
const prompt = require('prompt-sync')();

const entrada = prompt('Temperatura (°C): ');
const temperatura = Number(entrada.replace(',', '.'));

console.log(`Temperatura registrada: ${temperatura} °C`);
