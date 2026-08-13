# Documentação de Compilação e Empacotamento (Build)

Este documento detalha o processo de compilação dos binários finais do **Palorni Windows Optimizer**: o instalador `.exe` e a versão portátil `.zip`.

---

## 🛠️ Comandos de Build Locais

Todas as tarefas de empacotamento são gerenciadas pelo `electron-builder` e configuradas no `package.json`.

### 1. Compilar os Arquivos Web e Backend
Gera a distribuição otimizada em `dist/` e `dist-electron/`:
```bash
npm run build
```

### 2. Gerar Instalador `.exe` (`Palorni-Windows-Optimizer-Setup.exe`)
Compila a aplicação e gera o instalador NSIS completo na pasta `release/`:
```bash
npm run package
```

### 3. Gerar Versão Portátil `.zip` (`Palorni-Windows-Optimizer-Portable.zip`)
Gera o pacote `.zip` portátil standalone na pasta `release/`:
```bash
npm run package:portable
```

### 4. Gerar Ambos os Pacotes Simultaneamente
```bash
npm run package:all
```

---

## 🤖 Automação via GitHub Releases (CI/CD)

O repositório está configurado com o GitHub Actions através do arquivo `.github/workflows/build-release.yml`.

### Como Disparar uma Nova Release Oficial:

1. Garanta que todas as alterações foram consolidadas:
   ```bash
   git add .
   git commit -m "Preparando release v1.0.0"
   ```

2. Crie uma tag Git com o prefixo `v` e envie para o GitHub:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. O GitHub Actions iniciará automaticamente o pipeline em um runner Windows, executando os seguintes passos:
   - Checkout do código fonte.
   - Instalação das dependências com `npm ci`.
   - Execução do build e empacotamento com `electron-builder`.
   - Criação automática da Release no GitHub anexando os binários:
     - `release/Palorni-Windows-Optimizer-Setup.exe`
     - `release/Palorni-Windows-Optimizer-Portable.zip`
