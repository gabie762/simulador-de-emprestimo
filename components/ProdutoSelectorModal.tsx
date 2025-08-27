import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles, modalStyles, produtoModalStyles } from '../styles';
import { Produto } from '../types';
import { CloseIcon } from './CloseIcon';

interface ProdutoSelectorModalProps {
  visible: boolean;
  produtos: Produto[];
  produtoSelecionado: Produto | null;
  onSelectProduto: (produto: Produto) => void;
  onClose: () => void;
}

const ProdutoSelectorModal: React.FC<ProdutoSelectorModalProps> = ({
  visible,
  produtos,
  produtoSelecionado,
  onSelectProduto,
  onClose,
}) => {
  const renderProdutoItem = ({ item }: { item: Produto }) => (
    <TouchableOpacity
      testID={`produto-item-${item.id}`}
      style={[
        produtoModalStyles.produtoModalItem,
        produtoSelecionado?.id === item.id && produtoModalStyles.produtoModalItemSelected,
      ]}
      onPress={() => {
        onSelectProduto(item);
        onClose();
      }}
    >
      <View style={produtoModalStyles.produtoModalContent}>
        <Text style={produtoModalStyles.produtoModalTitle}>{item.nome}</Text>
        <View style={produtoModalStyles.produtoModalDetails}>
          <Text style={produtoModalStyles.produtoModalDetailText}>
            Taxa: {item.taxaJurosAnual.toFixed(1)}% ao ano
          </Text>
          <Text style={produtoModalStyles.produtoModalDetailText}>
            Prazo máximo: {item.prazoMaximo} meses
          </Text>
        </View>
      </View>
      {produtoSelecionado?.id === item.id && (
        <Text style={produtoModalStyles.produtoModalCheck}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
      presentationStyle="overFullScreen"
    >
      <TouchableOpacity 
        style={produtoModalStyles.produtoModalOverlay}
        activeOpacity={1}
        onPress={onClose}
        testID="produto-modal-overlay"
      >
        <TouchableOpacity 
          style={produtoModalStyles.produtoModalContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Selecionar Produto</Text>
            <TouchableOpacity onPress={onClose}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={produtos}
            renderItem={renderProdutoItem}
            keyExtractor={(item) => item.id}
            style={produtoModalStyles.produtoModalList}
            showsVerticalScrollIndicator={true}
            bounces={false}
          />
          
          <TouchableOpacity
            style={produtoModalStyles.produtoModalCloseButton}
            onPress={onClose}
          >
            <Text style={globalStyles.buttonTextSecondary}>Fechar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProdutoSelectorModal;
