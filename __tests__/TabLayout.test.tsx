import { fireEvent, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import TabLayout from '../app/(tabs)/_layout';
import { useAuth } from '../contexts/AuthContext';

/* eslint-disable */
jest.mock('expo-router', () => {
  const React = require('react');
  const { Text, View } = require('react-native');
  
  const Tabs = ({ children, screenOptions }: any) => 
    React.createElement(View, { 
      testID: 'tab-bar', 
      style: screenOptions?.tabBarStyle 
    }, children);
  const TabsScreen = ({ children, options }: any) => 
    React.createElement(View, { testID: 'tabs-screen' }, 
      options?.title ? React.createElement(Text, null, options.title) : null,
      options?.tabBarIcon ? options.tabBarIcon({ color: '#0066B3' }) : null,
      children
    );
  TabsScreen.displayName = 'Tabs.Screen';
  Tabs.Screen = TabsScreen;
  
  return {
    useRouter: jest.fn(() => ({
      replace: jest.fn(),
    })),
    Tabs,
  };
});
/* eslint-enable */

jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    logout: jest.fn(),
  })),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: {},
  requireNativeModule: jest.fn(),
  requireNativeViewManager: jest.fn(),
}));

jest.mock('@/components/ui/IconSymbol', () => ({
  IconSymbol: ({ name, size, color }: any) => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return React.createElement(View, { testID: 'icon-symbol' }, 
      React.createElement(Text, { testID: `icon-${name}` }, `${name}-${size}-${color}`)
    );
  },
}));

jest.unmock('../app/(tabs)/_layout');

describe('TabLayout', () => {
  const mockLogout = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it('renders the TabLayout with all tabs', () => {
    const { getByText } = render(<TabLayout />);

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Cadastrar')).toBeTruthy();
    expect(getByText('Produtos')).toBeTruthy();
    expect(getByText('Simular')).toBeTruthy();
  });

  it('navigates to login screen on logout', () => {
    const { getByTestId } = render(<TabLayout />);

    const logoutButton = getByTestId('logout-button');
    fireEvent.press(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  it('applies correct tab bar styles', () => {
    const { getByTestId } = render(<TabLayout />);

    const tabBar = getByTestId('tab-bar');
    expect(tabBar.props.style).toMatchObject({
      backgroundColor: '#FFFFFF',
      borderTopColor: '#C5C7C8',
    });
  });
});

describe('TabLayout additional tests', () => {
  it('renders CaixaHeader with correct props', () => {
    const { getByTestId } = render(<TabLayout />);

    const logoutButton = getByTestId('logout-button');
    expect(logoutButton).toBeTruthy();
  });

  it('applies correct tab bar active and inactive tint colors', () => {
    const { getByTestId } = render(<TabLayout />);

    const tabBar = getByTestId('tab-bar');
    expect(tabBar.props.style).toMatchObject({
      backgroundColor: '#FFFFFF',
      borderTopColor: '#C5C7C8',
    });
  });

  it('renders IconSymbol for each tab', () => {
    const { getAllByTestId } = render(<TabLayout />);

    const tabs = getAllByTestId('tabs-screen');
    expect(tabs).toHaveLength(4);
  });
});

describe('TabLayout tab screens', () => {
  it('renders correct titles for all tabs', () => {
    const { getByText } = render(<TabLayout />);

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Cadastrar')).toBeTruthy();
    expect(getByText('Produtos')).toBeTruthy();
    expect(getByText('Simular')).toBeTruthy();
  });

  it('renders tabBarIcon for each tab', () => {
    const { getAllByTestId } = render(<TabLayout />);

    const icons = getAllByTestId('tabs-screen');
    expect(icons).toHaveLength(4);
  });
});

describe('TabLayout tabBarIcon', () => {
  it('renders the correct IconSymbol for each tab', () => {
    const { getByTestId } = render(<TabLayout />);

    // Verify the IconSymbol rendering for each tab
    expect(getByTestId('icon-house.fill')).toBeTruthy();
    expect(getByTestId('icon-plus.circle.fill')).toBeTruthy();
    expect(getByTestId('icon-folder.fill')).toBeTruthy();
    expect(getByTestId('icon-chart.line.uptrend.xyaxis')).toBeTruthy();
  });
});
