import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import SimulacaoTab from '../app/(tabs)/simulacao';
import { getProdutos } from '../utils/apiConfig';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('../utils/apiConfig', () => ({
  getProdutos: jest.fn(),
}));

describe('SimulacaoTab', () => {
  const mockProdutos = [
    { id: 1, nome: 'Produto 1', taxaJurosAnual: 10, prazoMaximo: 12 },
    { id: 2, nome: 'Produto 2', taxaJurosAnual: 15, prazoMaximo: 24 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders loading indicator while fetching products', async () => {
    (getProdutos as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { getByTestId } = render(<SimulacaoTab />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders products after fetching', async () => {
    (getProdutos as jest.Mock).mockResolvedValue(mockProdutos);

    const { getByTestId } = render(<SimulacaoTab />);

    await waitFor(() => {
      expect(getByTestId('produto-selecionado-card')).toBeTruthy();
    }, { timeout: 10000 });
  });

  it('shows error alert when fetching products fails', async () => {
    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    (getProdutos as jest.Mock).mockRejectedValue(new Error('Erro ao buscar produtos'));

    render(<SimulacaoTab />);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Erro', 'Não foi possível carregar os produtos do servidor.');
    });

    mockAlert.mockRestore();
  });

  it('opens and closes the ResultadoModal', async () => {
    (getProdutos as jest.Mock).mockResolvedValue(mockProdutos);

    const { getByTestId, queryByTestId, getByPlaceholderText } = render(<SimulacaoTab />);

    await waitFor(() => {
      expect(getByTestId('produto-selecionado-card')).toBeTruthy();
    });

    // Initially modal should not be visible
    expect(queryByTestId('resultado-modal')).toBeNull();

    // Fill in the form fields
    fireEvent.changeText(getByPlaceholderText('Valor do Empréstimo (R$)'), '1000');
    fireEvent.changeText(getByPlaceholderText('Prazo (meses)'), '12');

    // Press the simulate button
    fireEvent.press(getByTestId('open-modal-button'));

    // Wait for modal to appear
    await waitFor(() => {
      expect(getByTestId('resultado-modal')).toBeTruthy();
    });

    // Close the modal
    fireEvent.press(getByTestId('close-button'));

    await waitFor(() => {
      expect(queryByTestId('resultado-modal')).toBeNull();
    });
  });
});
