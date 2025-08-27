import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { CaixaHeader } from '@/components/CaixaHeader';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={{ flex: 1 }}>
      <CaixaHeader 
        tipo="chapado" 
        showLogout={true} 
        onLogout={handleLogout} 
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0066B3',
          tabBarInactiveTintColor: '#757575',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#C5C7C8',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="cadastro"
          options={{
            title: 'Cadastrar',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="listaProdutos"
          options={{
            title: 'Produtos',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="folder.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="simulacao"
          options={{
            title: 'Simular',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.line.uptrend.xyaxis" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
