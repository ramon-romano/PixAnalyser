import axios from 'axios';

import {
  buscarDadosDaChavePix as mockBuscarDadosDaChavePix,
  consultarAvaliacaoIA as mockConsultarAvaliacaoIA,
  realizarTransferenciaPix as mockRealizarTransferenciaPix,
} from './mock';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    'https://felipemariano.com.br/api/pix-analyzer/transferencia/pix',
});

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
const mockOnNetworkError =
  import.meta.env.VITE_MOCK_ON_ERROR === 'true' ||
  (import.meta.env.DEV && import.meta.env.VITE_MOCK_ON_ERROR !== 'false');

const isNetworkError = (err) => Boolean(err) && !err.response;

const withMockFallback = async (realRequest, mockRequest) => {
  if (useMocks) return mockRequest();

  try {
    return await realRequest();
  } catch (err) {
    if (mockOnNetworkError && isNetworkError(err)) {
      return mockRequest();
    }
    throw err;
  }
};

export const buscarDadosDaChavePix = (destinationKeyValue, originClientId) => {
  return withMockFallback(
    () => api.post('/info-chave-pix', { destinationKeyValue, originClientId }),
    () => mockBuscarDadosDaChavePix(destinationKeyValue, originClientId)
  );
};

export const consultarAvaliacaoIA = (destinationKeyValue, originClientId, amount, description) => {
  return withMockFallback(
    () =>
      api.post('/analisar', {
        destinationKeyValue,
        originClientId,
        amount,
        description,
      }),
    () =>
      mockConsultarAvaliacaoIA(
        destinationKeyValue,
        originClientId,
        amount,
        description
      )
  );
};

export const realizarTransferenciaPix = (destinationKeyValue, originClientId, amount, description) => {
  return withMockFallback(
    () =>
      api.post('/transferir', {
        destinationKeyValue,
        originClientId,
        amount,
        description,
      }),
    () =>
      mockRealizarTransferenciaPix(
        destinationKeyValue,
        originClientId,
        amount,
        description
      )
  );
};

export default api;

