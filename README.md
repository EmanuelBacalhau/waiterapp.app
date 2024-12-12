# Projeto: WaiterApp

## Descrição

O **WaiterApp** é um aplicativo desenvolvido com **React Native**, **Expo** e **TypeScript**, projetado para facilitar a gestão de pedidos em restaurantes. O aplicativo inclui funcionalidades como exibição de categorias de produtos, controle de pedidos, modal de produtos, e confirmação de pedidos, oferecendo uma interface amigável e eficiente.

Este projeto consome a API disponível no seguinte repositório: [WaiterApp API](https://github.com/EmanuelBacalhau/waiterapp.api).

---

## Estrutura de Pastas

### **src/**

Pasta principal contendo todo o código-fonte do projeto.

#### **assets/**

Contém recursos estáticos, como imagens, ícones ou fontes.

#### **components/**

Componentes reutilizáveis da aplicação.

#### **context/**

Gerenciamento de estado global da aplicação utilizando Context API.

#### **main/**

Configurações ou funções principais da aplicação.

#### **mocks/**

Dados fictícios ou mockados para desenvolvimento e testes locais.

#### **types/**

Definições de tipos e interfaces utilizadas em TypeScript.

#### **utils/**

Funções auxiliares e utilitárias.

- **api.ts**: Configurações ou funções relacionadas a chamadas de API.
- **format-currency.ts**: Função para formatação de valores monetários.

---

## Configuração do Projeto

### Requisitos

- **Node.js** (versão recomendada: 16 ou superior)
- **npm** ou **yarn**

### Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_PROJETO>
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o ambiente de desenvolvimento:
   ```bash
   expo start
   ```

---

## Configurações Adicionais

### **Tailwind CSS**

As classes de estilo seguem as configurações definidas no arquivo `tailwind.config.js`.

### **Metro Bundler**

As configurações do bundler do React Native estão no arquivo `metro.config.js`.

---

## Scripts Disponíveis

- **Iniciar o ambiente de desenvolvimento**:

  ```bash
  npm start
  ```

- **Executar no Android**:

  ```bash
  npm run android
  ```

- **Executar no iOS**:

  ```bash
  npm run ios
  ```

- **Limpar Cache**:
  ```bash
  npm run clean
  ```

---

## Contribuição

Sinta-se à vontade para enviar pull requests ou abrir issues para melhorias ou correções.
