# 🔗 Guia de Integração com API Real

Este guia explica como integrar o aplicativo com uma API real para os endpoints de produtos e simulações.

## 📋 Endpoints Necessários

### 1. **GET /produtos** - Listar produtos
```json
// Response esperado:
[
  {
    "id": "1",
    "nome": "Crédito Pessoal",
    "taxaJurosAnual": 10.5,
    "prazoMaximo": 24
  },
  {
    "id": "2", 
    "nome": "Empréstimo Consignado",
    "taxaJurosAnual": 6.8,
    "prazoMaximo": 84
  }
]
```

### 2. **POST /produtos** - Cadastrar produto
```json
// Request body:
{
  "nome": "Nome do Produto",
  "taxaJurosAnual": 8.5,
  "prazoMaximo": 36
}

// Response esperado:
{
  "id": "3",
  "nome": "Nome do Produto", 
  "taxaJurosAnual": 8.5,
  "prazoMaximo": 36
}
```

### 3. **POST /simulacoes** - Realizar simulação
```json
// Request body:
{
  "produtoId": "1",
  "valor": 10000,
  "prazo": 24
}

// Response esperado:
{
  "produto": {
    "id": "1",
    "nome": "Crédito Pessoal",
    "taxaJurosAnual": 10.5,
    "prazoMaximo": 24
  },
  "valorEmprestimo": 10000,
  "prazo": 24,
  "taxaJurosAnual": 10.5,
  "taxaJurosMensal": 0.8333,
  "valorParcela": 459.67,
  "totalPagar": 11032.08,
  "totalJuros": 1032.08,
  "memoriaCalculo": [
    {
      "mes": 1,
      "parcela": 459.67,
      "juros": 83.33,
      "amortizacao": 376.34,
      "saldoDevedor": 9623.66
    }
    // ... demais meses
  ]
}
```

## ⚙️ Como Configurar

### 1. **Alterar URL da API**
Edite o arquivo `utils/api.ts`:
```typescript
const API_BASE_URL = 'https://sua-api.com/api'; // ← Coloque sua URL aqui
```

### 2. **Ativar modo API Real**
Edite o arquivo `utils/apiConfig.ts`:
```typescript
export const USE_REAL_API = true; // ← Mude para true
```

### 3. **Configurar Autenticação (se necessário)**
No arquivo `utils/api.ts`, na função `apiRequest`, adicione headers de autenticação:
```typescript
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`, // ← Adicione aqui
};
```

## 🧪 Testando a Integração

### 1. **Teste de Conectividade**
```typescript
import { testApiConnection } from './utils/apiConfig';

// Em qualquer lugar do código:
const isConnected = await testApiConnection();
if (isConnected) {
  console.log('API está funcionando!');
} else {
  console.log('Erro na conexão com a API');
}
```

### 2. **Fallback para Mock**
Se a API falhar, o app automaticamente volta para o modo mock local.

## 📱 Comportamento do App

### **Modo Mock (USE_REAL_API = false)**
- ✅ Dados salvos localmente (AsyncStorage)
- ✅ Cálculo de simulação feito localmente
- ✅ Funciona offline
- ❌ Dados não sincronizam entre dispositivos

### **Modo API Real (USE_REAL_API = true)**
- ✅ Dados salvos no servidor
- ✅ Cálculo de simulação feito pelo backend
- ✅ Dados sincronizam entre dispositivos
- ❌ Requer conexão com internet

## 🔧 Tratamento de Erros

O app trata automaticamente os seguintes erros:

### **Códigos HTTP:**
- `400` - Dados inválidos
- `404` - Produto não encontrado  
- `409` - Produto duplicado
- `500` - Erro interno do servidor

### **Erros de Rede:**
- Timeout de conexão
- Sem internet
- Servidor indisponível

## 🎯 Próximos Passos

1. **Configure sua URL da API** em `utils/api.ts`
2. **Mude `USE_REAL_API` para `true`** em `utils/apiConfig.ts`
3. **Teste os endpoints** individualmente
4. **Implemente autenticação** se necessário
5. **Adicione logs** para monitoramento

## 💡 Dicas Importantes

- **Sempre teste em modo mock primeiro** antes de ativar a API real
- **Mantenha compatibilidade** com os tipos TypeScript existentes
- **Use HTTPS** em produção
- **Implemente rate limiting** no backend
- **Adicione validação** nos endpoints da API

---

**Qualquer dúvida, consulte os arquivos:**
- `utils/api.ts` - Implementação da API real
- `utils/apiMock.ts` - Implementação mock (referência)
- `utils/apiConfig.ts` - Configuração de alternância
