import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import ListaProdutosScreen from '../screens/ListaProdutosScreen';
import { deleteProduto, resetProdutos } from '../utils/apiMock';

jest.mock('../utils/apiMock', () => ({
  deleteProduto: jest.fn(),
  resetProdutos: jest.fn(),
}));

describe('ListaProdutosScreen', () => {
  const mockProdutos = [
    { id: '1', nome: 'Produto 1', taxaJurosAnual: 5.5, prazoMaximo: 12 },
    { id: '2', nome: 'Produto 2', taxaJurosAnual: 6.0, prazoMaximo: 24 },
  ];

  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders correctly', () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();
    const { toJSON } = render(
      <ListaProdutosScreen produtos={[]} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the empty state when no products are available', () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();
    const { getByText } = render(
      <ListaProdutosScreen produtos={[]} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );

    expect(getByText('Nenhum produto cadastrado.')).toBeTruthy();
    expect(getByText('Restaurar Produtos Padrão')).toBeTruthy();
  });

  it('renders the product list when products are available', () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();
    const { getByText } = render(
      <ListaProdutosScreen produtos={mockProdutos} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );

    expect(getByText('Produto 1')).toBeTruthy();
    expect(getByText('Produto 2')).toBeTruthy();
  });

  it('calls deleteProduto when the Excluir button is pressed', async () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();
    (deleteProduto as jest.Mock).mockResolvedValueOnce(true);

    const { getAllByText } = render(
      <ListaProdutosScreen produtos={mockProdutos} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );

    const deleteButtons = getAllByText('Excluir');
    fireEvent.press(deleteButtons[0]);

    await waitFor(() => {
      expect(deleteProduto).toHaveBeenCalledWith('1');
      expect(mockOnProdutoDeleted).toHaveBeenCalled();
    });
  });

  it('does not call onProdutoDeleted if deleteProduto returns false', async () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();
    (deleteProduto as jest.Mock).mockResolvedValueOnce(false);

    const { getAllByText } = render(
      <ListaProdutosScreen produtos={mockProdutos} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );

    const deleteButtons = getAllByText('Excluir');
    fireEvent.press(deleteButtons[0]);

    await waitFor(() => {
      expect(deleteProduto).toHaveBeenCalledWith('1');
      expect(mockOnProdutoDeleted).not.toHaveBeenCalled();
    });
  });

  it('handles errors when deleteProduto fails', async () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();
    (deleteProduto as jest.Mock).mockRejectedValueOnce(new Error('Delete failed'));

    const { getAllByText } = render(
      <ListaProdutosScreen produtos={mockProdutos} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );

    const deleteButtons = getAllByText('Excluir');
    fireEvent.press(deleteButtons[0]);

    await waitFor(() => {
      expect(deleteProduto).toHaveBeenCalledWith('1');
      expect(mockOnProdutoDeleted).not.toHaveBeenCalled();
    });
  });

  it('does not call onProdutoDeleted if it is undefined', async () => {
    const mockGoHome = jest.fn();
    (deleteProduto as jest.Mock).mockResolvedValueOnce(true);

    const { getAllByText } = render(
      <ListaProdutosScreen produtos={mockProdutos} goHome={mockGoHome} />
    );

    const deleteButtons = getAllByText('Excluir');
    fireEvent.press(deleteButtons[0]);

    await waitFor(() => {
      expect(deleteProduto).toHaveBeenCalledWith('1');
    });
  });

  it('calls resetProdutos when the Restaurar Produtos Padrão button is pressed', async () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();
    (resetProdutos as jest.Mock).mockResolvedValueOnce(undefined);

    const { getByText } = render(
      <ListaProdutosScreen produtos={[]} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );

    fireEvent.press(getByText('Restaurar Produtos Padrão'));

    await waitFor(() => {
      expect(resetProdutos).toHaveBeenCalled();
      expect(mockOnProdutoDeleted).toHaveBeenCalled();
    });
  });

  it('does not call onProdutoDeleted if resetProdutos fails', async () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();
    (resetProdutos as jest.Mock).mockRejectedValueOnce(new Error('Reset failed'));

    const { getByText } = render(
      <ListaProdutosScreen produtos={[]} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );

    fireEvent.press(getByText('Restaurar Produtos Padrão'));

    await waitFor(() => {
      expect(resetProdutos).toHaveBeenCalled();
      expect(mockOnProdutoDeleted).not.toHaveBeenCalled();
    });
  });

  it('does not call onProdutoDeleted if it is undefined during resetProdutos', async () => {
    const mockGoHome = jest.fn();
    (resetProdutos as jest.Mock).mockResolvedValueOnce(undefined);

    const { getByText } = render(
      <ListaProdutosScreen produtos={[]} goHome={mockGoHome} />
    );

    fireEvent.press(getByText('Restaurar Produtos Padrão'));

    await waitFor(() => {
      expect(resetProdutos).toHaveBeenCalled();
    });
  });

  it('calls goHome when the Voltar button is pressed', () => {
    const mockGoHome = jest.fn();
    const mockOnProdutoDeleted = jest.fn();

    const { getByText } = render(
      <ListaProdutosScreen produtos={mockProdutos} goHome={mockGoHome} onProdutoDeleted={mockOnProdutoDeleted} />
    );

    fireEvent.press(getByText('Voltar'));

    expect(mockGoHome).toHaveBeenCalled();
  });
});
