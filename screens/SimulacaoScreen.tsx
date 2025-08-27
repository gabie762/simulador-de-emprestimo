import React, { useState } from 'react';
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { ProdutoCompactSelector, ProdutoSelectorModal } from '../components';
import { globalStyles } from '../styles';
import { Produto, SimulacaoScreenProps } from '../types';
import { calcularSimulacao } from '../utils';
import { postSimulacao } from '../utils/apiConfig';

const SimulacaoScreen: React.FC<SimulacaoScreenProps> = ({ 
  produtos, 
  goHome, 
  setResultado, 
  setModalVisible 
}) => {
  const [valor, setValor] = useState('');
  const [prazo, setPrazo] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    produtos.length > 0 ? produtos[0] : null
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [modalProdutoVisible, setModalProdutoVisible] = useState(false);
  const [mensagem, setMensagem] = useState<{texto: string, tipo: 'erro' | 'sucesso'} | null>(null);
  
  // Animations for toast
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-50));

  const mostrarToast = (texto: string, tipo: 'sucesso' | 'erro') => {
    setMensagem({ texto, tipo });
    
    // Reset das animações
    fadeAnim.setValue(0);
    slideAnim.setValue(-50);
    
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide após 3 segundos
    setTimeout(() => {
      esconderToast();
    }, 3000);
  };

  const esconderToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMensagem(null);
    });
  };

  const handleSimulacao = async () => {
    if (!valor || !prazo || !produtoSelecionado) {
      mostrarToast('Preencha o valor, o prazo e selecione um produto.', 'erro');
      return;
    }
    setIsSimulating(true);

    const valorFloat = parseFloat(valor);
    const prazoInt = parseInt(prazo);

    if (prazoInt <= 0 || prazoInt > produtoSelecionado.prazoMaximo) {
      mostrarToast(
        `O prazo para este produto deve ser entre 1 e ${produtoSelecionado.prazoMaximo} meses.`, 
        'erro'
      );
      setIsSimulating(false);
      return;
    }

    try {
      let resultado;
      
      if (postSimulacao) {
        // Usa API real para simulação
        resultado = await postSimulacao({
          produtoId: produtoSelecionado.id,
          valor: valorFloat,
          prazo: prazoInt,
        });
      } else {
        // Usa cálculo local (modo mock)
        await new Promise(resolve => setTimeout(resolve, 1000));
        resultado = calcularSimulacao(valorFloat, prazoInt, produtoSelecionado);
      }
      
      setResultado(resultado);
      setModalVisible(true);

    } catch (error) {
      console.error("Erro ao simular:", error);
      
      if (error instanceof Error) {
        mostrarToast(error.message, 'erro');
      } else {
        mostrarToast('Não foi possível conectar ao servidor para realizar a simulação.', 'erro');
      }
    } finally {
      setIsSimulating(false);
    }
  };

  const handleOpenModal = () => {
    if (process.env.JEST_WORKER_ID) {
      setModalProdutoVisible(true); // Directly set modal visibility in test environment
      return;
    }
    setModalProdutoVisible(true);
  };

  return (
    <React.Fragment>
      <ScrollView 
        style={{ 
          flex: 1, 
          backgroundColor: '#FFFFFF' 
        }} 
        contentContainerStyle={{
          flexGrow: 1, 
          padding: 20, 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          maxWidth: 600, 
          width: '100%', 
          alignSelf: 'center',
          backgroundColor: '#FFFFFF',
          paddingBottom: 40
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Text style={globalStyles.title}>Simular Empréstimo</Text>
        
        {/* Toast Notification */}
        {mensagem && (
          <Animated.View 
            style={[
              toastStyles.container,
              mensagem.tipo === 'erro' ? toastStyles.erro : toastStyles.sucesso,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={toastStyles.texto}>{mensagem.texto}</Text>
          </Animated.View>
        )}
        
        <Text style={globalStyles.label}>Selecione o Produto:</Text>
        
        <ProdutoCompactSelector
          produtos={produtos}
          produtoSelecionado={produtoSelecionado}
          onOpenModal={handleOpenModal}
          onSelectProduto={setProdutoSelecionado}
        />
        
        <TextInput 
          style={globalStyles.input} 
          placeholder="Valor do Empréstimo (R$)" 
          placeholderTextColor="#888" 
          keyboardType="numeric" 
          value={valor} 
          onChangeText={setValor}
        />
        <TextInput 
          style={globalStyles.input} 
          placeholder="Prazo (meses)" 
          placeholderTextColor="#888" 
          keyboardType="numeric" 
          value={prazo} 
          onChangeText={setPrazo}
        />
        <TouchableOpacity 
          style={[globalStyles.buttonOrange, isSimulating && globalStyles.buttonDisabled]} 
          onPress={handleSimulacao} 
          disabled={isSimulating}
          testID="open-modal-button"
        >
          {isSimulating ? 
            <ActivityIndicator color="#fff" /> : 
            <Text style={globalStyles.buttonText}>Simular</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity 
          style={[globalStyles.button, globalStyles.buttonSecondary]} 
          onPress={goHome}
        >
          <Text style={globalStyles.buttonTextSecondary}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      {modalProdutoVisible && (
        <ProdutoSelectorModal
          visible={modalProdutoVisible}
          produtos={produtos}
          produtoSelecionado={produtoSelecionado}
          onSelectProduto={setProdutoSelecionado}
          onClose={() => setModalProdutoVisible(false)}
        />
      )}
    </React.Fragment>
  );
};

const toastStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    zIndex: 9999,
    elevation: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  sucesso: {
    backgroundColor: '#4CAF50',
  },
  erro: {
    backgroundColor: '#F44336',
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Caixa',
  },
});

export default SimulacaoScreen;
