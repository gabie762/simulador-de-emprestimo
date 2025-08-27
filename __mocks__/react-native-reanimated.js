const jest = require('jest-mock');

// Mock for react-native-reanimated
export default {
  addWhitelistedNativeProps: jest.fn(),
  addWhitelistedUIProps: jest.fn(),
  createAnimatedComponent: (Component) => Component,
  Easing: {
    linear: jest.fn(),
    ease: jest.fn(),
  },
  useSharedValue: jest.fn(() => ({ value: 0 })),
  useAnimatedStyle: jest.fn(() => ({})),
  useAnimatedGestureHandler: jest.fn(() => jest.fn()),
  withTiming: jest.fn((value) => value),
  withSpring: jest.fn((value) => value),
  withDecay: jest.fn((value) => value),
};
