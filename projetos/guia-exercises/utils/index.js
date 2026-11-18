const dados = require('../dados.json');

function mockDa(atividade) {
  return dados[atividade] ?? null;
}

module.exports = { dados, mockDa };
