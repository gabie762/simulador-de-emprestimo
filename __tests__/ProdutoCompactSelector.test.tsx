import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ProdutoCompactSelector from '../components/ProdutoCompactSelector';
import { Produto } from '../types';

describe('ProdutoCompactSelector', () => {
  const mockOnOpenModal = jest.fn();
  const mockOnSelectProduto = jest.fn();

  const produtos: Produto[] = [
    { id: '1', nome: 'Produto 1', prazoMaximo: 12, taxaJurosAnual: 5.0 },
    { id: '2', nome: 'Produto 2', prazoMaximo: 24, taxaJurosAnual: 6.5 },
    { id: '3', nome: 'Produto 3', prazoMaximo: 36, taxaJurosAnual: 7.0 },
    { id: '4', nome: 'Produto 4', prazoMaximo: 48, taxaJurosAnual: 8.0 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the selected product details', () => {
    const { getByText } = render(
      <ProdutoCompactSelector
        produtos={produtos}
        produtoSelecionado={produtos[0]}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
      />
    );

    expect(getByText('Produto 1')).toBeTruthy();
    expect(getByText('Taxa: 5.0% a.a.')).toBeTruthy();
    expect(getByText('Até 12 meses')).toBeTruthy();
  });

  it('displays fallback text when no product is selected', () => {
    const { getByText } = render(
      <ProdutoCompactSelector
        produtos={produtos}
        produtoSelecionado={null}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
      />
    );

    expect(getByText('Selecione um produto')).toBeTruthy();
  });

  it('calls onOpenModal when the product card is pressed', () => {
    const { getByTestId } = render(
      <ProdutoCompactSelector
        produtos={produtos}
        produtoSelecionado={produtos[0]}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
      />
    );

    fireEvent.press(getByTestId('produto-selecionado-card'));
    expect(mockOnOpenModal).toHaveBeenCalled();
  });

  it('navigates to the next product when the next button is pressed', () => {
    const { getByText } = render(
      <ProdutoCompactSelector
        produtos={produtos}
        produtoSelecionado={produtos[0]}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
      />
    );

    fireEvent.press(getByText('›'));
    expect(mockOnSelectProduto).toHaveBeenCalledWith(produtos[1]);
  });

  it('navigates to the previous product when the previous button is pressed', () => {
    const { getByText } = render(
      <ProdutoCompactSelector
        produtos={produtos}
        produtoSelecionado={produtos[0]}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
      />
    );

    fireEvent.press(getByText('‹'));
    expect(mockOnSelectProduto).toHaveBeenCalledWith(produtos[produtos.length - 1]);
  });

  it('disables navigation buttons when there is only one product', () => {
    const { getByLabelText } = render(
      <ProdutoCompactSelector
        produtos={[produtos[0]]}
        produtoSelecionado={produtos[0]}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
      />
    );

    expect(getByLabelText('Previous').props.accessibilityState.disabled).toBe(true);
    expect(getByLabelText('Next').props.accessibilityState.disabled).toBe(true);
  });

  it('renders the correct number of indicators', () => {
    const { getAllByTestId } = render(
      <ProdutoCompactSelector
        produtos={produtos}
        produtoSelecionado={produtos[0]}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
        maxVisibleProducts={2}
      />
    );

    expect(getAllByTestId('indicador').length).toBe(2);
  });

  it('displays the Ver Mais button when there are more products than maxVisibleProducts', () => {
    const { getByText } = render(
      <ProdutoCompactSelector
        produtos={produtos}
        produtoSelecionado={produtos[0]}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
        maxVisibleProducts={2}
      />
    );

    expect(getByText('Ver todos os produtos (4)')).toBeTruthy();
  });

  it('does not display the Ver Mais button when products are within maxVisibleProducts', () => {
    const { queryByText } = render(
      <ProdutoCompactSelector
        produtos={produtos}
        produtoSelecionado={produtos[0]}
        onOpenModal={mockOnOpenModal}
        onSelectProduto={mockOnSelectProduto}
        maxVisibleProducts={4}
      />
    );

    expect(queryByText('Ver todos os produtos (4)')).toBeNull();
  });
});
