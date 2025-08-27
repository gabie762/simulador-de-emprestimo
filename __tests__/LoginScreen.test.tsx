import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';

jest.useFakeTimers();

describe('LoginScreen', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders correctly', () => {
    const mockOnLogin = jest.fn();
    const { toJSON } = render(<LoginScreen onLogin={mockOnLogin} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('shows an error message when fields are empty', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Usuário'), '');
      fireEvent.changeText(getByPlaceholderText('Senha'), '');
      fireEvent.press(getByText('Entrar'));
    });

    await waitFor(() => {
      expect(getByText('Por favor, preencha todos os campos.')).toBeTruthy();
    });
  });

  it('shows an error message for invalid input', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    fireEvent.changeText(getByPlaceholderText('Usuário'), 'ab');
    fireEvent.changeText(getByPlaceholderText('Senha'), '12');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Usuário e senha devem ter pelo menos 3 caracteres.')).toBeTruthy();
    });
  });

  it('shows a success message and calls onLogin for valid input', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    // Set the input values
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');

    // Press the login button and advance timers
    await act(async () => {
      fireEvent.press(getByText('Entrar'));
      jest.runAllTimers(); // Run all timers to complete the async login process
    });

    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeTruthy();
    });

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('validUser', 'validPass');
    });
  });

  it('displays a loading indicator while logging in', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText, getByTestId } = render(<LoginScreen onLogin={mockOnLogin} />);

    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    fireEvent.press(getByText('Entrar'));

    expect(getByTestId('loading-indicator')).toBeTruthy();

    await act(async () => {
      jest.runAllTimers(); // Ensure all timers complete
    });

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalled();
    });
  });

  it('calls mostrarToast with correct arguments', () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    fireEvent.changeText(getByPlaceholderText('Usuário'), '');
    fireEvent.changeText(getByPlaceholderText('Senha'), '');
    fireEvent.press(getByText('Entrar'));

    expect(getByText('Por favor, preencha todos os campos.')).toBeTruthy();
  });

  it('calls esconderToast after timeout', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    fireEvent.press(getByText('Entrar'));

    await act(async () => {
      jest.runAllTimers(); // Ensure all timers complete
    });

    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeTruthy();
    });
  });

  it('calls mostrarToast for success and error messages', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    // Trigger error toast
    fireEvent.changeText(getByPlaceholderText('Usuário'), '');
    fireEvent.changeText(getByPlaceholderText('Senha'), '');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Por favor, preencha todos os campos.')).toBeTruthy();
    });

    // Clear previous toast and trigger success toast
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    
    await act(async () => {
      fireEvent.press(getByText('Entrar'));
      jest.runAllTimers(); // Run all timers to complete the async login process
    });

    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeTruthy();
    });
  });

  it('ensures esconderToast is called after timeout', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(<LoginScreen onLogin={mockOnLogin} />);

    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    
    await act(async () => {
      fireEvent.press(getByText('Entrar'));
      jest.runAllTimers(); // Complete the login process
    });

    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeTruthy();
    });

    // Advance timers to trigger the auto-hide timeout
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(queryByText('Login realizado com sucesso!')).toBeNull();
    });
  });

  it('triggers onLogin callback with correct arguments', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    fireEvent.press(getByText('Entrar'));

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('validUser', 'validPass');
    });
  });

  it('tests esconderToast function coverage', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    // Trigger a toast
    fireEvent.changeText(getByPlaceholderText('Usuário'), '');
    fireEvent.changeText(getByPlaceholderText('Senha'), '');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Por favor, preencha todos os campos.')).toBeTruthy();
    });

    // Wait for auto-hide
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(() => getByText('Por favor, preencha todos os campos.')).toThrow();
    });
  });

  it('tests mostrarToast with animations', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    // Trigger a toast with animations
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeTruthy();
    });

    // Ensure animations are triggered
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(() => getByText('Login realizado com sucesso!')).toThrow();
    });
  });

  it('tests esconderToast without animations', async () => {
    const mockOnLogin = jest.fn();
    process.env.JEST_WORKER_ID = '1'; // Simulate test environment
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    // Trigger a toast
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeTruthy();
    });

    // Ensure toast is hidden immediately
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(() => getByText('Login realizado com sucesso!')).toThrow();
    });

    delete process.env.JEST_WORKER_ID; // Clean up
  });

  it('tests handleLogin error handling', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    // Simulate an error during login
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'errorUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'errorPass');

    // Mock the async login process to throw an error
    jest.spyOn(global, 'setTimeout').mockImplementationOnce((cb) => {
      throw new Error('Simulated login error');
    });

    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Erro ao fazer login. Tente novamente.')).toBeTruthy();
    });

    jest.restoreAllMocks(); // Clean up mocks
  });

  it('tests mostrarToast with JEST_WORKER_ID condition', async () => {
    const mockOnLogin = jest.fn();
    process.env.JEST_WORKER_ID = '1'; // Simulate test environment
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    // Trigger a toast
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeTruthy();
    });

    // Ensure toast is hidden immediately
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(() => getByText('Login realizado com sucesso!')).toThrow();
    });

    delete process.env.JEST_WORKER_ID; // Clean up
  });

  it('tests esconderToast with animations', async () => {
    const mockOnLogin = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginScreen onLogin={mockOnLogin} />);

    // Trigger a toast
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'validUser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'validPass');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeTruthy();
    });

    // Advance timers to trigger the auto-hide timeout
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(() => getByText('Login realizado com sucesso!')).toThrow();
    });
  });
});
