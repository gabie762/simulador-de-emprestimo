import { render } from '@testing-library/react-native';
import React from 'react';
import NotFoundScreen from '../app/+not-found';

jest.mock('expo-router', () => ({
  Stack: {
    Screen: ({ options }: { options: { title: string } }) => null,
  },
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('NotFoundScreen', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<NotFoundScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the correct title text', () => {
    const { getByText } = render(<NotFoundScreen />);
    
    expect(getByText('This screen does not exist.')).toBeTruthy();
  });

  it('displays the link text correctly', () => {
    const { getByText } = render(<NotFoundScreen />);
    
    expect(getByText('Go to home screen!')).toBeTruthy();
  });

  it('renders component without errors', () => {
    const { toJSON } = render(<NotFoundScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('has the correct text styling', () => {
    const { getByText } = render(<NotFoundScreen />);
    
    const titleElement = getByText('This screen does not exist.');
    const linkTextElement = getByText('Go to home screen!');
    
    expect(titleElement).toHaveStyle({
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    });

    expect(linkTextElement).toHaveStyle({
      fontSize: 16,
      color: '#0066B3',
      textDecorationLine: 'underline',
    });
  });

  it('contains expected elements', () => {
    const { queryByText } = render(<NotFoundScreen />);
    
    // Check that both main text elements are present
    expect(queryByText('This screen does not exist.')).not.toBeNull();
    expect(queryByText('Go to home screen!')).not.toBeNull();
  });
});
