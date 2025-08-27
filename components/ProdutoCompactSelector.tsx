import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { produtoModalStyles } from '../styles';
import { Produto } from '../types';

interface ProdutoCompactSelectorProps {
  produtos: Produto[];
  produtoSelecionado: Produto | null;
  onOpenModal: () => void;
  onSelectProduto: (produto: Produto) => void;
  maxVisibleProducts?: number;
}

const ProdutoCompactSelector: React.FC<ProdutoCompactSelectorProps> = ({
  produtos,
  produtoSelecionado,
  onOpenModal,
  onSelectProduto,
  maxVisibleProducts = 3,
}) => {
  const showVerMais = produtos.length > maxVisibleProducts;
  const currentIndex = produtoSelecionado 
    ? produtos.findIndex(p => p.id === produtoSelecionado.id) 
    : 0;

  const navegarProduto = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % produtos.length 
      : (currentIndex - 1 + produtos.length) % produtos.length;
    onSelectProduto(produtos[newIndex]);
  };

  const renderIndicadores = () => {
    const totalIndicadores = Math.min(produtos.length, maxVisibleProducts);
    const selectedIndex = produtoSelecionado 
      ? produtos.findIndex(p => p.id === produtoSelecionado.id) 
      : 0;

    return (
      <View style={produtoModalStyles.indicadoresContainer}>
        {Array.from({ length: totalIndicadores }, (_, index) => (
          <View
            key={index}
            testID="indicador"
            style={[
              produtoModalStyles.indicador,
              selectedIndex === index && produtoModalStyles.indicadorAtivo,
            ]}
          />
        ))}
        {showVerMais && (
          <Text style={produtoModalStyles.indicadorTexto}>
            +{produtos.length - maxVisibleProducts}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={produtoModalStyles.compactSelectorContainer}>
      {/* Card do produto selecionado com navegação lateral */}
      <View style={produtoModalStyles.navigationContainer}>
        <TouchableOpacity 
          onPress={() => navegarProduto('prev')}
          accessibilityLabel="Previous"
          style={[
            produtoModalStyles.navButton,
            produtos.length <= 1 && produtoModalStyles.navButtonDisabled
          ]}
          disabled={produtos.length <= 1}
        >
          <Text style={produtoModalStyles.navButtonText}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={produtoModalStyles.produtoSelecionadoCard}
          onPress={onOpenModal}
          testID="produto-selecionado-card"
        >
          <View style={produtoModalStyles.produtoSelecionadoContent}>
            <Text style={produtoModalStyles.produtoSelecionadoNome}>
              {produtoSelecionado?.nome || 'Selecione um produto'}
            </Text>
            {produtoSelecionado && (
              <View style={produtoModalStyles.produtoSelecionadoDetalhes}>
                <Text style={produtoModalStyles.produtoSelecionadoDetalheTexto}>
                  Taxa: {produtoSelecionado.taxaJurosAnual.toFixed(1)}% a.a.
                </Text>
                <Text style={produtoModalStyles.produtoSelecionadoDetalheTexto}>
                  Até {produtoSelecionado.prazoMaximo} meses
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navegarProduto('next')}
          accessibilityLabel="Next"
          style={[
            produtoModalStyles.navButton,
            produtos.length <= 1 && produtoModalStyles.navButtonDisabled
          ]}
          disabled={produtos.length <= 1}
        >
          <Text style={produtoModalStyles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Indicadores */}
      {renderIndicadores()}
      
      {/* Ver Mais */}
      {showVerMais && (
        <TouchableOpacity
          style={produtoModalStyles.verMaisButton}
          onPress={onOpenModal}
        >
          <Text style={produtoModalStyles.verMaisTexto}>
            Ver todos os produtos ({produtos.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProdutoCompactSelector;
