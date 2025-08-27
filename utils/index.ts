import { Produto, Resultado } from '../types';
import { Platform } from 'react-native';

export const mockProdutos: Produto[] = [
  { id: '1', nome: 'Crédito Pessoal Padrão', taxaJurosAnual: 25.0, prazoMaximo: 48 },
  { id: '2', nome: 'Crédito Imobiliário', taxaJurosAnual: 9.5, prazoMaximo: 360 },
  { id: '3', nome: 'Financiamento Veicular', taxaJurosAnual: 18.2, prazoMaximo: 60 },
];

// Helper para normalizar estilos shadow para web
export const normalizeShadow = (shadowStyle: any) => {
  if (Platform.OS === 'web') {
    const { shadowColor, shadowOffset, shadowOpacity, shadowRadius, ...rest } = shadowStyle;
    
    if (shadowColor && shadowOffset && shadowOpacity !== undefined && shadowRadius) {
      return {
        ...rest,
        boxShadow: `${shadowOffset.width}px ${shadowOffset.height}px ${shadowRadius}px rgba(0, 0, 0, ${shadowOpacity})`,
      };
    }
  }
  
  return shadowStyle;
};

export const calcularSimulacao = (
  valorEmprestimo: number,
  prazo: number,
  produto: Produto
): Resultado => {
  const taxaMensal = (produto.taxaJurosAnual / 12) / 100;
  const parcela = valorEmprestimo * (taxaMensal * Math.pow(1 + taxaMensal, prazo)) / (Math.pow(1 + taxaMensal, prazo) - 1);
  const total = parcela * prazo;
  const totalJuros = total - valorEmprestimo;
  
  let saldoDevedor = valorEmprestimo;
  const memoriaCalculo = [];
  
  for (let i = 1; i <= prazo; i++) {
    const jurosMes = saldoDevedor * taxaMensal;
    const amortizacao = parcela - jurosMes;
    saldoDevedor -= amortizacao;
    memoriaCalculo.push({ 
      mes: i, 
      parcela: parcela.toFixed(2), 
      juros: jurosMes.toFixed(2), 
      amortizacao: amortizacao.toFixed(2), 
      saldoDevedor: Math.abs(saldoDevedor).toFixed(2) 
    });
  }

  return {
    produto: produto.nome,
    valorEmprestimo: valorEmprestimo.toFixed(2),
    prazo: prazo,
    taxaJurosAnual: produto.taxaJurosAnual.toFixed(2),
    taxaJurosMensal: (taxaMensal * 100).toFixed(4),
    valorParcela: parcela.toFixed(2),
    totalPagar: total.toFixed(2),
    totalJuros: totalJuros.toFixed(2),
    memoriaCalculo,
  };
};
