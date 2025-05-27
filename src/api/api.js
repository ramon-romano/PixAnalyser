import axios from 'axios';

const api = axios.create({
  baseURL: 'https://felipemariano.com.br/api/pix-analyzer/transferencia/pix',
});

export const buscarDadosDaChavePix = (chavePix) => {
  return api.post('/buscar-chave', { chavePix });
};

export const consultarAvaliacaoIA = (chavePix) => {
  return api.post('/avaliacao-ia', { chavePix });
};

export const realizarTransferenciaPix = (chavePix, valor, usuario) => {
  return api.post('/transferir', { chavePix, valor, usuario });
};

export default api;
