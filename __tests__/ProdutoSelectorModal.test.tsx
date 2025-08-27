import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ProdutoSelectorModal from '../components/ProdutoSelectorModal';
import { produtoModalStyles } from '../styles';
import { Produto } from '../types';

describe('ProdutoSelectorModal', () => {
  const mockOnSelectProduto = jest.fn();
  const mockOnClose = jest.fn();

  const produtos: Produto[] = [
    { id: '1', nome: 'Produto 1', prazoMaximo: 12, taxaJurosAnual: 5.0 },
    { id: '2', nome: 'Produto 2', prazoMaximo: 24, taxaJurosAnual: 6.5 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when visible is true', () => {
    const { getByText } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    expect(getByText('Selecionar Produto')).toBeTruthy();
  });

  it('does not render the modal when visible is false', () => {
    const { queryByText } = render(
      <ProdutoSelectorModal
        visible={false}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    expect(queryByText('Selecionar Produto')).toBeNull();
  });

  it('calls onClose when the overlay is pressed', () => {
    const { getByTestId } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByTestId('produto-modal-overlay'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when the Fechar button is pressed', () => {
    const { getByText } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByText('Fechar'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onSelectProduto and onClose when a product is selected', () => {
    const { getByText } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByText('Produto 1'));
    expect(mockOnSelectProduto).toHaveBeenCalledWith(produtos[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('highlights the selected product', () => {
    const { getByTestId } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={produtos[0]}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    const selectedProduct = getByTestId('produto-item-1');
    expect(selectedProduct.props.style).toMatchObject(produtoModalStyles.produtoModalItemSelected);
  });

  it('renders the correct number of products', () => {
    const { getByTestId } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    produtos.forEach((produto) => {
      expect(getByTestId(`produto-item-${produto.id}`)).toBeTruthy();
    });
  });

  it('calls onClose when onRequestClose is triggered', () => {
    const { getByTestId } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    fireEvent(getByTestId('produto-modal-overlay'), 'onRequestClose');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders correctly when produtos array is empty', () => {
    const { queryByTestId, getByText } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={[]}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    expect(getByText('Selecionar Produto')).toBeTruthy();
    expect(queryByTestId('produto-item-1')).toBeNull();
  });

  it('renders a product item correctly when no product is selected', () => {
    const { getByTestId } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    const productItem = getByTestId('produto-item-1');
    expect(productItem).toBeTruthy();
    expect(productItem.props.style).not.toContain(produtoModalStyles.produtoModalItemSelected);
  });

  it('renders a product item correctly when an invalid product ID is selected', () => {
    const invalidProdutoSelecionado = { id: 'invalid', nome: 'Invalid', prazoMaximo: 0, taxaJurosAnual: 0 };

    const { getByTestId } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={invalidProdutoSelecionado}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    const productItem = getByTestId('produto-item-1');
    expect(productItem).toBeTruthy();
    expect(productItem.props.style).not.toContain(produtoModalStyles.produtoModalItemSelected);
  });

  it('uses keyExtractor to generate unique keys for products', () => {
    const { getByTestId } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    produtos.forEach((produto) => {
      const productItem = getByTestId(`produto-item-${produto.id}`);
      expect(productItem).toBeTruthy();
    });
  });

  it('does not call onSelectProduto if an invalid product is selected', () => {
    const invalidProduto = { id: 'invalid', nome: 'Invalid', prazoMaximo: 0, taxaJurosAnual: 0 };

    const { queryByText } = render(
      <ProdutoSelectorModal
        visible={true}
        produtos={produtos}
        produtoSelecionado={null}
        onSelectProduto={mockOnSelectProduto}
        onClose={mockOnClose}
      />
    );

    const invalidProduct = queryByText(invalidProduto.nome);
    expect(invalidProduct).toBeNull();
    expect(mockOnSelectProduto).not.toHaveBeenCalled();
  });
});
