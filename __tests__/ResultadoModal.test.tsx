import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ResultadoModal from '../components/ResultadoModal';
import { ResultadoModalProps } from '../types';

describe('ResultadoModal', () => {
  const mockOnClose = jest.fn();

  const resultadoMock: ResultadoModalProps['resultado'] = {
    produto: 'Produto Teste',
    valorParcela: '1000.00',
    valorEmprestimo: '50000.00',
    prazo: 12,
    taxaJurosAnual: '10%',
    taxaJurosMensal: '0.8%',
    totalJuros: '6000.00',
    totalPagar: '56000.00',
    memoriaCalculo: [
      { mes: 1, parcela: '1000.00', juros: '500.00', amortizacao: '500.00', saldoDevedor: '49500.00' },
      { mes: 2, parcela: '1000.00', juros: '495.00', amortizacao: '505.00', saldoDevedor: '49000.00' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when visible is true', () => {
    const { getByText } = render(
      <ResultadoModal visible={true} onClose={mockOnClose} resultado={resultadoMock} />
    );

    expect(getByText('Resultado da Simulação')).toBeTruthy();
    expect(getByText('Produto Teste')).toBeTruthy();
    expect(getByText('R$ 1000.00')).toBeTruthy();
  });

  it('does not render the modal when visible is false', () => {
    const { queryByText } = render(
      <ResultadoModal visible={false} onClose={mockOnClose} resultado={resultadoMock} />
    );

    expect(queryByText('Resultado da Simulação')).toBeNull();
  });

  it('calls onClose when the close button is pressed', () => {
    const { getByTestId } = render(
      <ResultadoModal visible={true} onClose={mockOnClose} resultado={resultadoMock} />
    );

    fireEvent.press(getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when the Voltar button is pressed', () => {
    const { getByText } = render(
      <ResultadoModal visible={true} onClose={mockOnClose} resultado={resultadoMock} />
    );

    fireEvent.press(getByText('Voltar'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders the amortization table correctly', () => {
    const { getByText, getAllByText } = render(
      <ResultadoModal visible={true} onClose={mockOnClose} resultado={resultadoMock} />
    );

    expect(getByText('Mês')).toBeTruthy();

    // Assert the number of rows in the table
    const jurosCells = getAllByText('R$ 500.00');
    expect(jurosCells).toHaveLength(2); // Ensure it matches the expected number of rows

    // Verify specific rows
    expect(getByText('R$ 495.00')).toBeTruthy();
  });

  it('renders fallback message when resultado is null', () => {
    const { queryByTestId } = render(
      <ResultadoModal visible={true} onClose={mockOnClose} resultado={null} />
    );

    expect(queryByTestId('fallback-message')).toBeTruthy();
  });
});
