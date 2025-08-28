# 💳 Simulador de Crédito

Um aplicativo móvel moderno e intuitivo para simulação de empréstimos e crédito pessoal, desenvolvido com React Native e Expo.

![Versão](https://img.shields.io/badge/versão-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-green.svg)
![Expo](https://img.shields.io/badge/Expo-~53.0.20-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)

## 📱 Funcionalidades

- **🏠 Tela Inicial** - Interface limpa e intuitiva
- **🔐 Sistema de Login** - Autenticação segura de usuários
- **➕ Cadastro de Produtos** - Adicione novos produtos de crédito
- **📋 Listagem de Produtos** - Visualize todos os produtos disponíveis
- **🧮 Simulação de Empréstimos** - Calcule parcelas e juros em tempo real
- **📊 Detalhamento Completo** - Visualize memória de cálculo detalhada
- **💾 Armazenamento Local** - Dados salvos localmente com AsyncStorage
- **🌐 API Ready** - Preparado para integração com backend

## 🚀 Tecnologias

- **React Native** 0.79.5
- **Expo** ~53.0.20
- **TypeScript** para tipagem estática
- **Expo Router** para navegação
- **AsyncStorage** para persistência local
- **React Native Reanimated** para animações
- **Jest** para testes unitários

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Passos para Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/gabie762/simulador-de-emprestimo.git
cd simulador-de-emprestimo
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm start
# ou
yarn start
```

4. **Execute no dispositivo/emulador:**
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 🎮 Como Usar

### 1. **Login**
- Acesse o aplicativo com suas credenciais
- O sistema mantém você logado automaticamente

### 2. **Gerenciar Produtos**
- **Cadastrar**: Adicione novos produtos de crédito definindo nome, taxa de juros anual e prazo máximo
- **Listar**: Visualize todos os produtos cadastrados
- **Excluir**: Remova produtos que não são mais oferecidos

### 3. **Simular Empréstimo**
- Selecione um produto de crédito
- Informe o valor desejado
- Defina o prazo em meses
- Visualize o resultado detalhado com:
  - Valor da parcela mensal
  - Total a pagar
  - Total de juros
  - Memória de cálculo mês a mês

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular e escalável:

```
simulador-credito/
├── app/                    # Páginas e navegação (Expo Router)
├── components/             # Componentes reutilizáveis
├── screens/               # Telas principais da aplicação
├── contexts/              # Context API (AuthContext)
├── types/                 # Definições TypeScript
├── styles/                # Estilos organizados
├── utils/                 # Funções utilitárias e APIs
├── hooks/                 # Custom hooks
└── __tests__/            # Testes unitários
```

### 🔧 Principais Módulos

- **📱 Screens**: Telas principais (Login, Simulação, Cadastro, Lista)
- **🧩 Components**: Componentes reutilizáveis (Modais, Seletores, Ícones)
- **🎨 Styles**: Estilos globais e específicos organizados
- **🔧 Utils**: Cálculos financeiros e integração com API
- **📝 Types**: Interfaces TypeScript para type safety

## 🧮 Cálculos Financeiros

O aplicativo utiliza a **Tabela Price** (Sistema Francês) para cálculo de financiamentos:

- **Taxa mensal**: `Taxa anual / 12 / 100`
- **Parcela**: `P = PV × [(1+i)^n × i] / [(1+i)^n - 1]`
- **Onde**: P = Parcela, PV = Valor Presente, i = Taxa, n = Períodos

## 🌐 Integração com API

O aplicativo suporta dois modos de operação:

### Modo Mock (Padrão)
- Dados salvos localmente (AsyncStorage)
- Cálculos realizados no dispositivo
- Funciona offline
- Ideal para desenvolvimento e testes

### Modo API Real
- Integração com backend
- Cálculos no servidor
- Sincronização entre dispositivos
- Para configurar: altere `USE_REAL_API = true` em `utils/apiConfig.ts`

### Endpoints Necessários
```
GET    /produtos           # Listar produtos
POST   /produtos           # Cadastrar produto
POST   /simulacoes         # Realizar simulação
DELETE /produtos/:id       # Excluir produto
```

## 🧪 Testes

O projeto inclui testes unitários abrangentes:

```bash
# Executar todos os testes
npm test

# Executar com coverage
npm run test -- --coverage

# Executar em modo watch
npm run test -- --watch
```

### Cobertura de Testes
- ✅ Componentes React
- ✅ Telas principais
- ✅ Funções utilitárias
- ✅ Cálculos financeiros
- ✅ Integração com AsyncStorage

## 📱 Plataformas Suportadas

- **📱 iOS** (iPhone/iPad)
- **🤖 Android** (Smartphones/Tablets)
- **🌐 Web** (PWA)

## 🎨 Design System

O aplicativo segue as diretrizes visuais da CAIXA:

- **Cores**: Paleta oficial CAIXA (azul, laranja)
- **Tipografia**: Fontes CAIXA e sistema
- **Componentes**: Design consistente e acessível
- **Animações**: Transições suaves com Reanimated

## 🔧 Scripts Disponíveis

```json
{
  "start": "expo start",              # Inicia o servidor de desenvolvimento
  "android": "expo start --android",  # Executa no Android
  "ios": "expo start --ios",         # Executa no iOS
  "web": "expo start --web",         # Executa na web
  "test": "jest",                    # Executa os testes
  "lint": "expo lint",               # Analisa o código
  "reset-project": "node ./scripts/reset-project.js"
}
```