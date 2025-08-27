// utils/apiConfig.ts
import * as ApiReal from './api';
import * as ApiMock from './apiMock';

// Configuração para alternar entre Mock e API real
export const USE_REAL_API = false; // Mude para true quando quiser usar a API real

// Exporta as funções baseado na configuração
export const getProdutos = USE_REAL_API ? ApiReal.getProdutos : ApiMock.getProdutos;
export const postProduto = USE_REAL_API ? ApiReal.postProduto : ApiMock.postProduto;
export const deleteProduto = USE_REAL_API ? ApiReal.deleteProduto : ApiMock.deleteProduto;

// Função de simulação (só existe na API real, no mock usamos o cálculo local)
export const postSimulacao = USE_REAL_API ? ApiReal.postSimulacao : null;

// Função para testar conectividade (só para API real)
export const testApiConnection = USE_REAL_API ? ApiReal.testApiConnection : null;
