# Simulador de Crédito - Estrutura Modularizada

## 📁 Estrutura do Projeto

```
simulador-credito/
├── app/
│   └── (tabs)/
│       └── explore.tsx          # Componente principal (apenas orquestração)
├── types/
│   └── index.ts                 # Definições de tipos TypeScript
├── styles/
│   └── index.ts                 # Estilos organizados por contexto
├── components/
│   ├── index.ts                 # Exports dos componentes
│   ├── CloseIcon.tsx           # Componente de ícone
│   └── ResultadoModal.tsx      # Modal de resultado
├── screens/
│   ├── index.ts                 # Exports das telas
│   ├── HomeScreen.tsx          # Tela inicial
│   ├── CadastroProdutoScreen.tsx # Tela de cadastro
│   ├── ListaProdutosScreen.tsx  # Tela de listagem
│   └── SimulacaoScreen.tsx     # Tela de simulação
└── utils/
    └── index.ts                 # Funções utilitárias e dados mock
```

## 🔧 Módulos

### 📝 Types (`/types/index.ts`)
- **Produto**: Interface para produtos de crédito
- **Resultado**: Interface para resultados de simulação
- **Props**: Interfaces para propriedades dos componentes

### 🎨 Styles (`/styles/index.ts`)
- **globalStyles**: Estilos globais (containers, botões, inputs)
- **modalStyles**: Estilos específicos para modais
- **productStyles**: Estilos para componentes de produtos

### 🧱 Components (`/components/`)
- **CloseIcon**: Ícone de fechar reutilizável
- **ResultadoModal**: Modal completo para exibir resultados

### 📱 Screens (`/screens/`)
- **HomeScreen**: Tela inicial com navegação
- **CadastroProdutoScreen**: Formulário de cadastro de produtos
- **ListaProdutosScreen**: Lista de produtos cadastrados
- **SimulacaoScreen**: Formulário e lógica de simulação

### 🛠 Utils (`/utils/index.ts`)
- **mockProdutos**: Dados de exemplo
- **calcularSimulacao**: Função para cálculo de financiamento

## 🚀 Vantagens da Modularização

### ✅ **Organização**
- Código separado por responsabilidade
- Fácil localização de funcionalidades
- Estrutura escalável

### ✅ **Manutenibilidade**
- Alterações isoladas em módulos específicos
- Redução de acoplamento entre componentes
- Facilidade para debugging

### ✅ **Reutilização**
- Componentes podem ser reutilizados em outros projetos
- Estilos centralizados e consistentes
- Funções utilitárias compartilháveis

### ✅ **Testabilidade**
- Cada módulo pode ser testado independentemente
- Mocks mais fáceis de implementar
- Testes unitários mais focados

### ✅ **Performance**
- Import somente do que é necessário
- Tree-shaking mais eficiente
- Carregamento otimizado

## 🔄 Como Usar

### Importações Simplificadas
```typescript
// Ao invés de:
import { Produto } from '../../types/Produto';
import { globalStyles } from '../../styles/global';

// Use:
import { Produto } from '../../types';
import { globalStyles } from '../../styles';
```

### Adicionando Novos Componentes
1. Crie o arquivo na pasta apropriada
2. Adicione o export no `index.ts` da pasta
3. Importe onde necessário

### Modificando Estilos
1. Localize o grupo de estilos em `/styles/index.ts`
2. Faça a alteração necessária
3. O estilo será automaticamente atualizado em todos os componentes

## 📋 Próximos Passos

- [ ] Adicionar testes unitários para cada módulo
- [ ] Implementar Context API para estado global
- [ ] Adicionar internacionalização (i18n)
- [ ] Criar hooks customizados para lógicas complexas
- [ ] Implementar integração com API real
