// Tipos principais da aplicação
export interface Produto {
  id: string;
  nome: string;
  taxaJurosAnual: number;
  prazoMaximo: number;
}

export interface Resultado {
  produto: string;
  valorEmprestimo: string;
  prazo: number;
  taxaJurosAnual: string;
  taxaJurosMensal: string;
  valorParcela: string;
  totalPagar: string;
  totalJuros: string;
  memoriaCalculo: {
    mes: number;
    parcela: string;
    juros: string;
    amortizacao: string;
    saldoDevedor: string;
  }[];
}

export interface ScreenProps {
  goHome: () => void;
}

export interface CadastroProdutoProps extends ScreenProps {
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export interface ListaProdutosProps extends ScreenProps {
  produtos: Produto[];
}

export interface SimulacaoScreenProps extends ScreenProps {
  produtos: Produto[];
  setResultado: React.Dispatch<React.SetStateAction<Resultado | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ResultadoModalProps {
  visible: boolean;
  onClose: () => void;
  resultado: Resultado | null;
  testID?: string;
}
