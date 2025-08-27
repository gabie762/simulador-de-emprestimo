import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles, productStyles } from '../styles';
import { ListaProdutosProps, Produto } from '../types';
import { deleteProduto, resetProdutos } from '../utils/apiMock';

interface ExtendedListaProdutosProps extends ListaProdutosProps {
  onProdutoDeleted?: () => void;
  testID?: string; // Added testID prop
}

const ListaProdutosScreen: React.FC<ExtendedListaProdutosProps> = ({ produtos, goHome, onProdutoDeleted, testID }) => {
  const handleDeleteProduto = async (produto: Produto) => {
    try {
      const resultado = await deleteProduto(produto.id);
      
      if (resultado) {
        if (onProdutoDeleted) {
          onProdutoDeleted();
        }
      }
    } catch (error) {
      console.error('Erro na exclusão:', error);
    }
  };

  const handleRestaurarProdutosPadrao = async () => {
    try {
      await resetProdutos();
      
      if (onProdutoDeleted) {
        onProdutoDeleted();
      }
    } catch (error) {
      console.error('Erro ao restaurar produtos padrão:', error);
    }
  };

  const renderProdutoItem = ({ item }: { item: Produto }) => (
    <View style={productStyles.produtoCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={productStyles.cardTitle}>{item.nome}</Text>
          <View style={productStyles.cardInfoContainer}>
            <Text style={productStyles.cardInfo}>
              <Text style={productStyles.cardLabel}>Taxa Anual:</Text> {item.taxaJurosAnual.toFixed(2)}%
            </Text>
            <Text style={productStyles.cardInfo}>
              <Text style={productStyles.cardLabel}>Prazo Máximo:</Text> {item.prazoMaximo} meses
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          style={{
            backgroundColor: '#FF4444',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 6,
            marginLeft: 10,
          }}
          onPress={() => handleDeleteProduto(item)}
        >
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container} testID={testID}> {/* Applied testID */}
      <Text style={globalStyles.title}>Produtos Cadastrados</Text>
      
      {produtos.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={{ textAlign: 'center', color: '#666', fontSize: 16, marginBottom: 20 }}>
            Nenhum produto cadastrado.
          </Text>
          <TouchableOpacity 
            style={[globalStyles.button, { backgroundColor: '#F7941E' }]} 
            onPress={handleRestaurarProdutosPadrao}
            testID="restaurar-produtos-button"
          >
            <Text style={globalStyles.buttonText}>Restaurar Produtos Padrão</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList 
            data={produtos} 
            renderItem={renderProdutoItem} 
            keyExtractor={(item) => item.id} 
            style={globalStyles.fullWidthList}
          />
          
          <View style={{ marginTop: 20, gap: 10 }}>
            <TouchableOpacity 
              style={[globalStyles.button, { backgroundColor: '#F7941E' }]} 
              onPress={handleRestaurarProdutosPadrao}
            >
              <Text style={globalStyles.buttonText}>Restaurar Produtos Padrão</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[globalStyles.button, globalStyles.buttonSecondary]} 
              onPress={goHome}
              testID="voltar-button"
            >
              <Text style={globalStyles.buttonTextSecondary}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ListaProdutosScreen;
