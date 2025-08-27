import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import HomeTab from '../app/(tabs)/index';
import Index from '../app/index';
import { useAuth } from '../contexts/AuthContext';
import { getProdutos } from '../utils/apiConfig';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../utils/apiConfig', () => ({
  getProdutos: jest.fn(),
}));

jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('HomeTab', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading spinner while fetching data', () => {
    const { getByTestId } = render(<HomeTab />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders HomeScreen after loading', async () => {
    (getProdutos as jest.Mock).mockResolvedValueOnce([]);

    const { getByTestId } = render(<HomeTab />);

    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
    });
  });

  it('shows an alert on fetch error', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    (getProdutos as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<HomeTab />);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Erro',
        'Não foi possível carregar os produtos do servidor.'
      );
    });
  });

  it('navigates to the correct screen', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (getProdutos as jest.Mock).mockResolvedValueOnce([]);

    const { getByTestId } = render(<HomeTab />);

    await waitFor(() => {
      fireEvent.press(getByTestId('navigate-cadastro'));
      expect(pushMock).toHaveBeenCalledWith('/(tabs)/cadastro');

      fireEvent.press(getByTestId('navigate-listaProdutos'));
      expect(pushMock).toHaveBeenCalledWith('/(tabs)/listaProdutos');

      fireEvent.press(getByTestId('navigate-simulacao'));
      expect(pushMock).toHaveBeenCalledWith('/(tabs)/simulacao');
    });
  });
});

describe('Index Screen', () => {
  let replaceMock: jest.Mock;

  beforeEach(() => {
    replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the loading screen', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    const { getByText } = render(<Index />);

    expect(getByText('Carregando...')).toBeTruthy();
  });

  it('navigates to /(tabs) when authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(<Index />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/(tabs)');
    });
  });

  it('navigates to /login when not authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(<Index />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/login');
    });
  });
});
