import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles';
import { postProduto } from '../utils/apiConfig';

interface CadastroProdutoScreenProps {
  goHome: () => void;
  atualizarProdutos: () => Promise<void>;
  testID?: string;
}

const CadastroProdutoScreen: React.FC<CadastroProdutoScreenProps> = ({ goHome, atualizarProdutos, testID }) => {
  const [nome, setNome] = useState('');
  const [taxaJurosAnual, setTaxaJurosAnual] = useState('');
  const [prazoMaximo, setPrazoMaximo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mensagem, setMensagem] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-100));

  const limparCampos = () => {
    setNome('');
    setTaxaJurosAnual('');
    setPrazoMaximo('');
    setMensagem(null);
  };

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
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMensagem(null);
    });
  };

  useEffect(() => {
    limparCampos();
  }, []);

  const handleVoltar = () => {
    limparCampos();
    goHome();
  };

  const handleCadastro = async () => {
    if (!nome || !taxaJurosAnual || !prazoMaximo) {
      mostrarToast('Todos os campos são obrigatórios.', 'erro');
      return;
    }
    setIsSubmitting(true);
    setMensagem(null);
    const novoProduto = { 
      nome, 
      taxaJurosAnual: parseFloat(taxaJurosAnual.replace(',', '.')), 
      prazoMaximo: parseInt(prazoMaximo) 
    };
    
    try {
      await postProduto(novoProduto);
      
      await atualizarProdutos();
      
      // Limpa os campos após atualizar os produtos
      limparCampos();
      
      // Mostra toast de sucesso
      mostrarToast('Produto cadastrado com sucesso!', 'sucesso');
      
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      if (error instanceof Error && error.message === 'PRODUTO_DUPLICADO') {
        mostrarToast('Já existe um produto cadastrado com este nome. Escolha um nome diferente.', 'erro');
      } else {
        mostrarToast('Não foi possível conectar ao servidor para cadastrar o produto.', 'erro');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View testID={testID}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={[globalStyles.container, { 
          flexGrow: 1,
          paddingBottom: 120 // Espaço extra para o tab bar
        }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Text style={globalStyles.title}>Cadastrar Novo Produto</Text>
        
        {/* Toast Notification */}
        {mensagem && (
          <Animated.View 
            style={[
              styles.toast,
              mensagem.tipo === 'sucesso' ? styles.toastSucesso : styles.toastErro,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.toastTexto}>{mensagem.texto}</Text>
          </Animated.View>
        )}
        
        <TextInput 
          style={globalStyles.input} 
          placeholder="Nome do Produto" 
          placeholderTextColor="#888" 
          value={nome} 
          onChangeText={setNome}
        />
        <TextInput 
          style={globalStyles.input} 
          placeholder="Taxa de Juros Anual (%)" 
          placeholderTextColor="#888" 
          keyboardType="numeric" 
          value={taxaJurosAnual} 
          onChangeText={setTaxaJurosAnual}
        />
        <TextInput 
          style={globalStyles.input} 
          placeholder="Prazo Máximo (meses)" 
          placeholderTextColor="#888" 
          keyboardType="numeric" 
          value={prazoMaximo} 
          onChangeText={setPrazoMaximo}
        />
        <TouchableOpacity 
          style={[globalStyles.buttonOrange, isSubmitting && globalStyles.buttonDisabled]} 
          onPress={handleCadastro} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            <ActivityIndicator color="#fff" /> : 
            <Text style={globalStyles.buttonText}>Cadastrar</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.button, globalStyles.buttonSecondary]} onPress={handleVoltar}>
          <Text style={globalStyles.buttonTextSecondary}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  toastSucesso: {
    backgroundColor: '#4CAF50',
  },
  toastErro: {
    backgroundColor: '#F44336',
  },
  toastTexto: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Caixa',
    fontWeight: 'bold',
  },
});

export default CadastroProdutoScreen;