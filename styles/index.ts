import { StyleSheet } from 'react-native';
import { normalizeShadow } from '../utils';

export const globalStyles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#DCDDDD'
  },
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    maxWidth: 600, 
    width: '100%', 
    alignSelf: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#0066B3',
    textAlign: 'center', 
    marginBottom: 20, 
    width: '100%',
    fontFamily: 'Caixa'
  },
  subtitle: { 
    fontSize: 18, 
    color: '#F7941E',
    textAlign: 'center', 
    marginBottom: 40,
    fontFamily: 'Caixa'
  },
  input: { 
    backgroundColor: '#FFFFFF', 
    color: '#0066B3',
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    borderRadius: 8, 
    fontSize: 16, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#C5C7C8',
    width: '100%',
    fontFamily: 'Caixa'
  },
  button: { 
    backgroundColor: '#0066B3',
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 10, 
    width: '100%' 
  },
  buttonOrange: { 
    backgroundColor: '#F7941E',
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 10, 
    width: '100%' 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: 'bold',
    fontFamily: 'Caixa'
  },
  buttonSecondary: { 
    backgroundColor: 'transparent', 
    borderWidth: 1, 
    borderColor: '#0066B3'
  },
  buttonTextSecondary: { 
    color: '#0066B3',
    fontSize: 18, 
    fontWeight: 'bold',
    fontFamily: 'Caixa'
  },
  buttonDisabled: { 
    backgroundColor: '#C5C7C8'
  },
  label: { 
    fontSize: 16, 
    color: '#0066B3',
    marginBottom: 10, 
    alignSelf: 'flex-start',
    fontFamily: 'Caixa'
  },
  fullWidthList: { 
    width: '100%' 
  },
});

export const modalStyles = StyleSheet.create({
  modalContainer: { 
    flex: 1, 
    backgroundColor: '#FFFFFF'
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#CCC', 
    width: '100%', 
    maxWidth: 800 
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#0066B3',
    fontFamily: 'Caixa'
  },
  resultadoBox: { 
    backgroundColor: '#F5F5F5', 
    borderRadius: 12, 
    padding: 20, 
    margin: 20, 
    width: '100%', 
    maxWidth: 800 
  },
  resultadoLabel: { 
    fontSize: 14, 
    color: '#0066B3',
    fontFamily: 'Caixa'
  },
  resultadoValor: { 
    fontSize: 18, 
    color: '#222', 
    fontWeight: '500', 
    marginBottom: 15,
    fontFamily: 'Caixa'
  },
  resultadoValorPrincipal: { 
    fontSize: 32, 
    color: '#007AFF', 
    fontWeight: 'bold', 
    marginBottom: 20,
    fontFamily: 'Caixa'
  },
  resultadoGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  resultadoGridItem: { 
    width: '48%', 
    marginBottom: 10 
  },
  memoriaCalculoContainer: { 
    padding: 20, 
    width: '100%', 
    maxWidth: 800 
  },
  tableScrollContainer: {
    maxHeight: 300,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: 10,
  },
  tableHeader: { 
    backgroundColor: '#0066B3',
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8 
  },
  tableRow: { 
    flexDirection: 'row', 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0' 
  },
  tableCell: { 
    flex: 1, 
    color: '#222', 
    textAlign: 'center', 
    fontSize: 12 
  },
  tableHeaderCell: { 
    flex: 1, 
    color: '#FFFFFF',
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 12 
  },
});

export const productStyles = StyleSheet.create({
  produtoScrollView: { 
    marginBottom: 4,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingLeft: 8,
    minHeight: undefined,
    height: 44,
  },
  produtoChip: normalizeShadow({ 
    minWidth: 80,
    maxWidth: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, 
    paddingVertical: 0, 
    borderRadius: 12,
    backgroundColor: '#EEE', 
    marginRight: 10,
    marginBottom: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  }),
  produtoChipSelected: { 
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: '#0066B3',
  },
  produtoChipText: { 
    color: '#222',
    fontFamily: 'Caixa',
    fontSize: 16,
    textAlign: 'center',
  },
  produtoChipTextSelected: { 
    fontWeight: 'bold',
    color: '#fff',
  },
  produtoCard: { 
    backgroundColor: '#F8F9FA', 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 14, 
    width: '100%',
    borderWidth: 1,
    borderColor: '#0066B3'
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#0066B3', 
    marginBottom: 10,
    fontFamily: 'Caixa'
  },
  cardInfoContainer: { 
    flexDirection: 'row', 
    gap: 14
  },
  cardInfo: { 
    fontSize: 16, 
    color: '#666',
    fontFamily: 'Caixa'
  },
  cardLabel: { 
    fontWeight: 'bold', 
    color: '#666',
    fontFamily: 'Caixa'
  }
});

// Estilos para o modal de seleção de produtos
export const produtoModalStyles = StyleSheet.create({
  produtoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  produtoModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '50%',
    overflow: 'hidden',
  },
  produtoModalList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  produtoModalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  produtoModalItemSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#0066B3',
    borderWidth: 2,
  },
  produtoModalContent: {
    flex: 1,
  },
  produtoModalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066B3',
    marginBottom: 5,
    fontFamily: 'Caixa',
  },
  produtoModalDetails: {
    gap: 2,
  },
  produtoModalDetailText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Caixa',
  },
  produtoModalCheck: {
    fontSize: 20,
    color: '#0066B3',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  produtoModalCloseButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0066B3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
    maxWidth: '100%',
  },
  // Estilos para o seletor compacto
  compactSelectorContainer: {
    width: '100%',
    marginBottom: 28,
    paddingHorizontal: 0,
    paddingVertical: 14,
  },
  produtoSelecionadoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0066B3',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 4,
    minHeight: 140,
  },
  produtoSelecionadoContent: {
    flex: 1,
  },
  produtoSelecionadoNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066B3',
    marginBottom: 10,
    fontFamily: 'Caixa',
  },
  produtoSelecionadoDetalhes: {
    flexDirection: 'row',
    gap: 25,
  },
  produtoSelecionadoDetalheTexto: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Caixa',
  },
  selectorArrow: {
    fontSize: 16,
    color: '#0066B3',
    marginLeft: 10,
  },
  indicadoresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  indicador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C5C7C8',
  },
  indicadorAtivo: {
    backgroundColor: '#0066B3',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  indicadorTexto: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontFamily: 'Caixa',
  },
  verMaisButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  verMaisTexto: {
    fontSize: 14,
    color: '#F7941E',
    fontFamily: 'Caixa',
    textDecorationLine: 'underline',
  },
  // Estilos para navegação lateral
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: '100%',
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 40,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066B3',
  },
  produtoNavSection: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  produtoNavNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066B3',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Caixa',
  },
  produtoNavDetalhes: {
    alignItems: 'center',
    gap: 2,
  },
  produtoNavDetalheTexto: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Caixa',
  },
});
