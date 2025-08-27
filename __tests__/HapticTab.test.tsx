import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { HapticTab } from '../components/HapticTab';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

describe('HapticTab', () => {
  const mockOnPressIn = jest.fn();
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('triggers haptic feedback on iOS', () => {
    process.env.EXPO_OS = 'ios';
    const hapticsSpy = jest.spyOn(Haptics, 'impactAsync').mockResolvedValueOnce();

    const { getByTestId } = render(
      <NavigationContainer>
        <HapticTab onPressIn={mockOnPressIn} testID="haptic-tab">
          <></>
        </HapticTab>
      </NavigationContainer>
    );

    const tab = getByTestId('haptic-tab');
    fireEvent(tab, 'onPressIn');

    expect(hapticsSpy).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    expect(mockOnPressIn).toHaveBeenCalled();
  });

  it('does not trigger haptic feedback on non-iOS platforms', () => {
    process.env.EXPO_OS = 'android';
    const hapticsSpy = jest.spyOn(Haptics, 'impactAsync').mockResolvedValueOnce();

    const { getByTestId } = render(
      <NavigationContainer>
        <HapticTab onPressIn={mockOnPressIn} testID="haptic-tab">
          <></>
        </HapticTab>
      </NavigationContainer>
    );

    const tab = getByTestId('haptic-tab');
    fireEvent(tab, 'onPressIn');

    expect(hapticsSpy).not.toHaveBeenCalled();
    expect(mockOnPressIn).toHaveBeenCalled();
  });
});
