import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, StatusBar, TouchableOpacity, View } from 'react-native';
import ResultadoModal from '../../components/ResultadoModal';
import CadastroProdutoScreen from '../../screens/CadastroProdutoScreen';
import { getProdutos } from '../../utils/apiConfig';

export default function CadastroTab() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
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

  const atualizarProdutos = async () => {
    await getProdutos();
  };

  const goHome = () => {
    router.push('/(tabs)');
  };

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, backgroundColor: '#DCDDDD', justifyContent: 'center', alignItems: 'center' }}
        testID="loading-spinner"
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#DCDDDD' }}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity onPress={goHome} testID="go-home-button">
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} testID="toggle-modal-button">
      </TouchableOpacity>
      <CadastroProdutoScreen
        goHome={goHome}
        atualizarProdutos={atualizarProdutos}
        testID="cadastro-produto-screen"
      />
      <ResultadoModal
        visible={modalVisible}
        resultado={null}
        onClose={() => setModalVisible(false)}
        testID="resultado-modal"
      />
    </View>
  );
}
