import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import CadastroProdutoScreen from '../screens/CadastroProdutoScreen';
import { postProduto } from '../utils/apiConfig';

jest.mock('../utils/apiConfig', () => ({
  postProduto: jest.fn(),
}));

describe('CadastroProdutoScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.restoreAllMocks();
  });

  it('renders correctly', () => {
    const mockGoHome = jest.fn();
    const mockAtualizarProdutos = jest.fn();
    const { toJSON } = render(
      <CadastroProdutoScreen goHome={mockGoHome} atualizarProdutos={mockAtualizarProdutos} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('shows error message when fields are empty', async () => {
    const mockGoHome = jest.fn();
    const mockAtualizarProdutos = jest.fn();
    const { getByText } = render(
      <CadastroProdutoScreen goHome={mockGoHome} atualizarProdutos={mockAtualizarProdutos} />
    );

    fireEvent.press(getByText('Cadastrar'));

    await waitFor(() => {
      expect(getByText('Todos os campos são obrigatórios.')).toBeTruthy();
    });
  });

  it('submits successfully and shows success message', async () => {
    const mockGoHome = jest.fn();
    const mockAtualizarProdutos = jest.fn();
    (postProduto as jest.Mock).mockResolvedValueOnce(undefined);

    const { getByText, getByPlaceholderText } = render(
      <CadastroProdutoScreen goHome={mockGoHome} atualizarProdutos={mockAtualizarProdutos} />
    );

    fireEvent.changeText(getByPlaceholderText('Nome do Produto'), 'Produto Teste');
    fireEvent.changeText(getByPlaceholderText('Taxa de Juros Anual (%)'), '5');
    fireEvent.changeText(getByPlaceholderText('Prazo Máximo (meses)'), '12');
    fireEvent.press(getByText('Cadastrar'));

    await waitFor(() => {
      expect(getByText('Produto cadastrado com sucesso!')).toBeTruthy();
      expect(mockAtualizarProdutos).toHaveBeenCalled();
    });
  });

  it('shows error message on submission failure', async () => {
    const mockGoHome = jest.fn();
    const mockAtualizarProdutos = jest.fn();
    (postProduto as jest.Mock).mockRejectedValueOnce(new Error('PRODUTO_DUPLICADO'));

    const { getByText, getByPlaceholderText } = render(
      <CadastroProdutoScreen goHome={mockGoHome} atualizarProdutos={mockAtualizarProdutos} />
    );

    fireEvent.changeText(getByPlaceholderText('Nome do Produto'), 'Produto Teste');
    fireEvent.changeText(getByPlaceholderText('Taxa de Juros Anual (%)'), '5');
    fireEvent.changeText(getByPlaceholderText('Prazo Máximo (meses)'), '12');
    fireEvent.press(getByText('Cadastrar'));

    await waitFor(() => {
      expect(
        getByText('Já existe um produto cadastrado com este nome. Escolha um nome diferente.')
      ).toBeTruthy();
    });
  });

  it('calls goHome when Voltar is pressed', () => {
    const mockGoHome = jest.fn();
    const mockAtualizarProdutos = jest.fn();

    const { getByText } = render(
      <CadastroProdutoScreen goHome={mockGoHome} atualizarProdutos={mockAtualizarProdutos} />
    );

    fireEvent.press(getByText('Voltar'));

    expect(mockGoHome).toHaveBeenCalled();
  });
});
