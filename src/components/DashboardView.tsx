import React from 'react';
import { Cpu, HardDrive, Activity, Zap, Server, BarChart3, Clock, CheckCircle2 } from 'lucide-react';
import { HardwareSpecs, SystemMetrics } from '../types';

interface DashboardViewProps {
  hardware: HardwareSpecs;
  metrics: SystemMetrics;
  appliedTweaksCount: number;
  totalTweaksCount: number;
  onNavigateTab: (tab: string) => void;
  onQuickCleanRAM: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  hardware,
  metrics,
  appliedTweaksCount,
  totalTweaksCount,
  onNavigateTab,
  onQuickCleanRAM
}) => {
  return (
    <div className="space-y-4">
      {/* System Resource Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* CPU Monitor */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3.5 relative overflow-hidden group hover:border-[#3d3d3d] transition">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
              <Cpu className="h-3.5 w-3.5 text-[#4cc2ff]" />
              <span>Processador (CPU)</span>
            </span>
            <span className="text-[11px] font-mono font-bold text-[#4cc2ff] bg-[#142633] px-1.5 py-0.5 rounded border border-[#224863]">
              {metrics.cpuUsagePct}%
            </span>
          </div>
          <div className="text-xs font-semibold text-white truncate" title={hardware.cpu}>
            {hardware.cpu}
          </div>
          <div className="text-[10px] text-[#777] mt-0.5">
            {hardware.cpuCores} Cores • Core Parking Off
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#222] rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-[#4cc2ff] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${metrics.cpuUsagePct}%` }}
            />
          </div>
        </div>

        {/* Memory RAM Monitor */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3.5 relative overflow-hidden group hover:border-[#3d3d3d] transition">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
              <Activity className="h-3.5 w-3.5 text-[#a78bfa]" />
              <span>Memória RAM</span>
            </span>
            <button
              onClick={onQuickCleanRAM}
              className="text-[9px] font-bold text-[#c4b5fd] hover:text-white bg-[#2e1065] hover:bg-[#3b0764] px-1.5 py-0.5 rounded border border-[#581c87] transition cursor-pointer"
            >
              Liberar RAM 🧹
            </button>
          </div>
          <div className="text-xs font-semibold text-white">
            {metrics.ramUsageGB} GB de {hardware.ramTotalGB} GB Usados
          </div>
          <div className="text-[10px] text-[#777] mt-0.5">
            Velocidade {hardware.ramSpeedMHz} MHz • Dual Channel
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#222] rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-[#a78bfa] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(metrics.ramUsageGB / hardware.ramTotalGB) * 100}%` }}
            />
          </div>
        </div>

        {/* GPU Monitor */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3.5 relative overflow-hidden group hover:border-[#3d3d3d] transition">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
              <Server className="h-3.5 w-3.5 text-[#4fef8b]" />
              <span>Placa de Vídeo (GPU)</span>
            </span>
            <span className="text-[11px] font-mono font-bold text-[#4fef8b] bg-[#102d1a] px-1.5 py-0.5 rounded border border-[#1f5c32]">
              {metrics.gpuUsagePct}%
            </span>
          </div>
          <div className="text-xs font-semibold text-white truncate" title={hardware.gpu}>
            {hardware.gpu}
          </div>
          <div className="text-[10px] text-[#777] mt-0.5">
            VRAM: {hardware.vram}
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#222] rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-[#4fef8b] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${metrics.gpuUsagePct}%` }}
            />
          </div>
        </div>

        {/* Storage / Latency Monitor */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3.5 relative overflow-hidden group hover:border-[#3d3d3d] transition">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
              <HardDrive className="h-3.5 w-3.5 text-[#fbbf24]" />
              <span>Armazenamento & Ping</span>
            </span>
            <span className="text-[11px] font-mono font-bold text-[#fbbf24] bg-[#2d2208] px-1.5 py-0.5 rounded border border-[#5e4710]">
              {metrics.pingMs} ms
            </span>
          </div>
          <div className="text-xs font-semibold text-white">
            {hardware.driveType} ({hardware.driveFreeSpaceGB} GB Livres)
          </div>
          <div className="text-[10px] text-[#777] mt-0.5">
            Nagle Off • Palorni High-Priority DNS
          </div>
          <div className="w-full bg-[#222] rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-[#fbbf24] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${metrics.diskUsagePct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Feature Highlight & System Banner */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 relative overflow-hidden shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 bg-[#172733] border border-[#244f6f] text-[#4cc2ff] text-[11px] font-semibold px-2.5 py-0.5 rounded">
              <Zap className="h-3 w-3 text-[#4cc2ff] fill-[#4cc2ff]" />
              <span>Palorni Engine V10 • 100% Gratuito sem Assinaturas ou Limitações</span>
            </div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Desempenho Máximo e Latência Ultrabaixa para Jogos
            </h2>
            <p className="text-xs text-[#aaa] leading-relaxed">
              Ajustes avançados de registro, otimização de GPU NVIDIA/AMD, plano de energia Palorni V10, prioridade QoS e leitura de hardware com IA estão desbloqueados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={() => onNavigateTab('hardware')}
              className="bg-[#222] hover:bg-[#2e2e2e] text-white font-medium text-xs px-3.5 py-2 rounded border border-[#3d3d3d] transition flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <Cpu className="h-3.5 w-3.5 text-[#4cc2ff]" />
              <span>Diagnóstico HW</span>
            </button>
            <button
              onClick={() => onNavigateTab('games')}
              className="bg-[#1c3a4f] hover:bg-[#254b66] text-[#4cc2ff] font-semibold text-xs px-4 py-2 rounded border border-[#31698e] transition flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Otimizar Jogos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Card 1: Hardware Scan */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#3d3d3d] transition space-y-2">
          <div className="h-8 w-8 rounded bg-[#13222e] border border-[#214963] flex items-center justify-center text-[#4cc2ff]">
            <Cpu className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-white">1. Leitura de Hardware Inteligente</h3>
          <p className="text-xs text-[#888] leading-relaxed">
            Identifique gargalos na CPU, GPU e memória e receba recomendações exclusivas baseadas na arquitetura do seu PC.
          </p>
          <button
            onClick={() => onNavigateTab('hardware')}
            className="text-xs font-semibold text-[#4cc2ff] hover:underline flex items-center space-x-1 cursor-pointer pt-1"
          >
            <span>Analisar meu hardware &rarr;</span>
          </button>
        </div>

        {/* Card 2: Games Detector */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#3d3d3d] transition space-y-2">
          <div className="h-8 w-8 rounded bg-[#201538] border border-[#482882] flex items-center justify-center text-[#c4b5fd]">
            <BarChart3 className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-white">2. Detecção de Jogos Instalados</h3>
          <p className="text-xs text-[#888] leading-relaxed">
            Localização automática de títulos (Fortnite, Valorant, CS2, FiveM) com regras de QoS personalizadas para ping mínimo.
          </p>
          <button
            onClick={() => onNavigateTab('games')}
            className="text-xs font-semibold text-[#c4b5fd] hover:underline flex items-center space-x-1 cursor-pointer pt-1"
          >
            <span>Ver jogos e ajustar QoS &rarr;</span>
          </button>
        </div>

        {/* Card 3: Central Tweaks */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#3d3d3d] transition space-y-2">
          <div className="h-8 w-8 rounded bg-[#102d1a] border border-[#1f5c32] flex items-center justify-center text-[#4fef8b]">
            <Zap className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-white">3. Central Completa de Otimizações</h3>
          <p className="text-xs text-[#888] leading-relaxed">
            Mais de 30 ajustes divididos em categorias com pré-visualização de comandos de registro e scripts PowerShell.
          </p>
          <button
            onClick={() => onNavigateTab('tweaks')}
            className="text-xs font-semibold text-[#4fef8b] hover:underline flex items-center space-x-1 cursor-pointer pt-1"
          >
            <span>Explorar catálogo de ajustes &rarr;</span>
          </button>
        </div>

      </div>

      {/* System Status Footnote */}
      <div className="bg-[#141414] border border-[#242424] rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888] gap-2">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#4fef8b]" />
          <span>Serviço de otimização Palorni ativo com privilégios administrativos.</span>
        </div>
        <div className="flex items-center space-x-3 font-mono text-[11px]">
          <span className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-[#666]" />
            <span>Verificado agora</span>
          </span>
          <span className="text-[#333]">|</span>
          <span className="text-[#4cc2ff] font-semibold">Palorni Utilities V10</span>
        </div>
      </div>
    </div>
  );
};
