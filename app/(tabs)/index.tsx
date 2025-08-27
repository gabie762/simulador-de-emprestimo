import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, StatusBar, View } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import { getProdutos } from '../../utils/apiConfig';

export default function HomeTab() {
  const [isLoading, setIsLoading] = React.useState(true);
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
    const fetchProdutos = async () => {
      setIsLoading(true);
      try {
        await getProdutos();
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os produtos do servidor.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProdutos();
  }, [isFocused]);

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'cadastro':
        router.push('/(tabs)/cadastro');
        break;
      case 'listaProdutos':
        router.push('/(tabs)/listaProdutos');
        break;
      case 'simulacao':
        router.push('/(tabs)/simulacao');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#DCDDDD', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator testID="loading-spinner" size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#DCDDDD' }}>
      <StatusBar barStyle="light-content" />
      <HomeScreen testID="home-screen" onNavigate={handleNavigate} />
    </View>
  );
}
