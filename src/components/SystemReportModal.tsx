import React, { useState } from 'react';
import { X, FileText, Download, Copy, Check, ShieldCheck } from 'lucide-react';
import { HardwareSpecs, TweakItem } from '../types';

interface SystemReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  hardware: HardwareSpecs;
  allTweaks: TweakItem[];
}

export const SystemReportModal: React.FC<SystemReportModalProps> = ({
  isOpen,
  onClose,
  hardware,
  allTweaks
}) => {
  const [copied, setCopied] = useState(false);
  const [reportFormat, setReportFormat] = useState<'txt' | 'json'>('txt');

  if (!isOpen) return null;

  const appliedTweaks = allTweaks.filter(t => t.applied);

  const reportData = {
    app: 'Palorni System Optimizer V10 - System Hardware & Tweaks Audit Report',
    generatedAt: new Date().toISOString(),
    systemInfo: {
      os: hardware.os,
      osBuild: hardware.osBuild,
      architecture: hardware.architecture,
      cpu: hardware.cpu,
      cpuVendor: hardware.cpuVendor,
      cpuCores: hardware.cpuCores,
      gpu: hardware.gpu,
      gpuVendor: hardware.gpuVendor,
      vram: hardware.vram,
      ramTotalGB: `${hardware.ramTotalGB} GB DDR4/DDR5 @ ${hardware.ramSpeedMHz} MHz`,
      driveType: hardware.driveType,
      driveFreeSpaceGB: `${hardware.driveFreeSpaceGB} GB Livre`,
      motherboard: hardware.motherboard || 'ASUS TUF Gaming Z690-PLUS',
      biosVersion: hardware.biosVersion || 'American Megatrends Inc. v2802 (UEFI)',
      monitorResolution: hardware.monitorResolution || '1920x1080 @ 165Hz DisplayPort'
    },
    tweaksSummary: {
      totalTweaksCatalog: allTweaks.length,
      appliedTweaksCount: appliedTweaks.length,
      activeOptimizations: appliedTweaks.map(t => ({
        id: t.id,
        title: t.title,
        group: t.categoryGroup || 'general',
        selectedValue: t.selectedValue || 'Enabled'
      }))
    },
    securityNotice: 'Este relatório NÃO contém dados pessoais, cookies, tokens ou senhas.'
  };

  const formattedTxt = `===================================================================
PALORNI SYSTEM OPTIMIZER V10 - RELATÓRIO DE HARDWARE E AJUSTES
===================================================================
Data do Relatório: ${new Date().toLocaleString()}
Status da Licença: Palorni Engine V10 (100% Gratuito)

[ INFORMAÇÕES DO SISTEMA ]
-------------------------------------------------------------------
Sistema Operacional : ${reportData.systemInfo.os} (Build ${reportData.systemInfo.osBuild})
Arquitetura         : ${reportData.systemInfo.architecture}
Processador (CPU)   : ${reportData.systemInfo.cpu} (${reportData.systemInfo.cpuCores} Threads Lógicos)
Placa de Vídeo (GPU): ${reportData.systemInfo.gpu} (${reportData.systemInfo.vram})
Memória RAM         : ${reportData.systemInfo.ramTotalGB}
Unidade de Disco    : ${reportData.systemInfo.driveType} (${reportData.systemInfo.driveFreeSpaceGB})
Placa-Mãe           : ${reportData.systemInfo.motherboard}
Versão da BIOS      : ${reportData.systemInfo.biosVersion}
Monitor Principal   : ${reportData.systemInfo.monitorResolution}

[ STATUS DE OTIMIZAÇÕES ATIVAS ]
-------------------------------------------------------------------
Total de Ajustes no Catálogo : ${reportData.tweaksSummary.totalTweaksCatalog}
Ajustes Ativos no Windows    : ${reportData.tweaksSummary.appliedTweaksCount}

Lista de Otimizações Aplicadas:
${reportData.tweaksSummary.activeOptimizations.map((t, idx) => `  ${idx + 1}. [${t.group.toUpperCase()}] ${t.title} -> Estado: ${t.selectedValue}`).join('\n')}

===================================================================
AVISO DE SEGURANÇA: Este documento é gerado exclusivamente para
diagnóstico e não armazena senhas, cookies, chaves ou tokens.
===================================================================
`;

  const formattedJson = JSON.stringify(reportData, null, 2);

  const activeContent = reportFormat === 'txt' ? formattedTxt : formattedJson;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: reportFormat === 'txt' ? 'text/plain' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Palorni_System_Report_${Date.now()}.${reportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-5 max-w-2xl w-full space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-[#888] hover:text-white p-1 rounded bg-[#202020] hover:bg-[#2d2d2d] transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded bg-[#162736] border border-[#234d6e] text-[#4cc2ff]">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Exportar Relatório do Sistema (System Report)</h3>
            <span className="text-xs text-[#aaa]">Gere um diagnóstico detalhado em .txt ou .json sem informações privadas</span>
          </div>
        </div>

        {/* Format selector */}
        <div className="flex items-center justify-between bg-[#111] p-2 rounded border border-[#222]">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#888] font-mono">Formato do Arquivo:</span>
            <button
              onClick={() => setReportFormat('txt')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition ${
                reportFormat === 'txt' ? 'bg-[#1e3a4e] text-[#4cc2ff] border border-[#316a94]' : 'bg-[#222] text-[#888]'
              }`}
            >
              TEXTO (.TXT)
            </button>
            <button
              onClick={() => setReportFormat('json')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition ${
                reportFormat === 'json' ? 'bg-[#1e3a4e] text-[#4cc2ff] border border-[#316a94]' : 'bg-[#222] text-[#888]'
              }`}
            >
              JSON (.JSON)
            </button>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px] text-[#4fef8b] font-mono">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Sem tokens ou senhas</span>
          </div>
        </div>

        {/* Preview Code Box */}
        <div className="relative">
          <pre className="bg-[#0a0a0a] border border-[#222] p-3 rounded text-[11px] font-mono text-[#4cc2ff] max-h-72 overflow-y-auto leading-relaxed select-all">
            {activeContent}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="pt-1 flex items-center justify-end space-x-2">
          <button
            onClick={handleCopy}
            className="bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] hover:text-white font-semibold text-xs px-3.5 py-2 rounded transition flex items-center space-x-1.5 cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#4fef8b]" /> : <Copy className="h-3.5 w-3.5 text-[#aaa]" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] font-bold text-xs px-4 py-2 rounded transition flex items-center space-x-1.5 cursor-pointer active:scale-95 shadow-md"
          >
            <Download className="h-3.5 w-3.5 text-[#4cc2ff]" />
            <span>Baixar Arquivo ({reportFormat.toUpperCase()})</span>
          </button>
        </div>

      </div>
    </div>
  );
};
