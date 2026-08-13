import React, { useState, useMemo } from 'react';
import {
  Search, Star, Sliders, CheckCircle2, RotateCcw, AlertTriangle, Terminal,
  Trash2, Cpu, FileText, RefreshCw, Zap, ShieldCheck, Sparkles, ExternalLink,
  ChevronDown, ChevronUp, Copy, Check, Radio, Monitor, Mouse, Keyboard, Layout
} from 'lucide-react';

import { TweakItem, HardwareSpecs, CleanupItem, PresetProfile } from '../types';
import { WIN_TWEAK_GROUPS, CLEANUP_TOOLS_LIST, PRESETS_LIST, WINDOWS_TOOLS_SHORTCUTS } from '../data/winTweaksCatalog';

interface WindowsTweaksViewProps {
  tweaks: TweakItem[];
  hardware: HardwareSpecs;
  onUpdateTweakValue: (tweakId: string, newValue: string, isApplied: boolean) => void;
  onToggleFavorite: (tweakId: string) => void;
  onApplyPreset: (preset: PresetProfile) => void;
  onOpenPresetModal: (preset: PresetProfile) => void;
  onOpenCleanupModal: (item: CleanupItem) => void;
  onExecuteQuickCleanup: (item: CleanupItem) => void;
  onOpenSystemReportModal: () => void;
  onRefreshHardware: () => void;
}

