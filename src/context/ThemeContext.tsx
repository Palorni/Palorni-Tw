import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { ThemeId, AppearanceMode, AccentPreset, ThemeContextType, ThemeConfig } from '../types/theme';

export const ACCENT_PRESETS_MAP: Record<Exclude<AccentPreset, 'custom'>, { name: string; hex: string; hover: string }> = {
  cyan: { name: 'Ciano Palorni', hex: '#38bdf8', hover: '#0284c7' },
  blue: { name: 'Azul Windows', hex: '#3b82f6', hover: '#1d4ed8' },
  purple: { name: 'Roxo Cyber', hex: '#a855f7', hover: '#7e22ce' },
  green: { name: 'Verde Matrix', hex: '#10b981', hover: '#047857' },
  red: { name: 'Vermelho Nitro', hex: '#ef4444', hover: '#b91c1c' },
  orange: { name: 'Laranja Solar', hex: '#f97316', hover: '#c2410c' },
  pink: { name: 'Rosa Neon', hex: '#ec4899', hover: '#be185d' }
};

export const THEME_CONFIGS: ThemeConfig[] = [
  {
    id: 'palorni',
    name: 'Palorni Original',
    subtitle: 'Estilo padrão Palorni Engine',
    description: 'Visual moderno de alta performance, escuro e equilibrado com foco em clareza técnica e máxima resposta.',
    badge: 'PADRÃO',
    supportedAppearances: ['dark', 'light', 'system'],
    defaultAppearance: 'dark',
    previewBg: 'bg-[#0c0c0c]',
    previewBorder: 'border-[#383838]'
  },
  {
    id: 'windows11',
    name: 'Windows 11 Fluent',
    subtitle: 'Inspirado no Fluent Design',
    description: 'Acabamento Mica/Acrylic, cantos arredondados suaves, profundidade com sombras discretas e visual nativo do Windows 11.',
    badge: 'FLUENT',
    supportedAppearances: ['dark', 'light', 'system'],
    defaultAppearance: 'system',
    previewBg: 'bg-[#1f1f23]',
    previewBorder: 'border-white/20'
  },
  {
    id: 'android',
    name: 'Android Material You',
    subtitle: 'Inspirado em Material Design 3',
    description: 'Design expressivo com botões em formato de pílula, cards arredondados confortáveis, chips e adaptabilidade de cor.',
    badge: 'MATERIAL',
    supportedAppearances: ['dark', 'light', 'system'],
    defaultAppearance: 'system',
    previewBg: 'bg-[#1b1c22]',
    previewBorder: 'border-[#444756]'
  },
  {
    id: 'liquid-glass',
    name: 'Liquid Glass',
    subtitle: 'Interface em Vidro Translúcido',
    description: 'Efeito de vidro fosco com backdrop-blur, bordas iluminadas e alta legibilidade, preservando contraste perfeito.',
    badge: 'GLASS',
    supportedAppearances: ['dark', 'light', 'system'],
    defaultAppearance: 'dark',
    previewBg: 'bg-[#0a0e1a]',
    previewBorder: 'border-white/30'
  },
  {
    id: 'ghub',
    name: 'G HUB Gaming',
    subtitle: 'Inspirado em Software Gamer',
    description: 'Fundo ultra escuro de alto contraste, layout compacto com acentuação neon vívida e estética técnica militar/gamer.',
    badge: 'GAMING',
    supportedAppearances: ['dark', 'light'],
    defaultAppearance: 'dark',
    previewBg: 'bg-[#050608]',
    previewBorder: 'border-[#334155]'
  }
];

const STORAGE_KEY = 'palorni_theme_settings_v2';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(56, 189, 248, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper to darken hex
function adjustHexColor(hex: string, percent: number): string {
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return hex;
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>('palorni');
  const [appearance, setAppearance] = useState<AppearanceMode>('dark');
  const [accentPreset, setAccentPreset] = useState<AccentPreset>('cyan');
  const [customAccentHex, setCustomAccentHex] = useState<string>('#38bdf8');
  const [enableAnimations, setEnableAnimations] = useState<boolean>(true);

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.themeId) setThemeId(parsed.themeId);
        if (parsed.appearance) setAppearance(parsed.appearance);
        if (parsed.accentPreset) setAccentPreset(parsed.accentPreset);
        if (parsed.customAccentHex) setCustomAccentHex(parsed.customAccentHex);
        if (typeof parsed.enableAnimations === 'boolean') setEnableAnimations(parsed.enableAnimations);
      }
    } catch (e) {
      console.warn('Falha ao ler preferências de tema do localStorage:', e);
    }
  }, []);

  // Monitor Windows System Dark/Light Mode
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Compute effective resolved appearance ('dark' or 'light')
  const resolvedAppearance: 'dark' | 'light' = useMemo(() => {
    if (appearance === 'system') {
      return systemIsDark ? 'dark' : 'light';
    }
    return appearance;
  }, [appearance, systemIsDark]);

  // Compute effective accent color
  const effectiveAccentHex = useMemo(() => {
    if (accentPreset === 'custom') {
      return customAccentHex || '#38bdf8';
    }
    return ACCENT_PRESETS_MAP[accentPreset]?.hex || '#38bdf8';
  }, [accentPreset, customAccentHex]);

  // Apply CSS variables and dataset attributes to root element
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', themeId);
    root.setAttribute('data-appearance', appearance);
    root.setAttribute('data-resolved-appearance', resolvedAppearance);
    root.setAttribute('data-accent-preset', accentPreset);
    root.setAttribute('data-animations', enableAnimations ? 'true' : 'false');

    const accentHover = adjustHexColor(effectiveAccentHex, resolvedAppearance === 'dark' ? -15 : 15);
    const accentBgAlpha = hexToRgba(effectiveAccentHex, 0.15);
    const accentBorderAlpha = hexToRgba(effectiveAccentHex, 0.4);
    const accentGlow = hexToRgba(effectiveAccentHex, 0.35);

    root.style.setProperty('--color-accent', effectiveAccentHex);
    root.style.setProperty('--color-accent-hover', accentHover);
    root.style.setProperty('--color-accent-bg', accentBgAlpha);
    root.style.setProperty('--color-accent-border', accentBorderAlpha);
    root.style.setProperty('--color-accent-glow', accentGlow);
    root.style.setProperty('--color-accent-text', effectiveAccentHex);

    // Save to localStorage
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          themeId,
          appearance,
          accentPreset,
          customAccentHex,
          enableAnimations
        })
      );
    } catch (e) {
      console.warn('Falha ao salvar tema no localStorage:', e);
    }
  }, [themeId, appearance, resolvedAppearance, accentPreset, effectiveAccentHex, enableAnimations]);

  const resetToDefaults = () => {
    setThemeId('palorni');
    setAppearance('dark');
    setAccentPreset('cyan');
    setCustomAccentHex('#38bdf8');
    setEnableAnimations(true);
  };

  return (
    <ThemeContext.Provider
      value={{
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser utilizado dentro de um ThemeProvider');
  }
  return context;
};
