# Documentação de Instalação - Palorni Windows Optimizer

O **Palorni Windows Optimizer** foi desenvolvido como um aplicativo Windows nativo local. O usuário final **não precisa instalar Node.js, npm, Python ou configurar dependências manualmente**.

---

## 💻 Opções de Instalação para o Usuário Final

### 1. Instalador Executável (`Palorni-Windows-Optimizer-Setup.exe`)

Esta é a opção recomendada para a maioria dos usuários Windows.

#### Passos para Instalação:
1. Baixe o arquivo `Palorni-Windows-Optimizer-Setup.exe` na aba **Releases** do repositório GitHub.
2. Dê um duplo clique no instalador para executá-lo.
3. Escolha o diretório de instalação desejado (o padrão é `C:\Program Files\Palorni Windows Optimizer`).
4. O instalador irá:
   - Copiar todos os binários da aplicação, a runtime do Chromium e o Node.js embarcado.
   - Criar um atalho na **Área de Trabalho (Desktop)**.
   - Criar um atalho no **Menu Iniciar** do Windows.
   - Registrar o desinstalador oficial no Windows (*Adicionar ou Remover Programas*).
5. Ao concluir, abra o aplicativo pelo atalho criado.

---

### 2. Versão Portátil (`Palorni-Windows-Optimizer-Portable.zip`)

Esta opção é ideal para executar o Palorni diretamente de um pendrive ou pasta sem necessidade de instalação no sistema.

#### Passos para Uso Portátil:
1. Baixe o arquivo `Palorni-Windows-Optimizer-Portable.zip` na aba **Releases** do repositório GitHub.
2. Extraia o conteúdo do arquivo `.zip` para qualquer pasta local ou dispositivo removível.
3. Dê um duplo clique no executável `Palorni Windows Optimizer.exe`.
4. O aplicativo será executado imediatamente, salvando suas configurações no próprio diretório de execução ou perfil de usuário.

---

## 🛡️ Permissões e Segurança do Windows (UAC)

- O Palorni solicita privilégios de **Administrador (UAC)** por demanda apenas quando você aciona funções do sistema que exigem alteração de privilégios elevados, tais como:
  - Modificação de chaves do **Registro do Windows (`HKLM\SYSTEM`, `HKLM\SOFTWARE`)**.
  - Execução de scripts **PowerShell restritos** (Ajuste de serviços, Paging File, Telemetria).
  - Criação de **Pontos de Restauração do Windows**.
  - Configurações de **QoS/DSCP** no adaptador de rede.
- O aplicativo **nunca envia dados sensíveis** do seu computador para servidores externos.
