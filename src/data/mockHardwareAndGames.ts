import { HardwareSpecs, InstalledGame } from '../types';

export const detectSystemHardware = (): HardwareSpecs => {
  // Detect real environment info when possible
  const nav = typeof window !== 'undefined' ? window.navigator : ({} as any);
  const userAgent = nav.userAgent || '';
  const logicalCores = nav.hardwareConcurrency || 8;
  const memoryGB = (nav as any).deviceMemory || 16;

  let osName = 'Windows 11 Pro 23H2';
  if (userAgent.includes('Windows NT 10.0')) {
    osName = 'Windows 10 / 11 64-bit';
  }

  return {
    cpu: logicalCores >= 16 ? 'AMD Ryzen 7 7800X3D 8-Core Processor' : logicalCores >= 12 ? 'Intel Core i7-13700K 16 Cores' : 'Intel Core i5-12400F 6 Cores',
    cpuVendor: logicalCores >= 16 ? 'AMD' : 'Intel',
    cpuCores: logicalCores,
    gpu: logicalCores >= 16 ? 'NVIDIA GeForce RTX 4070 Ti SUPER' : 'NVIDIA GeForce RTX 3060 12GB',
    gpuVendor: 'NVIDIA',
    vram: logicalCores >= 16 ? '16 GB GDDR6X' : '12 GB GDDR6',
    ramTotalGB: memoryGB >= 16 ? memoryGB : 16,
    ramSpeedMHz: 3600,
    driveType: 'SSD NVMe',
    driveFreeSpaceGB: 412,
    os: osName,
    osBuild: '22631.3880',
    architecture: 'x64'
  };
};

export const INITIAL_INSTALLED_GAMES: InstalledGame[] = [
  {
    id: 'fortnite',
    name: 'Fortnite',
    executable: 'FortniteClient-Win64-Shipping.exe',
    path: 'C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Binaries\\Win64',
    platform: 'Epic Games',
    genre: 'Battle Royale / Competitivo',
    recommendedQoS: 46,
    recommendedTweaks: [
      'Prioridade QoS 46 de Rede Palorni',
      'Desativar GameDVR e Habilitar FSO',
      'Desativar MLD/ICMP para menor latência (Aviso: Reverter se jogar FiveM)',
      'Ajuste de Win32PrioritySeparation = 38'
    ],
    iconName: 'Crosshair'
  },
  {
    id: 'valorant',
    name: 'VALORANT',
    executable: 'VALORANT-Win64-Shipping.exe',
    path: 'C:\\Riot Games\\VALORANT\\live\\ShooterGame\\Binaries\\Win64',
    platform: 'Riot Games',
    genre: 'FPS Tático',
    recommendedQoS: 46,
    recommendedTweaks: [
      'Prioridade Alta de CPU em CSRSS e Processo do Jogo',
      'Temporizador de Sistema de Alta Precisão (0.5ms HPET Off)',
      'Palorni Mouse 1:1 Pixel Accuracy (Desativar Aceleração)',
      'Desativar Throttling de Rede (NetworkThrottlingIndex = 0xFFFFFFFF)'
    ],
    iconName: 'Target'
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    executable: 'cs2.exe',
    path: 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64',
    platform: 'Steam',
    genre: 'FPS Competitivo',
    recommendedQoS: 46,
    recommendedTweaks: [
      'TCPNoDelay = 1 & TcpAckFrequency = 1',
      'SvcHostSplitThreshold ajustado para memória total',
      'Plano de Energia Palorni V8 (Sem Park de Cores)',
      'Filtro de Anisotropia e Cache de Shaders no Máximo'
    ],
    iconName: 'Zap'
  },
  {
    id: 'fivem',
    name: 'FiveM / GTA V',
    executable: 'FiveM.exe',
    path: 'C:\\Users\\User\\AppData\\Local\\FiveM',
    platform: 'Outro',
    genre: 'Roleplay / Mundo Aberto',
    recommendedQoS: 46,
    recommendedTweaks: [
      'Reverter MLD/ICMP Tweak (Essencial para conexões FiveM)',
      'Limpeza de Cache Temporário do Windows & DirectX',
      'Aumentar Tamanho da Fila de Dados do Mouse (MouseDataQueueSize = 80)',
      'Desativar Mapeamento DMA para estabilidade de memória'
    ],
    iconName: 'Car'
  },
  {
    id: 'cod_warzone',
    name: 'Call of Duty: Warzone',
    executable: 'cod.exe',
    path: 'C:\\Program Files (x86)\\Call of Duty',
    platform: 'Steam',
    genre: 'Battle Royale FPS',
    recommendedQoS: 46,
    recommendedTweaks: [
      'Alocação Contígua de Memória VRAM NVIDIA',
      'Desativar Suspensão Seletiva USB',
      'PageCombining Desativado & LargeSystemCache Off',
      'Plano de Energia Palorni V8 Alto Desempenho'
    ],
    iconName: 'Flame'
  },
  {
    id: 'league_of_legends',
    name: 'League of Legends',
    executable: 'League of Legends.exe',
    path: 'C:\\Riot Games\\League of Legends',
    platform: 'Riot Games',
    genre: 'MOBA',
    recommendedQoS: 46,
    recommendedTweaks: [
      'Desativar Aplicativos em Segundo Plano do Windows',
      'Prioridade de Rede Palorni QoS',
      'Reduzir Atraso de Repetição de Teclado (KeyboardDelay = 0)'
    ],
    iconName: 'Shield'
  }
];
