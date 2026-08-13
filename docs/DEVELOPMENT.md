# Documentação de Desenvolvimento - Palorni Windows Optimizer

Guia para desenvolvedores que desejam executar, modificar, testar e contribuir com o **Palorni Windows Optimizer**.

---

## 🛠️ Pré-requisitos para Desenvolvimento

Para rodar o ambiente de desenvolvimento, você precisará de:

- **Sistema Operacional**: Windows 10/11 (recomendado para testes de PowerShell/Registro) ou Linux/macOS (para desenvolvimento de UI).
- **Node.js**: Versão 18.0.0 ou superior (LTS recomendada).
- **npm**: Versão 9.0.0 ou superior.
- **Git**: Para clonar o repositório.

---

## 🚀 Configuração do Ambiente Local

### 1. Clonar o Repositório
```bash
git clone https://github.com/phbluzz/palorni-windows-optimizer.git
cd palorni-windows-optimizer
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Copie o arquivo de exemplo para criar seu arquivo local:
```bash
cp .env.example .env
```

> **Nota**: O arquivo `.env` está no `.gitignore` para prevenir o envio acidental de chaves privadas ou tokens para o repositório.

---

## 💻 Executando o Aplicativo em Modo de Desenvolvimento

O comando abaixo inicia o servidor local Express e o Vite em modo de desenvolvimento com Hot Reload da interface React:

```bash
npm run dev
```

Abra o navegador em `http://localhost:3000` para visualizar a interface do usuário.

---

## 🧪 Verificação de Código e Tipagem

Para verificar se não há erros de sintaxe ou inconsistências de tipos TypeScript:

```bash
npm run lint
```

---

## 📂 Arquitetura do Projeto

- `/electron/main.ts`: Processo Principal do Electron que gerencia janelas, atalhos nativos e comunicação IPC com o Windows.
- `/electron/preload.ts`: Bridge de contexto seguro (`contextBridge`) exposto à janela do React.
- `/server.ts`: Backend Express local rodando portas locais para integração com IA Gemini e leitura do sistema.
- `/src/App.tsx`: Ponto de entrada do React e gerenciador de estado global.
- `/src/context/ThemeContext.tsx`: Engine dinâmica de temas (Palorni, Windows 11, Material You, Liquid Glass, G HUB).
- `/src/components/`: Componentes da interface do usuário (Views de Hardware, Tweaks, Rede, Correções e Configurações).
- `/src/data/`: Catálogos de otimizações de Registro, Scripts PowerShell e lista de jogos detectáveis.
