export interface HardwareSpecs {
  cpu: string;
  cpuVendor: 'Intel' | 'AMD' | 'Outro';
  cpuCores: number;
  gpu: string;
  gpuVendor: 'NVIDIA' | 'AMD' | 'Intel' | 'Outro';
  vram: string;
  ramTotalGB: number;
  ramSpeedMHz: number;
  driveType: 'SSD NVMe' | 'SSD SATA' | 'HDD' | 'Híbrido';
  driveFreeSpaceGB: number;
  os: string;
  osBuild: string;
  architecture: string;
  motherboard?: string;
  biosVersion?: string;
  monitorResolution?: string;
}

export interface InstalledGame {
  id: string;
  name: string;
  executable: string;
  path: string;
  platform: 'Steam' | 'Epic Games' | 'Riot Games' | 'EA / Origin' | 'Ubisoft' | 'Outro';
  genre: string;
  recommendedQoS: number; // 46 is high priority
  recommendedTweaks: string[];
  iconName: string;
}

export interface TweakOption {
  label: string;
  value: string;
}

export interface TweakItem {
  id: string;
  categoryId: string;
  categoryGroup?: string; // Subcategory e.g. "Taskbar", "Start Menu", "File Explorer", etc.
  title: string;
  description: string;
  warning?: string;
  impactLevel: 'Baixo' | 'Médio' | 'Alto' | 'Extremo';
  applied: boolean;
  recommendedFor?: ('Gaming' | 'LowEnd' | 'HighEnd' | 'Streaming' | 'NVIDIA' | 'AMD' | 'Intel' | 'SSD' | 'HDD')[];
  commandPreview?: string;
  revertCommandPreview?: string;
  
  // Enriched Windows Tweaks properties
  supportedWinVersion?: string; // e.g. "Windows 11 22H2+", "Windows 10 / 11", "Windows 11"
  currentValue?: string;
  recommendedValue?: string;
  options?: TweakOption[];
  selectedValue?: string;
  favorite?: boolean;
  requiresWarningConfirm?: boolean;
}

export interface TweakCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  tweaks: TweakItem[];
}

export interface RestorePoint {
  id: string;
  name: string;
  timestamp: string;
  tweaksAppliedCount: number;
}

export interface SystemMetrics {
  cpuUsagePct: number;
  ramUsageGB: number;
  gpuUsagePct: number;
  diskUsagePct: number;
  pingMs: number;
  fpsBoostEstimatedPct: number;
}

export interface PresetProfile {
  id: string;
  name: string;
  badge: string;
  description: string;
  tweakValues: { tweakId: string; value: string; applied: boolean }[];
}

export interface CleanupItem {
  id: string;
  title: string;
  category: string;
  description: string;
  estimatedSizeBytes: number;
  command: string;
  requiresConfirm?: boolean;
  lastCleaned?: string;
}

declare global {
  interface Window {
    palorni?: {
      isElectron: boolean;
      executePowerShell: (command: string, requireAdmin?: boolean) => Promise<{ success: boolean; output?: string; error?: string }>;
      createRestorePoint: (name: string) => Promise<{ success: boolean; message?: string; error?: string }>;
      getHardwareSpecs: () => Promise<any>;
      isAdmin: () => Promise<boolean>;
      controlWindow: (action: 'minimize' | 'maximize' | 'close') => void;
    };
  }
}

