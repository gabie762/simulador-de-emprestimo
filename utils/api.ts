// utils/api.ts
import { Produto, Resultado } from '../types';

// Configuração da API
const API_BASE_URL = 'https://sua-api.com/api'; // Substitua pela URL da sua API

// Tipos para requests/responses
export interface CadastrarProdutoRequest {
  nome: string;
  taxaJurosAnual: number;
  prazoMaximo: number;
}

export interface SimulacaoRequest {
  produtoId: string;
  valor: number;
  prazo: number;
}

export interface SimulacaoResponse {
  produto: Produto;
  valorEmprestimo: number;
  prazo: number;
  taxaJurosAnual: number;
  taxaJurosMensal: number;
  valorParcela: number;
  totalPagar: number;
  totalJuros: number;
  memoriaCalculo?: {
    mes: number;
    parcela: number;
    juros: number;
    amortizacao: number;
    saldoDevedor: number;
  }[];
}

// Função helper para fazer requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Adicione headers de autenticação se necessário
    // 'Authorization': `Bearer ${token}`,
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro na API (${endpoint}):`, error);
    throw error;
  }
}

// GET /produtos – Listar produtos
export async function getProdutos(): Promise<Produto[]> {
  try {
    const produtos = await apiRequest<Produto[]>('/produtos', {
      method: 'GET',
    });
    return produtos;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Não foi possível carregar os produtos do servidor.');
  }
}

// POST /produtos – Cadastrar produto
export async function postProduto(produto: CadastrarProdutoRequest): Promise<Produto> {
  try {
    const novoProduto = await apiRequest<Produto>('/produtos', {
      method: 'POST',
      body: JSON.stringify(produto),
    });
    return novoProduto;
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    
    // Tratamento de erros específicos
    if (error instanceof Error) {
      if (error.message.includes('409')) {
        throw new Error('PRODUTO_DUPLICADO');
      }
      if (error.message.includes('400')) {
        throw new Error('Dados do produto inválidos.');
      }
    }
    
    throw new Error('Não foi possível cadastrar o produto.');
  }
}

// POST /simulações – Realizar simulação de empréstimo
export async function postSimulacao(simulacao: SimulacaoRequest): Promise<Resultado> {
  try {
    const resultado = await apiRequest<SimulacaoResponse>('/simulacoes', {
      method: 'POST',
      body: JSON.stringify(simulacao),
    });
    
    // Converte o response da API para o formato esperado pelo app
    const resultadoFormatado: Resultado = {
      produto: resultado.produto.nome,
      valorEmprestimo: resultado.valorEmprestimo.toFixed(2),
      prazo: resultado.prazo,
      taxaJurosAnual: resultado.taxaJurosAnual.toFixed(2) + '%',
      taxaJurosMensal: resultado.taxaJurosMensal.toFixed(2) + '%',
      valorParcela: resultado.valorParcela.toFixed(2),
      totalPagar: resultado.totalPagar.toFixed(2),
      totalJuros: resultado.totalJuros.toFixed(2),
      memoriaCalculo: resultado.memoriaCalculo?.map(item => ({
        mes: item.mes,
        parcela: item.parcela.toFixed(2),
        juros: item.juros.toFixed(2),
        amortizacao: item.amortizacao.toFixed(2),
        saldoDevedor: item.saldoDevedor.toFixed(2),
      })) || [],
    };
    
    return resultadoFormatado;
  } catch (error) {
    console.error('Erro ao realizar simulação:', error);
    
    // Tratamento de erros específicos
    if (error instanceof Error) {
      if (error.message.includes('400')) {
        throw new Error('Dados da simulação inválidos.');
      }
      if (error.message.includes('404')) {
        throw new Error('Produto não encontrado.');
      }
    }
    
    throw new Error('Não foi possível realizar a simulação.');
  }
}

// Função para deletar produto (se a API suportar)
export async function deleteProduto(id: string): Promise<boolean> {
  try {
    await apiRequest(`/produtos/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw new Error('Não foi possível deletar o produto.');
  }
}

// Função para testar conectividade com a API
export async function testApiConnection(): Promise<boolean> {
  try {
    // Tenta fazer uma requisição simples para verificar se a API está acessível
    await apiRequest('/produtos', { method: 'GET' });
    return true;
  } catch (error) {
    console.error('API não está acessível:', error);
    return false;
  }
}
