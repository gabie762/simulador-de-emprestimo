// utils/apiMock.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'produtos_mock';
const defaultProdutos = [
  { id: '1', nome: 'Crédito Pessoal', taxaJurosAnual: 10.5, prazoMaximo: 24 },
  { id: '2', nome: 'Crediário CAIXA', taxaJurosAnual: 8.2, prazoMaximo: 36 },
  { id: '3', nome: 'Empréstimo Consignado', taxaJurosAnual: 6.8, prazoMaximo: 84 },
];

export async function getProdutos() {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProdutos));
      return [...defaultProdutos];
    }
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [...defaultProdutos];
  }
}

export async function postProduto(produto: any) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const produtos = stored ? JSON.parse(stored) : [...defaultProdutos];
        
        // Verifica se já existe um produto com o mesmo nome
        const produtoExistente = produtos.find((p: any) => 
          p.nome.toLowerCase().trim() === produto.nome.toLowerCase().trim()
        );
        
        if (produtoExistente) {
          reject(new Error('PRODUTO_DUPLICADO'));
          return;
        }
        
        const novo = { ...produto, id: Date.now().toString() };
        produtos.push(novo);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
        resolve(novo);
      } catch (error) {
        console.error('Erro ao salvar produto:', error);
        reject(error instanceof Error ? error : new Error('Erro desconhecido'));
      }
    }, 500);
  });
}

export async function resetProdutos() {
  await AsyncStorage.removeItem(STORAGE_KEY);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProdutos));
}

export async function deleteProduto(id: string) {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const produtos = stored ? JSON.parse(stored) : [];
    
    const produtosFiltrados = produtos.filter((produto: any) => produto.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtosFiltrados));
    
    return true;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return false;
  }
}
