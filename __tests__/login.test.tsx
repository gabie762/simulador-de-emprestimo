import { fireEvent, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import Login from '../app/login';
import { useAuth } from '../contexts/AuthContext';

jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('Login', () => {
  const mockLogin = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<Login />);

    expect(getByTestId('login-screen')).toBeTruthy();
  });

  it('calls login and navigates on successful login', () => {
    const { getByTestId } = render(<Login />);

    const loginScreen = getByTestId('login-screen');
    fireEvent(loginScreen, 'onLogin', 'testUser', 'testPassword');

    expect(mockLogin).toHaveBeenCalledWith('testUser', 'testPassword');
    expect(mockReplace).toHaveBeenCalledWith('/(tabs)');
  });
});
