// Mock for expo-router - ESLint disabled for mock file
/* eslint-disable */
const React = require('react');

const Stack = ({ children, ...props }) => {
  return React.createElement('View', { testID: 'stack', ...props }, children);
};

Stack.Screen = ({ name, ...props }) => {
  const cleanName = name ? name.replace(/[()]+/g, '').replace(/\+/g, '') : 'unknown';
  return React.createElement('View', { 
    testID: `screen-${cleanName}`,
    ...props 
  });
};

const createMockFn = () => () => {};

module.exports = {
  Stack,
  useRouter: () => ({
    push: createMockFn(),
    replace: createMockFn(),
    back: createMockFn(),
  }),
  useSegments: () => [],
  usePathname: () => '/',
};
