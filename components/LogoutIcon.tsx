import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface LogoutIconProps {
  size?: number;
  color?: string;
  variant?: 'arrow' | 'power' | 'door' | 'exit';
}

export const LogoutIcon: React.FC<LogoutIconProps> = ({ 
  size = 20, 
  color = '#fff',
  variant = 'arrow'
}) => {
  const getPath = () => {
    switch (variant) {
      case 'power':
        return (
          <>
            <Path
              d="M18.36 6.64a9 9 0 1 1-12.73 0"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              testID="logout-icon-path"
            />
            <Path
              d="M12 2v10"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              testID="logout-icon-path-2"
            />
          </>
        );
      case 'door':
        return (
          <Path
            d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 12h6m-3-3l3 3-3 3"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            testID="logout-icon-path"
          />
        );
      case 'exit':
        return (
          <Path
            d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            testID="logout-icon-path"
          />
        );
      case 'arrow':
      default:
        return (
          <Path
            d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            testID="logout-icon-path"
          />
        );
    }
  };

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        testID="logout-icon"
      >
        {getPath()}
      </Svg>
    </View>
  );
};
