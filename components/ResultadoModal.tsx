import React from 'react';
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CloseIcon } from '../components/CloseIcon';
import { globalStyles, modalStyles } from '../styles';
import { ResultadoModalProps } from '../types';

const ResultadoModal: React.FC<ResultadoModalProps> = ({ visible, onClose, resultado, testID }) => {
  if (!visible) return null;

  const renderAmortizacaoItem = ({ item }: { item: any }) => (
    <View style={modalStyles.tableRow}>
      <Text style={modalStyles.tableCell}>{item.mes}</Text>
      <Text style={modalStyles.tableCell}>R$ {item.juros}</Text>
      <Text style={modalStyles.tableCell}>R$ {item.amortizacao}</Text>
      <Text style={modalStyles.tableCell}>R$ {item.saldoDevedor}</Text>
    </View>
  );

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.modalContainer} testID={testID}>
        <View style={modalStyles.modalHeader}>
          <Text style={modalStyles.modalTitle}>Resultado da Simulação</Text>
          <TouchableOpacity onPress={onClose} testID="close-button">
            <CloseIcon />
          </TouchableOpacity>
        </View>
        {resultado ? (
          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={modalStyles.resultadoBox}>
              <Text style={modalStyles.resultadoLabel}>Produto:</Text>
              <Text style={modalStyles.resultadoValor}>{resultado.produto}</Text>
              <Text style={modalStyles.resultadoLabel}>Valor da Parcela:</Text>
              <Text style={modalStyles.resultadoValorPrincipal}>R$ {resultado.valorParcela}</Text>
            <View style={modalStyles.resultadoGrid}>
              <View style={modalStyles.resultadoGridItem}>
                <Text style={modalStyles.resultadoLabel}>Valor Solicitado</Text>
                <Text style={modalStyles.resultadoValor}>R$ {resultado.valorEmprestimo}</Text>
              </View>
              <View style={modalStyles.resultadoGridItem}>
                <Text style={modalStyles.resultadoLabel}>Prazo</Text>
                <Text style={modalStyles.resultadoValor}>{resultado.prazo} meses</Text>
              </View>
              <View style={modalStyles.resultadoGridItem}>
                <Text style={modalStyles.resultadoLabel}>Taxa Anual</Text>
                <Text style={modalStyles.resultadoValor}>{resultado.taxaJurosAnual}</Text>
              </View>
              <View style={modalStyles.resultadoGridItem}>
                <Text style={modalStyles.resultadoLabel}>Taxa Mensal Efetiva</Text>
                <Text style={modalStyles.resultadoValor}>{resultado.taxaJurosMensal}</Text>
              </View>
              <View style={modalStyles.resultadoGridItem}>
                <Text style={modalStyles.resultadoLabel}>Total de Juros</Text>
                <Text style={modalStyles.resultadoValor}>R$ {resultado.totalJuros}</Text>
              </View>
              <View style={modalStyles.resultadoGridItem}>
                <Text style={modalStyles.resultadoLabel}>Custo Total</Text>
                <Text style={modalStyles.resultadoValor}>R$ {resultado.totalPagar}</Text>
              </View>
            </View>
          </View>
          <View style={modalStyles.memoriaCalculoContainer}>
            <Text style={globalStyles.title}>Resultado da simulação:</Text>
            <View style={modalStyles.tableScrollContainer}>
              <View style={[modalStyles.tableRow, modalStyles.tableHeader]}>
                <Text style={modalStyles.tableHeaderCell}>Mês</Text>
                <Text style={modalStyles.tableHeaderCell}>Juros</Text>
                <Text style={modalStyles.tableHeaderCell}>Amortização</Text>
                <Text style={modalStyles.tableHeaderCell}>Saldo</Text>
              </View>
              <FlatList 
                data={resultado.memoriaCalculo} 
                renderItem={renderAmortizacaoItem} 
                keyExtractor={(item) => item.mes.toString()}
                style={{ maxHeight: 250 }}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              />
            </View>
            <TouchableOpacity 
              style={[globalStyles.button, globalStyles.buttonSecondary, {marginTop: 24}]} 
              onPress={onClose}
            >
              <Text style={globalStyles.buttonTextSecondary}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text testID="fallback-message">Nenhum resultado disponível</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ResultadoModal;
