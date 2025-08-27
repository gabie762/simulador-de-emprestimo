import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, StatusBar, View } from 'react-native';
import ListaProdutosScreen from '../../screens/ListaProdutosScreen';
import { Produto } from '../../types';
import { getProdutos } from '../../utils/apiConfig';

export default function ListaProdutosTab() {
  const [produtos, setProdutos] = React.useState<Produto[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isFocused = useIsFocused();
  const router = useRouter();

  const fetchProdutos = async () => {
    setIsLoading(true);
    try {
      const produtosMock = await getProdutos();
      setProdutos(produtosMock as Produto[]);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos do servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, [isFocused]);

  const handleProdutoDeleted = () => {
    fetchProdutos(); // Recarrega a lista após deletar
  };

  const goHome = () => {
    router.push('/(tabs)');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#DCDDDD', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" testID="loading-indicator" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#DCDDDD' }}>
      <StatusBar barStyle="light-content" />
      <ListaProdutosScreen
        produtos={produtos}
        goHome={goHome}
        onProdutoDeleted={handleProdutoDeleted}
        testID="go-home-button" // Added testID
      />
    </View>
  );
}
