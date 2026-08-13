import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec, execFile } from 'child_process';
import util from 'util';
import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

const execPromise = util.promisify(exec);

let mainWindow: BrowserWindow | null = null;
const isDev = !app.isPackaged && process.env.NODE_ENV !== 'production';
const PORT = 3000;

// Embedded local Express Backend Server
function startInternalExpressServer() {
  dotenv.config();
  const serverApp = express();
  serverApp.use(express.json());

  // API Route: AI Optimizer with Gemini
  serverApp.post('/api/ai-optimize', async (req, res) => {
    try {
      const { specs, installedGames } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(200).json({
          success: true,
          aiGenerated: false,
          summary: 'Análise realizada com o motor nativo Palorni. Adicione a chave GEMINI_API_KEY para relatórios avançados por inteligência artificial.',
          recommendations: [
            'Defina Win32PrioritySeparation para 38 (Prioridade de Primeiro Plano)',
            'Desative o Core Parking e C-States para desempenho constante em jogos',
            'Ajuste SvcHostSplitThreshold com base no total de RAM detectado',
            'Desative a aceleração de ponteiro do mouse para precisão 1:1'
          ]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Você é o especialista de otimização do Palorni Windows Optimizer.
Analise a seguinte configuração de hardware e jogos do usuário:

Hardware:
- CPU: ${specs?.cpu || 'Não detectado'}
- GPU: ${specs?.gpu || 'Não detectado'}
- RAM: ${specs?.ram || '16GB'}
- Disco: ${specs?.driveType || 'SSD NVMe'}
- Sistema: ${specs?.os || 'Windows 11'}

Jogos Instalados:
${installedGames && installedGames.length > 0 ? installedGames.map((g: any) => `- ${g.name} (${g.genre})`).join('\n') : 'Nenhum jogo selecionado'}

Forneça um relatório em Português (do Brasil) formatado com marcações claras:
1. **Diagnóstico do Sistema**: Breve resumo do equilíbrio do hardware.
2. **3 Otimizações Críticas Recomendadas**: Ajustes de registro/energia/rede mais impactantes.
3. **Dicas Específicas para os Jogos Detectados**: Configurações recomendadas.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      res.json({
        success: true,
        aiGenerated: true,
        analysis: response.text || 'Relatório gerado com sucesso.'
      });
    } catch (error: any) {
      console.error('Erro na API Gemini:', error);
      res.status(500).json({
        success: false,
        error: 'Falha ao gerar recomendações por IA. Utilizando recomendador nativo Palorni.'
      });
    }
  });

  // Serve static UI when packaged
  const distPath = path.join(__dirname, '../dist');
  serverApp.use(express.static(distPath));
  serverApp.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  serverApp.listen(PORT, '127.0.0.1', () => {
    console.log(`Palorni Internal Backend active on http://127.0.0.1:${PORT}`);
  });
}

function createWindow() {
  const iconPath = path.join(__dirname, '../assets/icon.png');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 700,
    title: 'Palorni Windows Optimizer',
    icon: iconPath,
    autoHideMenuBar: true,
    frame: true,
    backgroundColor: '#0a0d14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(`http://127.0.0.1:${PORT}`);
  }

  // Handle external links safely in system default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// System IPC Handlers for Native Windows Capabilities
ipcMain.handle('system:is-admin', async () => {
  if (process.platform !== 'win32') return false;
  try {
    const cmd = `[Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)`;
    const { stdout } = await execPromise(`powershell -NoProfile -Command "${cmd}"`);
    return stdout.trim().toLowerCase() === 'true';
  } catch {
    return false;
  }
});

ipcMain.handle('powershell:execute', async (_, { command, requireAdmin }: { command: string; requireAdmin?: boolean }) => {
  if (process.platform !== 'win32') {
    return { success: false, output: 'Execução de PowerShell disponível apenas no Windows.', simulated: true };
  }

  try {
    if (requireAdmin) {
      // Escalate via UAC only when needed
      const encodedScript = Buffer.from(command, 'utf16le').toString('base64');
      const psCommand = `Start-Process powershell -Verb RunAs -ArgumentList '-NoProfile -ExecutionPolicy Bypass -EncodedCommand ${encodedScript}' -Wait`;
      await execPromise(`powershell -NoProfile -Command "${psCommand}"`);
      return { success: true, output: 'Comando executado com privilégios administrativos.', elevated: true };
    } else {
      const { stdout, stderr } = await execPromise(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${command}"`);
      return { success: true, output: stdout || stderr };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro na execução do PowerShell' };
  }
});

ipcMain.handle('system:create-restore-point', async (_, { name }: { name: string }) => {
  if (process.platform !== 'win32') {
    return { success: false, error: 'Pontos de Restauração nativos requerem Windows.' };
  }

  const script = `Checkpoint-Computer -Description "${name || 'Palorni Optimizer Restore Point'}" -RestorePointType "MODIFY_SETTINGS"`;
  const encodedScript = Buffer.from(script, 'utf16le').toString('base64');
  const psCommand = `Start-Process powershell -Verb RunAs -ArgumentList '-NoProfile -ExecutionPolicy Bypass -EncodedCommand ${encodedScript}' -Wait`;

  try {
    await execPromise(`powershell -NoProfile -Command "${psCommand}"`);
    return { success: true, message: `Ponto de restauração "${name}" criado com sucesso no Windows!` };
  } catch (error: any) {
    return { success: false, error: 'Não foi possível criar o Ponto de Restauração (solicitação de UAC recusada ou recurso desativado no Windows).' };
  }
});

ipcMain.handle('system:get-hardware', async () => {
  if (process.platform !== 'win32') {
    return null; // Frontend falls back to native detection mock
  }

  try {
    const script = `
      $cpu = (Get-CimInstance Win32_Processor).Name
      $gpu = (Get-CimInstance Win32_VideoController | Select-Object -First 1).Name
      $ram = [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 1)
      $os = (Get-CimInstance Win32_OperatingSystem).Caption
      @{ CPU = $cpu; GPU = $gpu; RAM = $ram; OS = $os } | ConvertTo-Json
    `;
    const { stdout } = await execPromise(`powershell -NoProfile -Command "${script.replace(/\n/g, ' ')}"`);
    return JSON.parse(stdout);
  } catch {
    return null;
  }
});

ipcMain.handle('window:control', (_, action: 'minimize' | 'maximize' | 'close') => {
  if (!mainWindow) return;
  if (action === 'minimize') mainWindow.minimize();
  if (action === 'maximize') {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  }
  if (action === 'close') mainWindow.close();
});

app.whenReady().then(() => {
  startInternalExpressServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
