import React from 'react';
import { ShieldCheck, RotateCcw, Zap, HelpCircle, Terminal, Cpu, Award, Sliders, Palette } from 'lucide-react';
import { useTheme, THEME_CONFIGS } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appliedCount: number;
  totalTweaks: number;
  onOptimizeAll: () => void;
  onOpenRestorePoints: () => void;
  onOpenPatchNotes: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  appliedCount,
  totalTweaks,
  onOptimizeAll,
  onOpenRestorePoints,
  onOpenPatchNotes
}) => {
  const { themeId, effectiveAccentHex } = useTheme();
  const currentTheme = THEME_CONFIGS.find(t => t.id === themeId);

  return (
    <header className="bg-app-header border-b border-[var(--border-subtle)] sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-theme-md bg-[var(--bg-card)] border border-[var(--border-strong)] flex items-center justify-center shadow-md">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-extrabold tracking-wider text-[var(--text-primary)] font-mono">
                PALORNI <span className="text-accent font-normal text-xs bg-accent-soft border border-accent-soft px-2 py-0.5 rounded-theme-sm">OPTIMIZER V10</span>
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-theme-sm bg-[#2a1b38] text-[#d8b4fe] border border-[#582982]">
                100% FREE
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">
              Gerenciador completo de recursos do Windows e otimizador de jogos • Palorni Engine®
            </p>
          </div>
        </div>

        {/* Action Controls & Global Stats */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Status Badge */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-theme-sm px-2.5 py-1 flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span className="text-[11px] font-mono text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)] font-bold">{appliedCount}</strong>/{totalTweaks} Ajustes Ativos
            </span>
          </div>

          {/* Theme Quick Selector Button */}
          <button
            onClick={() => setActiveTab('appearance')}
            className="bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] text-xs font-medium px-2.5 py-1.5 rounded-theme-sm border border-[var(--border-subtle)] transition flex items-center space-x-1.5 cursor-pointer active:scale-95"
            title="Alterar Tema e Aparência"
          >
            <Palette className="h-3.5 w-3.5 text-accent" />
            <span className="hidden sm:inline font-mono text-[11px]">Tema:</span>
            <strong className="text-accent font-semibold">{currentTheme?.name.split(' ')[0]}</strong>
          </button>

          {/* Create Restore Point */}
          <button
            onClick={onOpenRestorePoints}
            className="bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium px-3 py-1.5 rounded-theme-sm border border-[var(--border-subtle)] transition flex items-center space-x-1.5 cursor-pointer active:scale-95"
            title="Gerenciar Pontos de Restauração do Windows"
          >
            <RotateCcw className="h-3.5 w-3.5 text-accent" />
            <span>Ponto de Restauração</span>
          </button>

          {/* Quick Patch Notes */}
          <button
            onClick={onOpenPatchNotes}
            className="bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium px-3 py-1.5 rounded-theme-sm border border-[var(--border-subtle)] transition flex items-center space-x-1.5 cursor-pointer active:scale-95"
          >
            <Award className="h-3.5 w-3.5 text-[#fbbf24]" />
            <span>Notas v10</span>
          </button>

          {/* Full Auto-Optimize Button */}
          <button
            onClick={onOptimizeAll}
            className="bg-accent hover:opacity-90 text-black border border-accent-soft text-xs font-bold px-3.5 py-1.5 rounded-theme-sm transition shadow-sm flex items-center space-x-1.5 active:scale-95 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-black" />
            <span>OTIMIZAR TUDO ⚡</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 border-t border-[var(--border-subtle)]">
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar py-1.5 text-xs font-medium">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-theme-sm flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-accent-soft text-accent border border-accent-soft font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>Painel & Recursos</span>
          </button>

          <button
            onClick={() => setActiveTab('wintweaks')}
            className={`px-3 py-1.5 rounded-theme-sm flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'wintweaks'
                ? 'bg-accent-soft text-accent border border-accent-soft font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <Sliders className="h-3.5 w-3.5 text-accent" />
            <span>Windows Tweaks</span>
          </button>

          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-3 py-1.5 rounded-theme-sm flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'hardware'
                ? 'bg-accent-soft text-accent border border-accent-soft font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Leitura de Hardware</span>
          </button>

          <button
            onClick={() => setActiveTab('games')}
            className={`px-3 py-1.5 rounded-theme-sm flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'games'
                ? 'bg-accent-soft text-accent border border-accent-soft font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Detecção de Jogos</span>
          </button>

          <button
            onClick={() => setActiveTab('tweaks')}
            className={`px-3 py-1.5 rounded-theme-sm flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'tweaks'
                ? 'bg-accent-soft text-accent border border-accent-soft font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Central de Otimizações</span>
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`px-3 py-1.5 rounded-theme-sm flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'network'
                ? 'bg-accent-soft text-accent border border-accent-soft font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Utilitário de Rede</span>
          </button>

          <button
            onClick={() => setActiveTab('fixes')}
            className={`px-3 py-1.5 rounded-theme-sm flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'fixes'
                ? 'bg-accent-soft text-accent border border-accent-soft font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Correções & Reversões</span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-3 py-1.5 rounded-theme-sm flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'appearance'
                ? 'bg-accent-soft text-accent border border-accent-soft font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-accent" />
            <span>Aparência & Temas</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
