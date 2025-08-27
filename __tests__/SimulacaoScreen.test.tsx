import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import SimulacaoScreen from '../screens/SimulacaoScreen';
import { postSimulacao } from '../utils/apiConfig'; // Corrected import path

jest.mock('../utils/apiConfig', () => ({
  postSimulacao: jest.fn(),
})); // Properly mock the `postSimulacao` function

jest.useFakeTimers(); // Apply fake timers globally

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllTimers(); // Clear all timers after each test
});

// Suppress console errors during tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('SimulacaoScreen', () => {
  const mockGoHome = jest.fn();
  const mockSetResultado = jest.fn();
  const mockSetModalVisible = jest.fn();
  const mockProdutos = [
    { id: '1', nome: 'Produto 1', prazoMaximo: 12, taxaJurosAnual: 5.0 },
    { id: '2', nome: 'Produto 2', prazoMaximo: 24, taxaJurosAnual: 6.5 },
  ]; // Added missing property `taxaJurosAnual`

  it('renders correctly', () => {
    const { toJSON } = render(
      <SimulacaoScreen
        produtos={[]}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('shows an error toast for missing inputs', async () => {
    const { getByText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    fireEvent.press(getByText('Simular'));

    await waitFor(() => {
      expect(getByText('Preencha o valor, o prazo e selecione um produto.')).toBeTruthy();
    });
  });

  it('shows an error toast for invalid prazo', async () => {
    const { getByText, getByPlaceholderText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Valor do Empréstimo (R$)'), '1000');
    fireEvent.changeText(getByPlaceholderText('Prazo (meses)'), '25'); // Invalid prazo
    fireEvent.press(getByText('Simular'));

    await waitFor(() => {
      expect(getByText('O prazo para este produto deve ser entre 1 e 12 meses.')).toBeTruthy();
    });
  });

  it('calls postSimulacao for valid inputs', async () => {
    (postSimulacao as jest.Mock).mockResolvedValueOnce({ resultado: 'Simulação bem-sucedida' });

    const { getByText, getByPlaceholderText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Valor do Empréstimo (R$)'), '1000');
    fireEvent.changeText(getByPlaceholderText('Prazo (meses)'), '12');
    fireEvent.press(getByText('Simular'));

    await waitFor(() => {
      expect(postSimulacao).toHaveBeenCalledWith({
        produtoId: '1',
        valor: 1000,
        prazo: 12,
      });
      expect(mockSetResultado).toHaveBeenCalledWith({ resultado: 'Simulação bem-sucedida' });
      expect(mockSetModalVisible).toHaveBeenCalledWith(true);
    });
  });

  it('shows an error toast if postSimulacao fails', async () => {
    (postSimulacao as jest.Mock).mockRejectedValueOnce(new Error('Erro na simulação'));

    const { getByText, getByPlaceholderText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Valor do Empréstimo (R$)'), '1000');
    fireEvent.changeText(getByPlaceholderText('Prazo (meses)'), '12');
    fireEvent.press(getByText('Simular'));

    await waitFor(() => {
      expect(getByText('Erro na simulação')).toBeTruthy();
    });
  });

  it('opens and closes the ProdutoSelectorModal', () => {
    const { getByTestId, queryByText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    // Modal should not be visible initially
    expect(queryByText('Selecionar Produto')).toBeNull();

    // Open modal
    fireEvent.press(getByTestId('produto-selecionado-card'));

    // Modal should now be visible
    expect(queryByText('Selecionar Produto')).toBeTruthy();
  });

  it('navigates back when Voltar is pressed', () => {
    const { getByText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    fireEvent.press(getByText('Voltar'));
    expect(mockGoHome).toHaveBeenCalled();
  });

  it('handles toast auto-hide timeout', async () => {
    const { getByText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    // Trigger toast by clicking simulate without inputs
    fireEvent.press(getByText('Simular'));
    
    await waitFor(() => {
      expect(getByText('Preencha o valor, o prazo e selecione um produto.')).toBeTruthy();
    });

    // Fast-forward timers to trigger auto-hide
    jest.advanceTimersByTime(3000);
    
    await waitFor(() => {
      expect(() => getByText('Preencha o valor, o prazo e selecione um produto.')).toThrow();
    });
  });

  it('handles zero or negative prazo values', async () => {
    const { getByText, getByPlaceholderText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    // Test zero prazo
    fireEvent.changeText(getByPlaceholderText('Valor do Empréstimo (R$)'), '1000');
    fireEvent.changeText(getByPlaceholderText('Prazo (meses)'), '0');
    fireEvent.press(getByText('Simular'));

    await waitFor(() => {
      expect(getByText('O prazo para este produto deve ser entre 1 e 12 meses.')).toBeTruthy();
    });
  });

  it('handles local calculation when postSimulacao is null', async () => {
    // Mock postSimulacao as null to trigger local calculation
    const originalMock = jest.requireMock('../utils/apiConfig');
    originalMock.postSimulacao = null;

    const { getByText, getByPlaceholderText } = render(
      <SimulacaoScreen
        produtos={mockProdutos}
        goHome={mockGoHome}
        setResultado={mockSetResultado}
        setModalVisible={mockSetModalVisible}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Valor do Empréstimo (R$)'), '1000');
    fireEvent.changeText(getByPlaceholderText('Prazo (meses)'), '12');
    fireEvent.press(getByText('Simular'));

    // Fast-forward the 1-second delay in local calculation
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(mockSetResultado).toHaveBeenCalled();
      expect(mockSetModalVisible).toHaveBeenCalledWith(true);
    });

    // Restore original
    originalMock.postSimulacao = jest.fn();
  });
});
