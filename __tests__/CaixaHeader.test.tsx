import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { CaixaHeader } from '../components/CaixaHeader';

describe('CaixaHeader', () => {
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with default props', () => {
    const { getByTestId } = render(<CaixaHeader />);

    const image = getByTestId('header-logo');
    expect(image.props.source).toEqual(
      require('../assets/images/caixa_2cores_negativa.png')
    );
  });

  it('renders the correct image for tipo=chapado', () => {
    const { getByTestId } = render(<CaixaHeader tipo="chapado" />);

    const image = getByTestId('header-logo');
    expect(image.props.source).toEqual(
      require('../assets/images/caixa_elemento_cor_chapado_negativo.png')
    );
  });

  it('renders the correct image for tipo=positiva', () => {
    const { getByTestId } = render(<CaixaHeader tipo="positiva" />);

    const image = getByTestId('header-logo');
    expect(image.props.source).toEqual(
      require('../assets/images/caixa_2cores_positiva.png')
    );
  });

  it('renders the logout button when showLogout is true', () => {
    const { getByTestId } = render(
      <CaixaHeader showLogout={true} onLogout={mockOnLogout} />
    );

    const logoutButton = getByTestId('logout-button');
    expect(logoutButton).toBeTruthy();
  });

  it('calls onLogout when the logout button is pressed', () => {
    const { getByTestId } = render(
      <CaixaHeader showLogout={true} onLogout={mockOnLogout} />
    );

    const logoutButton = getByTestId('logout-button');
    fireEvent.press(logoutButton);
    expect(mockOnLogout).toHaveBeenCalled();
  });
});