export const WindowsTweaksView: React.FC<WindowsTweaksViewProps> = ({
  tweaks,
  hardware,
  onUpdateTweakValue,
  onToggleFavorite,
  onApplyPreset,
  onOpenPresetModal,
  onOpenCleanupModal,
  onExecuteQuickCleanup,
  onOpenSystemReportModal,
  onRefreshHardware
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCommandId, setExpandedCommandId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Helper for toast notice
  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3500);
  };

  // Filter tweaks by group, search query, and favorites
  const filteredTweaks = useMemo(() => {
    return tweaks.filter(t => {
      // Group filter
      if (selectedGroup === 'favorites' && !t.favorite) return false;
      if (selectedGroup !== 'all' && selectedGroup !== 'favorites' && t.categoryGroup !== selectedGroup) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchDesc = t.description.toLowerCase().includes(q);
        const matchGroup = (t.categoryGroup || '').toLowerCase().includes(q);
        const matchValue = (t.selectedValue || '').toLowerCase().includes(q);
        return matchTitle || matchDesc || matchGroup || matchValue;
      }

      return true;
    });
  }, [tweaks, selectedGroup, searchQuery]);

  // Copy command code handler
  const handleCopyCommand = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Quick action shortcut execution
  const handleExecuteShortcut = (shortcut: typeof WINDOWS_TOOLS_SHORTCUTS[0]) => {
    showToast(`Comando acionado: ${shortcut.name} (${shortcut.actionCommand})`);
  };

  return (
    <div className="space-y-5">
      
      {/* Toast Notice */}
      {toastNotice && (
        <div className="bg-[#102d1a] border border-[#1f5c32] rounded p-3 flex items-center justify-between text-[#4fef8b] text-xs font-mono shadow-xl animate-fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-[#4fef8b] shrink-0" />
            <span>{toastNotice}</span>
          </div>
          <button onClick={() => setToastNotice(null)} className="text-[#888] hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#1e3a4e] text-[#4cc2ff] border border-[#316a94] text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
              WINDOWS TWEAKS & TOOLS MODULE
            </span>
            <span className="bg-[#102d1a] text-[#4fef8b] border border-[#1f5c32] text-[10px] font-bold px-2 py-0.5 rounded font-mono">
              100% REVERSÍVEL
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-white tracking-tight mt-1.5">
            Central do Windows: Configurações do Sistema, Registro & Otimização
          </h2>
          <p className="text-xs text-[#aaa] mt-0.5 max-w-3xl leading-relaxed">
            Ajuste Barra de Tarefas, Menu Iniciar, Explorador de Arquivos, Menu de Contexto, Mouse, Teclado, Efeitos Visuais, Privacidade e Utilitários de Limpeza sem precisar procurar manualmente no Registro ou no Painel de Controle.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenSystemReportModal}
            className="bg-[#1e2e3d] hover:bg-[#283e52] text-[#4cc2ff] border border-[#316a94] font-bold text-xs px-3.5 py-2 rounded transition shadow-sm flex items-center space-x-1.5 cursor-pointer active:scale-95"
          >
            <FileText className="h-3.5 w-3.5 text-[#4cc2ff]" />
            <span>Exportar Relatório PC (.txt)</span>
          </button>
        </div>
      </div>

      {/* Presets Bar */}
      <div className="bg-[#141414] border border-[#262626] rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#4cc2ff]" />
            <span>Presets Rápidos de Otimização:</span>
          </span>
          <span className="text-[11px] text-[#888]">
            Selecione um perfil pré-configurado para visualizar e aplicar
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PRESETS_LIST.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onOpenPresetModal(preset)}
              className="bg-[#1c1c1c] hover:bg-[#252525] border border-[#333] hover:border-[#4cc2ff]/50 p-2.5 rounded text-left transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-mono font-bold text-[#4cc2ff] uppercase bg-[#182a38] px-1.5 py-0.5 rounded border border-[#316a94]">
                  {preset.badge}
                </span>
                <h4 className="text-xs font-bold text-white mt-1 group-hover:text-[#4cc2ff] transition">
                  {preset.name}
                </h4>
              </div>
              <p className="text-[10px] text-[#888] line-clamp-1 mt-1">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Subcategory Navigation */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#888]" />
          <input
            type="text"
            placeholder="Search tweaks... (ex: taskbar, mouse, DNS, dark mode, widgets, explorer, animation, etc.)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#141414] border border-[#282828] rounded text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#4cc2ff] transition font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-[#888] hover:text-white"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Subcategory Pills */}
        <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {WIN_TWEAK_GROUPS.map((grp) => {
            const isSelected = selectedGroup === grp.id;
            return (
              <button
                key={grp.id}
                onClick={() => setSelectedGroup(grp.id)}
                className={`px-3 py-1.5 rounded transition whitespace-nowrap font-mono cursor-pointer ${
                  isSelected
                    ? 'bg-[#1e3a4e] text-[#4cc2ff] border border-[#316a94] font-bold'
                    : 'bg-[#161616] text-[#888] hover:text-white hover:bg-[#202020] border border-[#2a2a2a]'
                }`}
              >
                {grp.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tweaks Cards Grid */}
      {(selectedGroup !== 'cleanup' && selectedGroup !== 'shortcuts') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#888] font-mono">
            <span>
              Exibindo <strong className="text-white">{filteredTweaks.length}</strong> configurações
            </span>
            <span>
              Status: <strong className="text-[#4fef8b]">{filteredTweaks.filter(t => t.applied).length} Otimizados</strong>
            </span>
          </div>

          {filteredTweaks.length === 0 ? (
            <div className="bg-[#141414] border border-[#282828] rounded p-8 text-center space-y-2">
              <Search className="h-8 w-8 text-[#555] mx-auto" />
              <p className="text-xs text-[#aaa]">Nenhum tweak encontrado para a busca ou filtro selecionado.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedGroup('all'); }}
                className="text-xs text-[#4cc2ff] hover:underline font-mono"
              >
                Resetar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {filteredTweaks.map((tweak) => {
                const isOptimized = tweak.applied || tweak.selectedValue === tweak.recommendedValue;
                const isCommandExpanded = expandedCommandId === tweak.id;

                return (
                  <div
                    key={tweak.id}
                    className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3.5 space-y-3 hover:border-[#3a3a3a] transition flex flex-col justify-between"
                  >
                    {/* Top Row: Group Badge + Version + Star */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        <span className="text-[9px] font-mono font-bold text-[#4cc2ff] uppercase bg-[#182a38] px-1.5 py-0.5 rounded border border-[#316a94]">
                          {tweak.categoryGroup?.toUpperCase()}
                        </span>
                        {tweak.supportedWinVersion && (
                          <span className="text-[9px] font-mono text-[#aaa] bg-[#222] px-1.5 py-0.5 rounded border border-[#333]">
                            {tweak.supportedWinVersion}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => onToggleFavorite(tweak.id)}
                          className={`p-1 rounded transition cursor-pointer ${
                            tweak.favorite ? 'text-[#fbbf24] bg-[#2a2208]' : 'text-[#666] hover:text-white'
                          }`}
                          title="Marcar como Favorito"
                        >
                          <Star className={`h-3.5 w-3.5 ${tweak.favorite ? 'fill-[#fbbf24]' : ''}`} />
                        </button>

                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isOptimized
                            ? 'bg-[#102d1a] text-[#4fef8b] border border-[#1f5c32]'
                            : 'bg-[#2d2208] text-[#fbbf24] border border-[#5e4710]'
                        }`}>
                          {isOptimized ? 'Optimized' : 'Needs Change'}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <span>{tweak.title}</span>
                      </h4>
                      <p className="text-xs text-[#888] leading-relaxed mt-1">
                        {tweak.description}
                      </p>

                      {tweak.warning && (
                        <div className="mt-2 bg-[#2d1212] border border-[#5e1f1f] rounded p-2 flex items-start space-x-1.5 text-[#fca5a5] text-[11px]">
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                          <span>{tweak.warning}</span>
                        </div>
                      )}
                    </div>

                    {/* Readouts & Options */}
                    <div className="space-y-2 bg-[#111] p-2.5 rounded border border-[#222] text-xs">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#888]">Estado Atual:</span>
                        <strong className="text-white">{tweak.selectedValue || tweak.currentValue}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#888]">Recomendado:</span>
                        <strong className="text-[#4fef8b]">{tweak.recommendedValue}</strong>
                      </div>

                      {/* Dropdown or Radio Selector if options present */}
                      {tweak.options && tweak.options.length > 0 && (
                        <div className="pt-1.5 border-t border-[#222]">
                          <label className="text-[10px] text-[#aaa] font-mono block mb-1">Selecionar Opção:</label>
                          <select
                            value={tweak.selectedValue || tweak.currentValue}
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateTweakValue(tweak.id, val, val === tweak.recommendedValue);
                              showToast(`Alterado "${tweak.title}" para "${val}"`);
                            }}
                            className="w-full bg-[#181818] border border-[#333] text-white text-xs rounded px-2 py-1 font-mono focus:outline-none focus:border-[#4cc2ff]"
                          >
                            {tweak.options.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Action Controls & PowerShell Preview Trigger */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const recVal = tweak.recommendedValue || 'Enabled';
                            onUpdateTweakValue(tweak.id, recVal, true);
                            showToast(`Aplicado ajuste recomendado em "${tweak.title}"`);
                          }}
                          className="flex-1 py-1.5 bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] font-bold text-xs rounded transition cursor-pointer active:scale-95 shadow-sm"
                        >
                          Apply
                        </button>

                        <button
                          onClick={() => {
                            const defaultVal = tweak.options?.[0]?.value || 'Disabled';
                            onUpdateTweakValue(tweak.id, defaultVal, false);
                            showToast(`Revertido "${tweak.title}" para o Padrão do Windows`);
                          }}
                          className="py-1.5 px-3 bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] hover:text-white border border-[#333] font-semibold text-xs rounded transition cursor-pointer active:scale-95 flex items-center space-x-1"
                          title="Reverter para o Padrão do Windows"
                        >
                          <RotateCcw className="h-3 w-3 text-[#aaa]" />
                          <span>Revert</span>
                        </button>

                        {tweak.commandPreview && (
                          <button
                            onClick={() => setExpandedCommandId(isCommandExpanded ? null : tweak.id)}
                            className="p-1.5 bg-[#222] hover:bg-[#2d2d2d] text-[#888] hover:text-white border border-[#333] rounded transition cursor-pointer"
                            title="Ver comando de registro/PowerShell"
                          >
                            <Terminal className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Command Preview Box */}
                      {isCommandExpanded && tweak.commandPreview && (
                        <div className="bg-[#0a0a0a] p-2 rounded border border-[#222] text-[10px] font-mono space-y-1">
                          <div className="flex items-center justify-between text-[#888]">
                            <span>Comando PowerShell / Registro:</span>
                            <button
                              onClick={() => handleCopyCommand(tweak.id, tweak.commandPreview || '')}
                              className="text-[#4cc2ff] hover:underline flex items-center space-x-1"
                            >
                              {copiedId === tweak.id ? <Check className="h-3 w-3 text-[#4fef8b]" /> : <Copy className="h-3 w-3" />}
                              <span>{copiedId === tweak.id ? 'Copiado' : 'Copiar'}</span>
                            </button>
                          </div>
                          <p className="text-[#4cc2ff] break-all select-all">{tweak.commandPreview}</p>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* CLEANUP TOOLS SECTION */}
      {(selectedGroup === 'all' || selectedGroup === 'cleanup') && (
        <div className="space-y-3 pt-3 border-t border-[#262626]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
              <Trash2 className="h-4 w-4 text-[#fca5a5]" />
              <span>Ferramentas de Limpeza do Windows (Cleanup Tools):</span>
            </span>
            <span className="text-[11px] text-[#888]">
              Limpeza segura de caches temporários sem afetar arquivos pessoais
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {CLEANUP_TOOLS_LIST.map((item) => {
              const formattedSize = item.estimatedSizeBytes > 0
                ? (item.estimatedSizeBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
                : 'Variável';

              return (
                <div
                  key={item.id}
                  className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3 space-y-2.5 flex flex-col justify-between hover:border-[#383838] transition"
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#fca5a5] uppercase bg-[#2d1212] px-1.5 py-0.5 rounded border border-[#521b1b]">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
                    <p className="text-[11px] text-[#888] mt-1 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#222]">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#888]">Espaço Liberado:</span>
                      <strong className="text-[#4fef8b]">{formattedSize}</strong>
                    </div>

                    <button
                      onClick={() => {
                        if (item.requiresConfirm) {
                          onOpenCleanupModal(item);
                        } else {
                          onExecuteQuickCleanup(item);
                          showToast(`Executado: ${item.title}`);
                        }
                      }}
                      className="w-full py-1.5 bg-[#381212] hover:bg-[#521b1b] text-[#fca5a5] border border-[#732121] font-bold text-xs rounded transition cursor-pointer active:scale-95 flex items-center justify-center space-x-1.5"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-[#fca5a5]" />
                      <span>Limpar Agora</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SHORTCUTS & TOOLS SECTION */}
      {(selectedGroup === 'all' || selectedGroup === 'shortcuts') && (
        <div className="space-y-3 pt-3 border-t border-[#262626]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
              <ExternalLink className="h-4 w-4 text-[#4cc2ff]" />
              <span>Atalhos & Painéis do Windows (Windows Utility Shortcuts):</span>
            </span>
            <span className="text-[11px] text-[#888]">
              Acesso instantâneo aos painéis oficiais sem alterar registros
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {WINDOWS_TOOLS_SHORTCUTS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => handleExecuteShortcut(sc)}
                className="bg-[#161616] hover:bg-[#202020] border border-[#2a2a2a] hover:border-[#316a94] p-3 rounded text-left transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[#4cc2ff] mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-[#4cc2ff] transition">
                      {sc.name}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#888] group-hover:text-[#4cc2ff]" />
                  </div>
                  <p className="text-[10px] text-[#888] line-clamp-2 leading-relaxed">
                    {sc.description}
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-mono text-[#555] bg-[#0d0d0d] px-1.5 py-0.5 rounded border border-[#1a1a1a] truncate">
                  {sc.actionCommand}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PC HARDWARE SUMMARY CARD */}
      <div className="bg-[#141414] border border-[#262626] rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="h-4 w-4 text-[#4cc2ff]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Resumo Técnico do Hardware para Diagnóstico
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onRefreshHardware}
              className="bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] hover:text-white text-xs font-mono font-semibold px-2.5 py-1 rounded border border-[#333] transition flex items-center space-x-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3 text-[#4cc2ff]" />
              <span>Refresh Hardware</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
          <div className="bg-[#181818] p-2 rounded border border-[#222]">
            <span className="text-[10px] text-[#888] block">PROCESSADOR (CPU)</span>
            <strong className="text-white text-[11px] truncate block">{hardware.cpu}</strong>
          </div>
          <div className="bg-[#181818] p-2 rounded border border-[#222]">
            <span className="text-[10px] text-[#888] block">PLACA DE VÍDEO (GPU)</span>
            <strong className="text-white text-[11px] truncate block">{hardware.gpu}</strong>
          </div>
          <div className="bg-[#181818] p-2 rounded border border-[#222]">
            <span className="text-[10px] text-[#888] block">MEMÓRIA RAM</span>
            <strong className="text-white text-[11px] block">{hardware.ramTotalGB} GB DDR4/DDR5</strong>
          </div>
          <div className="bg-[#181818] p-2 rounded border border-[#222]">
            <span className="text-[10px] text-[#888] block">DISCO PRINCIPAL</span>
            <strong className="text-white text-[11px] block">{hardware.driveType} ({hardware.driveFreeSpaceGB}GB livre)</strong>
          </div>
          <div className="bg-[#181818] p-2 rounded border border-[#222]">
            <span className="text-[10px] text-[#888] block">SISTEMA OPERACIONAL</span>
            <strong className="text-white text-[11px] block">{hardware.os} ({hardware.osBuild})</strong>
          </div>
          <div className="bg-[#181818] p-2 rounded border border-[#222]">
            <span className="text-[10px] text-[#888] block">MONITOR / TELA</span>
            <strong className="text-white text-[11px] block">{hardware.monitorResolution || '1920x1080 @ 165Hz'}</strong>
          </div>
        </div>
      </div>

    </div>
  );
};
