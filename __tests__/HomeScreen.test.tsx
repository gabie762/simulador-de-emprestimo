import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const mockOnNavigate = jest.fn();
    const { toJSON } = render(<HomeScreen onNavigate={mockOnNavigate} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onNavigate with "cadastro" when the Cadastrar Produto button is pressed', () => {
    const mockOnNavigate = jest.fn();
    const { getByText } = render(<HomeScreen onNavigate={mockOnNavigate} />);

    fireEvent.press(getByText('Cadastrar Produto'));

    expect(mockOnNavigate).toHaveBeenCalledWith('cadastro');
  });

  it('calls onNavigate with "listaProdutos" when the Listar Produtos button is pressed', () => {
    const mockOnNavigate = jest.fn();
    const { getByText } = render(<HomeScreen onNavigate={mockOnNavigate} />);

    fireEvent.press(getByText('Listar Produtos'));

    expect(mockOnNavigate).toHaveBeenCalledWith('listaProdutos');
  });

  it('calls onNavigate with "simulacao" when the Nova Simulação button is pressed', () => {
    const mockOnNavigate = jest.fn();
    const { getByText } = render(<HomeScreen onNavigate={mockOnNavigate} />);

    fireEvent.press(getByText('Nova Simulação'));

    expect(mockOnNavigate).toHaveBeenCalledWith('simulacao');
  });

  it('has accessible buttons', () => {
    const mockOnNavigate = jest.fn();
    const { getByLabelText } = render(<HomeScreen onNavigate={mockOnNavigate} />);

    expect(getByLabelText('Cadastrar Produto')).toBeTruthy();
    expect(getByLabelText('Listar Produtos')).toBeTruthy();
    expect(getByLabelText('Nova Simulação')).toBeTruthy();
  });
});
