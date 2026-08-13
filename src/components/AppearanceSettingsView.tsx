import React from 'react';
import { Palette, Sun, Moon, Laptop, Sparkles, Check, RefreshCw, Zap, Sliders, Shield, Play } from 'lucide-react';
import { useTheme, ACCENT_PRESETS_MAP, THEME_CONFIGS } from '../context/ThemeContext';
import { ThemeId, AppearanceMode, AccentPreset } from '../types/theme';

export const AppearanceSettingsView: React.FC = () => {
  const {
    themeId,
    appearance,
    resolvedAppearance,
    accentPreset,
    customAccentHex,
    effectiveAccentHex,
    enableAnimations,
    setThemeId,
    setAppearance,
    setAccentPreset,
    setCustomAccentHex,
    setEnableAnimations,
    resetToDefaults
  } = useTheme();

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="theme-card p-5 rounded-theme-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5 mb-1">
            <Palette className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold tracking-wide text-[var(--text-primary)]">
              Gerenciador de Aparência & Temas
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-soft text-accent border border-accent-soft uppercase">
              5 ESTILOS DISPONÍVEIS
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Personalize visualmente o Palorni sem alterar nenhuma função de otimização, leitura de hardware ou inteligência do sistema.
          </p>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetToDefaults}
          className="px-3.5 py-2 rounded-theme-md bg-[var(--bg-input)] hover:bg-[var(--border-strong)] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border-subtle)] transition flex items-center space-x-2 cursor-pointer self-start md:self-auto active:scale-95"
          title="Restaurar visual padrão do Palorni Engine"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Theme Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Seletor de Tema */}
          <div className="theme-card p-5 rounded-theme-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-2">
                <span>1. Tema de Design</span>
              </h3>
              <span className="text-xs font-mono text-accent font-semibold">
                Tema Ativo: {THEME_CONFIGS.find(t => t.id === themeId)?.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {THEME_CONFIGS.map((theme) => {
                const isSelected = themeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setThemeId(theme.id)}
                    className={`p-3.5 rounded-theme-md text-left transition relative flex flex-col justify-between border cursor-pointer ${
                      isSelected
                        ? 'border-accent bg-accent-soft shadow-md'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-input)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[var(--text-primary)] flex items-center space-x-1.5">
                          <span>{theme.name}</span>
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            isSelected
                              ? 'bg-accent text-black font-extrabold'
                              : 'bg-[var(--bg-badge)] text-[var(--text-muted)]'
                          }`}
                        >
                          {theme.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1">
                        {theme.description}
                      </p>
                    </div>

                    {/* Checkmark Indicator */}
                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-accent-soft flex items-center space-x-1 text-[10px] font-bold text-accent">
                        <Check className="h-3 w-3" />
                        <span>SELECIONADO</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Modo de Aparência (Light / Dark / System) */}
          <div className="theme-card p-5 rounded-theme-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-2">
                <span>2. Modo de Aparência (Modo Claro / Escuro)</span>
              </h3>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Modo Ativo: <strong className="text-accent uppercase">{resolvedAppearance}</strong>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Light Mode */}
              <button
                onClick={() => setAppearance('light')}
                className={`p-3 rounded-theme-md border text-center transition flex flex-col items-center space-y-2 cursor-pointer ${
                  appearance === 'light'
                    ? 'border-accent bg-accent-soft text-accent font-bold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Sun className="h-5 w-5 text-amber-400" />
                <span className="text-xs font-semibold">Light (Claro)</span>
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setAppearance('dark')}
                className={`p-3 rounded-theme-md border text-center transition flex flex-col items-center space-y-2 cursor-pointer ${
                  appearance === 'dark'
                    ? 'border-accent bg-accent-soft text-accent font-bold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Moon className="h-5 w-5 text-indigo-400" />
                <span className="text-xs font-semibold">Dark (Escuro)</span>
              </button>

              {/* System Mode */}
              <button
                onClick={() => setAppearance('system')}
                className={`p-3 rounded-theme-md border text-center transition flex flex-col items-center space-y-2 cursor-pointer relative ${
                  appearance === 'system'
                    ? 'border-accent bg-accent-soft text-accent font-bold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Laptop className="h-5 w-5 text-sky-400" />
                <span className="text-xs font-semibold">System (Auto)</span>
                {appearance === 'system' && (
                  <span className="text-[9px] text-[var(--text-muted)] font-mono">
                    ({resolvedAppearance === 'dark' ? 'Windows Escuro' : 'Windows Claro'})
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Section 3: Accent Color (Cor de Destaque) */}
          <div className="theme-card p-5 rounded-theme-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-2">
                <span>3. Cor de Destaque (Accent Color)</span>
              </h3>
              <div className="flex items-center space-x-2">
                <span
                  className="h-3.5 w-3.5 rounded-full border border-white/40 shadow-sm"
                  style={{ backgroundColor: effectiveAccentHex }}
                />
                <span className="text-xs font-mono font-bold uppercase" style={{ color: effectiveAccentHex }}>
                  {effectiveAccentHex}
                </span>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(ACCENT_PRESETS_MAP) as (keyof typeof ACCENT_PRESETS_MAP)[]).map((presetKey) => {
                const preset = ACCENT_PRESETS_MAP[presetKey];
                const isSelected = accentPreset === presetKey;
                return (
                  <button
                    key={presetKey}
                    onClick={() => setAccentPreset(presetKey)}
                    className={`p-2.5 rounded-theme-md border text-xs font-medium flex items-center space-x-2.5 transition cursor-pointer ${
                      isSelected
                        ? 'border-accent bg-accent-soft text-[var(--text-primary)] font-bold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/20 shrink-0 shadow-sm"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span className="truncate">{preset.name}</span>
                  </button>
                );
              })}

              {/* Custom Color Picker Button */}
              <label
                className={`p-2.5 rounded-theme-md border text-xs font-medium flex items-center space-x-2.5 transition cursor-pointer ${
                  accentPreset === 'custom'
                    ? 'border-accent bg-accent-soft text-[var(--text-primary)] font-bold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
              >
                <input
                  type="color"
                  value={customAccentHex}
                  onChange={(e) => {
                    setCustomAccentHex(e.target.value);
                    setAccentPreset('custom');
                  }}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
                />
                <span className="truncate">Cor Personalizada</span>
              </label>
            </div>
          </div>

          {/* Section 4: Animações & Transições */}
          <div className="theme-card p-5 rounded-theme-lg flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Animações e Efeitos Visuais</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Ative ou desative transições de troca de página, efeitos hover e movimento.
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => setEnableAnimations(!enableAnimations)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer relative shrink-0 ${
                enableAnimations ? 'bg-accent' : 'bg-[var(--border-strong)]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  enableAnimations ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Right Column: Interactive Live Theme Preview Frame */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-20">
            <div className="theme-card p-5 rounded-theme-lg border-accent-soft shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Pré-visualização em Tempo Real</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--bg-badge)] text-[var(--text-primary)]">
                  INTERATIVO
                </span>
              </div>

              {/* Mockup Frame */}
              <div className="bg-[var(--bg-primary)] p-4 rounded-theme-md border border-[var(--border-subtle)] space-y-3.5 shadow-inner">
                
                {/* Mock Header Navigation */}
                <div className="bg-[var(--bg-secondary)] p-2 rounded-theme-sm border border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="text-xs font-bold text-[var(--text-primary)] font-mono">
                      PALORNI OPTIMIZER
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent text-black font-mono">
                    ATIVO
                  </span>
                </div>

                {/* Mock Navigation Tabs */}
                <div className="flex space-x-1 text-[11px] font-medium border-b border-[var(--border-subtle)] pb-2">
                  <span className="px-2.5 py-1 rounded-theme-sm bg-accent-soft text-accent border border-accent-soft font-bold flex items-center space-x-1">
                    <Sliders className="h-3 w-3" />
                    <span>Tweaks</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-theme-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    Hardware
                  </span>
                  <span className="px-2.5 py-1 rounded-theme-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    Jogos
                  </span>
                </div>

                {/* Mock Card */}
                <div className="bg-[var(--bg-card)] p-3 rounded-theme-md border border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">
                      Desempenho da CPU
                    </span>
                    <span className="text-[11px] font-mono font-bold text-accent bg-accent-soft px-1.5 py-0.5 rounded">
                      18% Uso
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">
                    Intel Core i7-13700K • 16 Cores
                  </div>

                  {/* Progress Bar in Accent Color */}
                  <div className="w-full bg-[var(--bg-input)] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ width: '45%', backgroundColor: effectiveAccentHex }}
                    />
                  </div>
                </div>

                {/* Mock Action Controls */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button className="bg-accent hover:opacity-90 text-black font-bold text-xs px-3 py-1.5 rounded-theme-sm transition shadow-sm flex items-center space-x-1.5 cursor-pointer">
                    <Play className="h-3 w-3 fill-black" />
                    <span>Aplicar Otimização</span>
                  </button>

                  <button className="bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold text-xs px-3 py-1.5 rounded-theme-sm hover:border-[var(--border-strong)] transition">
                    Cancelar
                  </button>
                </div>

              </div>

              {/* Footnote */}
              <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                💡 O tema selecionado é aplicado instantaneamente em todas as telas, cards, botões, modais e relatórios da aplicação.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
