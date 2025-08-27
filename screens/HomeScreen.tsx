import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps & { testID?: string }> = ({ onNavigate, testID }) => {
  return (
    <View style={globalStyles.container} testID={testID}>
      <Text style={globalStyles.title}>Simulador de Empréstimos</Text>
      <Text style={globalStyles.subtitle}>O que você gostaria de fazer?</Text>
      <TouchableOpacity 
        style={globalStyles.button} 
        onPress={() => onNavigate('cadastro')}
        testID="navigate-cadastro"
        accessibilityLabel="Cadastrar Produto"
      >
        <Text style={globalStyles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={globalStyles.button} 
        onPress={() => onNavigate('listaProdutos')}
        testID="navigate-listaProdutos"
        accessibilityLabel="Listar Produtos"
      >
        <Text style={globalStyles.buttonText}>Listar Produtos</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={globalStyles.button} 
        onPress={() => onNavigate('simulacao')}
        testID="navigate-simulacao"
        accessibilityLabel="Nova Simulação"
      >
        <Text style={globalStyles.buttonText}>Nova Simulação</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
