import React, { useState } from 'react';
import { Cpu, HardDrive, Server, Activity, CheckCircle, RefreshCw, Sparkles, AlertTriangle } from 'lucide-react';
import { HardwareSpecs, InstalledGame } from '../types';

interface HardwareViewProps {
  hardware: HardwareSpecs;
  installedGames: InstalledGame[];
  onApplyRecommendedTweaks: (tweaks: string[]) => void;
}

export const HardwareView: React.FC<HardwareViewProps> = ({
  hardware,
  installedGames,
  onApplyRecommendedTweaks
}) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const handleGenerateAiRecommendation = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/ai-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specs: hardware,
          installedGames
        })
      });
      const data = await response.json();
      if (data.success) {
        if (data.aiGenerated) {
          setAiReport(data.analysis);
        } else {
          setAiReport(
            `### Diagnóstico da Plataforma Palorni\n\n- **CPU**: ${hardware.cpu} (${hardware.cpuCores} Cores) - Excelente para tarefas paralelas e alta taxa de atualização.\n- **GPU**: ${hardware.gpu} - Recomendado manter o driver atualizado e alocação contígua ativa.\n- **RAM**: ${hardware.ramTotalGB}GB DDR4/DDR5 - SvcHostSplitThreshold ajustado idealmente.\n- **Disco**: ${hardware.driveType} com ${hardware.driveFreeSpaceGB}GB livres.\n\n#### Recomendações Críticas:\n1. Aplique o Plano de Energia Palorni V10 para desativar Core Parking.\n2. Mantenha TCPNoDelay e TcpAckFrequency ativos para menor latência em jogos online.\n3. Configure o ajuste Win32PrioritySeparation = 38 no Registro.`
          );
        }
      }
    } catch (err) {
      console.error(err);
      setAiReport('Ocorreu um erro ao consultar a inteligência da Palorni. Tente novamente.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-[#162736] text-[#4cc2ff] border border-[#234d6e] text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
              SENSOR HW
            </span>
            <span className="text-xs text-[#888]">Palorni Hardware Engine V10</span>
          </div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">
            Leitura Detalhada do Hardware & Diagnóstico
          </h2>
          <p className="text-xs text-[#aaa] max-w-2xl leading-relaxed">
            Analisa as especificações em tempo real e calcula os melhores valores para o Registro e Gerenciador de Processos do Windows.
          </p>
        </div>

        <button
          onClick={handleGenerateAiRecommendation}
          disabled={loadingAi}
          className="bg-[#201736] hover:bg-[#2e204d] text-[#c4b5fd] border border-[#482b80] font-bold text-xs px-4 py-2.5 rounded transition shadow-sm flex items-center space-x-2 cursor-pointer active:scale-95 disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          {loadingAi ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-white" />
              <span>Analisando Hardware...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-[#fbbf24]" />
              <span>Gerar Relatório & Recomendações</span>
            </>
          )}
        </button>
      </div>

      {/* Hardware Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        
        {/* CPU Specs */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#13222e] border border-[#214963] text-[#4cc2ff]">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#888] uppercase font-mono font-bold">Processador</span>
              <h3 className="text-sm font-bold text-white">{hardware.cpuVendor}</h3>
            </div>
          </div>
          <div className="space-y-1.5 text-xs border-t border-[#222] pt-2.5">
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">Modelo Exato:</span>
              <span className="font-semibold text-[#ddd]">{hardware.cpu}</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">Núcleos Lógicos:</span>
              <span className="font-semibold text-[#4cc2ff]">{hardware.cpuCores} Threads</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">Estado de Park:</span>
              <span className="font-semibold text-[#4fef8b]">Desativado (Palorni V10)</span>
            </div>
          </div>
        </div>

        {/* GPU Specs */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#102d1a] border border-[#1f5c32] text-[#4fef8b]">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#888] uppercase font-mono font-bold">Placa Gráfica</span>
              <h3 className="text-sm font-bold text-white">{hardware.gpuVendor}</h3>
            </div>
          </div>
          <div className="space-y-1.5 text-xs border-t border-[#222] pt-2.5">
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">Modelo Exato:</span>
              <span className="font-semibold text-[#ddd]">{hardware.gpu}</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">VRAM Disponível:</span>
              <span className="font-semibold text-[#4fef8b]">{hardware.vram}</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">Alocação de Memória:</span>
              <span className="font-semibold text-[#ddd]">Contígua Otimizada</span>
            </div>
          </div>
        </div>

        {/* RAM & System Specs */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#201538] border border-[#482882] text-[#c4b5fd]">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#888] uppercase font-mono font-bold">Memória & Sistema</span>
              <h3 className="text-sm font-bold text-white">{hardware.ramTotalGB} GB RAM</h3>
            </div>
          </div>
          <div className="space-y-1.5 text-xs border-t border-[#222] pt-2.5">
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">Velocidade RAM:</span>
              <span className="font-semibold text-[#ddd]">{hardware.ramSpeedMHz} MHz</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">Sistema Operacional:</span>
              <span className="font-semibold text-[#ddd]">{hardware.os}</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-[#222]">
              <span className="text-[#888]">Armazenamento:</span>
              <span className="font-semibold text-[#fbbf24]">{hardware.driveType} ({hardware.driveFreeSpaceGB}GB livre)</span>
            </div>
          </div>
        </div>

      </div>

      {/* AI / Automated Report Section */}
      {aiReport && (
        <div className="bg-[#161616] border border-[#482b80] rounded-lg p-4 space-y-3 shadow-lg">
          <div className="flex items-center space-x-2 text-[#c4b5fd]">
            <Sparkles className="h-4 w-4" />
            <h3 className="text-sm font-bold text-white">Relatório Personalizado Palorni Engine</h3>
          </div>
          <div className="prose prose-invert max-w-none text-xs text-[#ccc] leading-relaxed whitespace-pre-wrap bg-[#101010] p-3 rounded border border-[#262626] font-mono">
            {aiReport}
          </div>
          <div className="flex justify-end pt-1">
            <button
              onClick={() => onApplyRecommendedTweaks(['win32_priority', 'palorni_power_plan_v10', 'net_tcp_nodelay_ack'])}
              className="bg-[#2e1852] hover:bg-[#3d216d] text-[#c4b5fd] border border-[#582d99] font-bold text-xs px-3.5 py-2 rounded transition flex items-center space-x-2 cursor-pointer"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Aplicar Ajustes Recomendados no Relatório</span>
            </button>
          </div>
        </div>
      )}

      {/* Recommended Tweaks for this Specific HW */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-[#4fef8b]" />
          <span>Otimizações Ideais para esta Configuração</span>
        </h3>
        <p className="text-xs text-[#888]">
          Com base na detecção da sua {hardware.gpuVendor} e CPU {hardware.cpuVendor}, selecione os ajustes recomendados:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#111] border border-[#222] rounded p-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4cc2ff]">Ajuste de Registro SvcHost</span>
              <span className="text-[10px] bg-[#1a1a1a] px-1.5 py-0.5 rounded text-[#aaa] font-mono">RAM {hardware.ramTotalGB}GB</span>
            </div>
            <p className="text-xs text-[#aaa]">
              Valor automático de <code className="text-[#fbbf24]">SvcHostSplitThresholdInKB = {hardware.ramTotalGB * 1024 * 1024}</code>. Impede que o Windows fragmente serviços em múltiplos processos.
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] rounded p-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4fef8b]">Plano de Energia CPU {hardware.cpuVendor}</span>
              <span className="text-[10px] bg-[#1a1a1a] px-1.5 py-0.5 rounded text-[#aaa] font-mono">{hardware.cpuCores} Cores</span>
            </div>
            <p className="text-xs text-[#aaa]">
              Desativa Core Parking e garante C-States em 100% de frequência constante durante partidas competitivas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
