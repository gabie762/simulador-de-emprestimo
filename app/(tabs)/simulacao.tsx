import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, StatusBar, View } from 'react-native';
import ResultadoModal from '../../components/ResultadoModal';
import SimulacaoScreen from '../../screens/SimulacaoScreen';
import { Produto, Resultado } from '../../types';
import { getProdutos } from '../../utils/apiConfig';

export default function SimulacaoTab() {
  const [produtos, setProdutos] = React.useState<Produto[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [resultado, setResultado] = React.useState<Resultado | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
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
    fetchProdutos();
  }, [isFocused]);

  const goHome = () => {
    router.push('/(tabs)');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator testID="loading-indicator" size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" />
      <SimulacaoScreen 
        produtos={produtos} 
        goHome={goHome} 
        setResultado={setResultado} 
        setModalVisible={setModalVisible} 
      />
      <ResultadoModal
        visible={modalVisible}
        resultado={resultado}
        onClose={() => setModalVisible(false)}
        testID="resultado-modal"
      />
    </View>
  );
}
