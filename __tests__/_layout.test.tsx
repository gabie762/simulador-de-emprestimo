import { render } from '@testing-library/react-native';
import { useFonts } from 'expo-font';
import React from 'react';
import RootLayout from '../app/_layout';

jest.mock('expo-font', () => ({
  useFonts: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  DefaultTheme: {},
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

const mockedUseFonts = useFonts as jest.MockedFunction<typeof useFonts>;

describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders null when fonts are not loaded', () => {
    mockedUseFonts.mockReturnValue([false, null]);

    const { toJSON } = render(<RootLayout />);

    expect(toJSON()).toBeNull();
  });

  it('renders component when fonts are loaded', () => {
    mockedUseFonts.mockReturnValue([true, null]);

    const { toJSON } = render(<RootLayout />);

    expect(toJSON()).not.toBeNull();
  });

  it('calls useFonts with correct font configuration', () => {
    mockedUseFonts.mockReturnValue([true, null]);

    render(<RootLayout />);

    expect(mockedUseFonts).toHaveBeenCalledWith({
      SpaceMono: expect.anything(),
      Caixa: expect.anything(),
    });
  });
});
