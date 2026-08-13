# Palorni Windows Optimizer

[![Licença](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build & Release](https://github.com/phbluzz/palorni-windows-optimizer/actions/workflows/build-release.yml/badge.svg)](.github/workflows/build-release.yml)
[![Versão](https://img.shields.io/badge/version-1.0.0-cyan.svg)](package.json)

O **Palorni Windows Optimizer** é um aplicativo Windows nativo completo desenvolvido para gerenciamento de recursos do sistema, otimização de registros do Windows, redução de latência de rede e ajuste fino de desempenho para jogos e tarefas pesadas.

---

## ⚡ Principais Funcionalidades

- **Detecção de Hardware**: Leitura detalhada de CPU, RAM, GPU, Placa-Mãe e armazenamento via comandos do sistema.
- **Windows Tweaks Catalog**: Otimizações do Registro do Windows (`HKLM`/`HKCU`), remoção de telemetria e gerenciamento de serviços.
- **Otimização de Jogos**: Detecção automática de jogos instalados (Steam, Epic, Riot, Ubisoft) e aplicação de QoS/DSCP priorizado.
- **Limpeza de Disco e RAM**: Liberação de memória RAM standby em tempo real e limpeza de arquivos temporários do sistema.
- **Ponto de Restauração Integrado**: Criação e restauração de pontos do sistema do Windows antes de aplicar qualquer alteração.
- **Engine Dinâmica de Temas**: 5 temas nativos (Palorni Original, Windows 11 Fluent, Material You, Liquid Glass e G HUB Gaming) com modo claro/escuro e seletor de cores personalizadas.
- **Suporte a PowerShell e Registro**: Aplicação segura e reversível de modificações do sistema.

---

## 📦 Download e Instalação

Acesse a aba [**Releases**](https://github.com/phbluzz/palorni-windows-optimizer/releases) para baixar as versões finais compiladas:

1. **Instalador Oficial (`Palorni-Windows-Optimizer-Setup.exe`)**: Instala o aplicativo no Windows, cria atalhos no Desktop e Menu Iniciar e adiciona o desinstalador oficial.
2. **Versão Portátil (`Palorni-Windows-Optimizer-Portable.zip`)**: Funciona diretamente sem instalação, podendo ser executado de pendrives ou qualquer pasta.

Para mais detalhes sobre a instalação, consulte a [Documentação de Instalação](docs/INSTALLATION.md).

---

## 🛠️ Comandos de Desenvolvimento e Build

O aplicativo utiliza **Node.js + Electron + Express + React + Vite + TypeScript**.

### Scripts Principais (`package.json`):

```bash
# Iniciar o servidor local em modo de desenvolvimento
npm run dev

# Compilar o código TypeScript e assets web
npm run build

# Gerar o instalador Windows (.exe)
npm run package

# Gerar a versão portátil (.zip)
npm run package:portable

# Gerar ambas as edições (.exe e .zip)
npm run package:all
```

Para instruções detalhadas de desenvolvimento e contribuição, consulte a [Documentação de Desenvolvimento](docs/DEVELOPMENT.md) e a [Documentação de Compilação](docs/BUILD.md).

---

## 🤖 Automação no GitHub Releases

O repositório inclui o workflow automatizado [`.github/workflows/build-release.yml`](.github/workflows/build-release.yml). Ao criar e enviar uma nova tag Git (ex: `v1.0.0`), a esteira de CI/CD em ambiente Windows irá compilar o projeto e anexar automaticamente os binários na Release:
- `Palorni-Windows-Optimizer-Setup.exe`
- `Palorni-Windows-Optimizer-Portable.zip`

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [MIT](LICENSE).
