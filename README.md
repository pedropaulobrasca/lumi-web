# 🌟 Lumi Web - Interface de Gerenciamento de Faturas de Energia

<div align="center">
  <img src="https://vitejs.dev/logo.svg" width="120" alt="Vite Logo" />
  <br>
  <h3>Interface web para visualização e gerenciamento de faturas de energia elétrica</h3>
</div>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-requisitos">Requisitos</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-executando-o-projeto">Executando</a> •
  <a href="#-componentes">Componentes</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a>
</p>

## 📋 Sobre o Projeto

O Lumi Web é a interface de usuário para o sistema de gerenciamento de faturas de energia elétrica. A aplicação permite visualizar dados de consumo de energia, economia com geração distribuída (GD), e gerenciar faturas através de uma interface intuitiva e responsiva.

Este projeto foi desenvolvido com React, TypeScript e Vite, oferecendo uma experiência de usuário moderna e eficiente.

## ✨ Funcionalidades

- 📊 **Dashboard**: Visualização de indicadores de consumo e economia de energia
- 📃 **Listagem de Faturas**: Exibição e filtragem de faturas cadastradas
- 🔍 **Filtros Avançados**: Busca de faturas por cliente e mês de referência
- 📄 **Upload de Faturas**: Envio de novas faturas em formato PDF
- 📱 **Interface Responsiva**: Adaptação a diferentes tamanhos de tela
- 🛡️ **Validação de Dados**: Verificação de formatos e tipos de arquivos
- ⚠️ **Tratamento de Erros**: Notificações claras para erros e sucessos

## 🚀 Tecnologias

O projeto utiliza as seguintes tecnologias:

- [React](https://react.dev/) - Biblioteca para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Vite](https://vitejs.dev/) - Ferramenta de build rápida para desenvolvimento
- [Axios](https://axios-http.com/) - Cliente HTTP para requisições à API
- [Shadcn/UI](https://ui.shadcn.com/) - Componentes de UI reutilizáveis
- [Recharts](https://recharts.org/) - Biblioteca para criação de gráficos
- [Sonner](https://sonner.emilkowal.ski/) - Sistema de notificações toast
- [Lucide React](https://lucide.dev/) - Ícones modernos para a interface

## 📝 Requisitos

- Node.js (v16 ou superior)
- pnpm (recomendado) ou npm
- API Lumi rodando localmente

## 📍 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/lumi-web.git
cd lumi-web
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

## 🚀 Executando o Projeto

### Ambiente de Desenvolvimento

Para executar o projeto em ambiente de desenvolvimento:

```bash
# Iniciar o servidor de desenvolvimento
pnpm dev
# ou
npm run dev
```

A aplicação estará disponível em: http://localhost:5173

### Build de Produção

Para gerar a build de produção:

```bash
pnpm build
# ou
npm run build
```

Para pré-visualizar a build de produção localmente:

```bash
pnpm preview
# ou
npm run preview
```

## 💻 Componentes

### Dashboard

- **Dashboard**: Componente principal que exibe os indicadores e gráficos.
- **StatCard**: Card para exibição de estatísticas individuais.
- **EnergyChart**: Gráfico para visualização de dados de consumo de energia.
- **FinancialChart**: Gráfico para visualização de dados financeiros.

### Faturas

- **InvoicesPage**: Página principal para listagem e gerenciamento de faturas.
- **UploadInvoiceDialog**: Componente de diálogo para upload de novas faturas.

### Layout

- **MainLayout**: Layout principal da aplicação com sidebar responsiva para navegação.

## 📚 Estrutura do Projeto

```
lumi-web/
├── public/             # Arquivos estáticos
├── src/                # Código fonte
│   ├── assets/         # Imagens e outros recursos
│   ├── components/     # Componentes React
│   │   ├── dashboard/  # Componentes do dashboard
│   │   ├── invoice/    # Componentes relacionados a faturas
│   │   ├── layout/     # Componentes de layout
│   │   └── ui/         # Componentes de UI reutilizáveis
│   ├── hooks/          # Hooks personalizados
│   ├── lib/            # Funções utilitárias
│   ├── pages/          # Páginas da aplicação
│   └── services/       # Serviços para comunicação com a API
├── .eslintrc.cjs      # Configuração do ESLint
├── index.html         # Arquivo HTML principal
├── package.json       # Dependências e scripts
├── tsconfig.json      # Configuração do TypeScript
└── vite.config.ts     # Configuração do Vite
```

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<p align="center">
  Desenvolvido com ❤️ para a Lumi
</p>