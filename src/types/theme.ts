export type ThemeId = 'palorni' | 'windows11' | 'android' | 'liquid-glass' | 'ghub';
export type AppearanceMode = 'light' | 'dark' | 'system';
export type AccentPreset = 'blue' | 'purple' | 'green' | 'cyan' | 'red' | 'orange' | 'pink' | 'custom';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  supportedAppearances: AppearanceMode[];
  defaultAppearance: AppearanceMode;
  previewBg: string;
  previewBorder: string;
}

export interface ThemeState {
  themeId: ThemeId;
  appearance: AppearanceMode;
  resolvedAppearance: 'light' | 'dark';
  accentPreset: AccentPreset;
  customAccentHex: string;
  effectiveAccentHex: string;
  enableAnimations: boolean;
}

export interface ThemeContextType extends ThemeState {
  setThemeId: (id: ThemeId) => void;
  setAppearance: (mode: AppearanceMode) => void;
  setAccentPreset: (preset: AccentPreset) => void;
  setCustomAccentHex: (hex: string) => void;
  setEnableAnimations: (enabled: boolean) => void;
  resetToDefaults: () => void;
}
