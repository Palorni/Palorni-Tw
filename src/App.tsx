import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { HardwareView } from './components/HardwareView';
import { GamesView } from './components/GamesView';
import { TweaksView } from './components/TweaksView';
import { WindowsTweaksView } from './components/WindowsTweaksView';
import { NetworkView } from './components/NetworkView';
import { FixesView } from './components/FixesView';
import { AppearanceSettingsView } from './components/AppearanceSettingsView';
import { PatchNotesModal } from './components/PatchNotesModal';
import { RestorePointModal } from './components/RestorePointModal';
import { PresetModal } from './components/PresetModal';
import { CleanupConfirmModal } from './components/CleanupConfirmModal';
import { SystemReportModal } from './components/SystemReportModal';

import { ThemeProvider } from './context/ThemeContext';
import { detectSystemHardware, INITIAL_INSTALLED_GAMES } from './data/mockHardwareAndGames';
import { PALORNI_TWEAK_CATEGORIES } from './data/tweaksCatalog';
import { INITIAL_WIN_TWEAKS } from './data/winTweaksCatalog';
import { HardwareSpecs, InstalledGame, TweakCategory, RestorePoint, SystemMetrics, TweakItem, PresetProfile, CleanupItem } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [hardware, setHardware] = useState<HardwareSpecs>(detectSystemHardware());
  const [games, setGames] = useState<InstalledGame[]>(INITIAL_INSTALLED_GAMES);
  const [categories, setCategories] = useState<TweakCategory[]>(PALORNI_TWEAK_CATEGORIES);
  const [winTweaks, setWinTweaks] = useState<TweakItem[]>(INITIAL_WIN_TWEAKS);

  // Modals state
  const [isPatchNotesOpen, setIsPatchNotesOpen] = useState(false);
  const [isRestorePointOpen, setIsRestorePointOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<PresetProfile | null>(null);
  const [selectedCleanupItem, setSelectedCleanupItem] = useState<CleanupItem | null>(null);
  const [isSystemReportOpen, setIsSystemReportOpen] = useState(false);

  // Restore points state
  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>([
    {
      id: 'rp-initial',
      name: 'Ponto Inicial de Instalação Palorni V10',
      timestamp: '12/08/2026 21:48',
      tweaksAppliedCount: 0
    }
  ]);

  // Live Metrics simulation
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsagePct: 18,
    ramUsageGB: 5.4,
    gpuUsagePct: 12,
    diskUsagePct: 24,
    pingMs: 14,
    fpsBoostEstimatedPct: 0
  });

  // Calculate total applied tweaks count (combining system tweaks + win tweaks)
  const allSystemTweaks = categories.flatMap(c => c.tweaks);
  const totalAppliedCount = allSystemTweaks.filter(t => t.applied).length + winTweaks.filter(t => t.applied).length;
  const grandTotalTweaksCount = allSystemTweaks.length + winTweaks.length;

  // Real-time metric fluctuation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpuUsagePct: Math.min(99, Math.max(8, prev.cpuUsagePct + Math.floor(Math.random() * 7 - 3))),
        ramUsageGB: parseFloat(Math.min(hardware.ramTotalGB, Math.max(3.2, prev.ramUsageGB + (Math.random() * 0.4 - 0.2))).toFixed(1)),
        gpuUsagePct: Math.min(99, Math.max(5, prev.gpuUsagePct + Math.floor(Math.random() * 9 - 4))),
        pingMs: Math.max(8, prev.pingMs + Math.floor(Math.random() * 3 - 1))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [hardware.ramTotalGB]);

  // Handler: Toggle single system tweak
  const handleToggleTweak = (tweakId: string) => {
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        tweaks: cat.tweaks.map(t => (t.id === tweakId ? { ...t, applied: !t.applied } : t))
      }))
    );
  };

  // Handler: Update Windows Tweak Value
  const handleUpdateWinTweakValue = (tweakId: string, newValue: string, isApplied: boolean) => {
    setWinTweaks(prev =>
      prev.map(t => {
        if (t.id === tweakId) {
          return {
            ...t,
            selectedValue: newValue,
            applied: isApplied
          };
        }
        return t;
      })
    );
  };

  // Handler: Toggle favorite on Windows Tweak
  const handleToggleFavoriteWinTweak = (tweakId: string) => {
    setWinTweaks(prev =>
      prev.map(t => (t.id === tweakId ? { ...t, favorite: !t.favorite } : t))
    );
  };

  // Handler: Apply Preset
  const handleApplyPreset = (preset: PresetProfile) => {
    setWinTweaks(prev =>
      prev.map(t => {
        const pVal = preset.tweakValues.find(pv => pv.tweakId === t.id);
        if (pVal) {
          return {
            ...t,
            selectedValue: pVal.value,
            applied: pVal.applied
          };
        }
        return t;
      })
    );
  };

  // Handler: Quick Cleanup
  const handleExecuteQuickCleanup = (item: CleanupItem) => {
    if (item.estimatedSizeBytes > 1000000000) {
      setMetrics(prev => ({
        ...prev,
        ramUsageGB: Math.max(2.8, parseFloat((prev.ramUsageGB - 0.9).toFixed(1)))
      }));
    }
  };

  // Handler: Refresh Hardware detection
  const handleRefreshHardware = () => {
    setHardware(detectSystemHardware());
  };

  // Handler: Apply entire category
  const handleApplyCategory = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            tweaks: cat.tweaks.map(t => ({ ...t, applied: true }))
          };
        }
        return cat;
      })
    );
  };

  // Handler: Full Auto-Optimize
  const handleOptimizeAll = () => {
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        tweaks: cat.tweaks.map(t => ({ ...t, applied: true }))
      }))
    );
    setWinTweaks(prev =>
      prev.map(t => ({
        ...t,
        selectedValue: t.recommendedValue || 'Enabled',
        applied: true
      }))
    );
  };

  // Handler: Revert Category
  const handleRevertCategory = (categoryName: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.name === categoryName) {
          return {
            ...cat,
            tweaks: cat.tweaks.map(t => ({ ...t, applied: false }))
          };
        }
        return cat;
      })
    );
  };

  // Handler: Revert All
  const handleRevertAll = () => {
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        tweaks: cat.tweaks.map(t => ({ ...t, applied: false }))
      }))
    );
    setWinTweaks(prev =>
      prev.map(t => ({
        ...t,
        selectedValue: t.options?.[0]?.value || 'Disabled',
        applied: false
      }))
    );
  };

  // Handler: Add custom game
  const handleAddCustomGame = (gameName: string, exeName: string) => {
    const newGame: InstalledGame = {
      id: `game-${Date.now()}`,
      name: gameName,
      executable: exeName,
      path: `C:\\Games\\${gameName}`,
      platform: 'Steam',
      genre: 'Personalizado',
      recommendedQoS: 46,
      recommendedTweaks: [
        `Prioridade QoS DSCP 46 para ${exeName}`,
        'Plano de Energia Palorni V10 Max Performance',
        'TCPNoDelay = 1 & TcpAckFrequency = 1'
      ],
      iconName: 'Play'
    };
    setGames(prev => [newGame, ...prev]);
  };

  // Handler: Quick RAM Clean
  const handleQuickCleanRAM = () => {
    setMetrics(prev => ({
      ...prev,
      ramUsageGB: Math.max(2.8, parseFloat((prev.ramUsageGB - 1.8).toFixed(1)))
    }));
  };

  // Handler: Ping Test Simulation
  const handleRunPingTest = async (host: string): Promise<number> => {
    await new Promise(res => setTimeout(res, 600));
    if (host.includes('-br.')) return Math.floor(Math.random() * 8 + 11);
    if (host.includes('-nae.')) return Math.floor(Math.random() * 15 + 110);
    if (host.includes('-eu.')) return Math.floor(Math.random() * 20 + 175);
    return Math.floor(Math.random() * 30 + 130);
  };

  // Create restore point
  const handleCreateRestorePoint = (name: string) => {
    const now = new Date();
    const timestampStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newPoint: RestorePoint = {
      id: `rp-${Date.now()}`,
      name,
      timestamp: timestampStr,
      tweaksAppliedCount: totalAppliedCount
    };
    setRestorePoints(prev => [newPoint, ...prev]);
  };

  const handleApplyRestorePoint = (point: RestorePoint) => {
    alert(`Restauração enviada para o serviço RSTRUI do Windows para o ponto "${point.name}". O sistema retornará às configurações dessa data.`);
  };

  return (
    <div className="min-h-screen bg-app-root text-[var(--text-primary)] font-sans selection:bg-accent selection:text-black flex flex-col">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appliedCount={totalAppliedCount}
        totalTweaks={grandTotalTweaksCount}
        onOptimizeAll={handleOptimizeAll}
        onOpenRestorePoints={() => setIsRestorePointOpen(true)}
        onOpenPatchNotes={() => setIsPatchNotesOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-5 lg:px-6 py-5">
        {activeTab === 'dashboard' && (
          <DashboardView
            hardware={hardware}
            metrics={metrics}
            appliedTweaksCount={totalAppliedCount}
            totalTweaksCount={grandTotalTweaksCount}
            onNavigateTab={setActiveTab}
            onQuickCleanRAM={handleQuickCleanRAM}
          />
        )}

        {activeTab === 'wintweaks' && (
          <WindowsTweaksView
            tweaks={winTweaks}
            hardware={hardware}
            onUpdateTweakValue={handleUpdateWinTweakValue}
            onToggleFavorite={handleToggleFavoriteWinTweak}
            onApplyPreset={handleApplyPreset}
            onOpenPresetModal={(p) => setSelectedPreset(p)}
            onOpenCleanupModal={(item) => setSelectedCleanupItem(item)}
            onExecuteQuickCleanup={handleExecuteQuickCleanup}
            onOpenSystemReportModal={() => setIsSystemReportOpen(true)}
            onRefreshHardware={handleRefreshHardware}
          />
        )}

        {activeTab === 'hardware' && (
          <HardwareView
            hardware={hardware}
            installedGames={games}
            onApplyRecommendedTweaks={(tweakIds) => {
              tweakIds.forEach(id => handleToggleTweak(id));
            }}
          />
        )}

        {activeTab === 'games' && (
          <GamesView
            games={games}
            onApplyGameQoS={(game) => {
              alert(`Regra de Priorização QoS DSCP 46 para o executável "${game.executable}" foi aplicada no Registro do Windows com sucesso!`);
            }}
            onAddCustomGame={handleAddCustomGame}
          />
        )}

        {activeTab === 'tweaks' && (
          <TweaksView
            categories={categories}
            onToggleTweak={handleToggleTweak}
            onApplyCategory={handleApplyCategory}
          />
        )}

        {activeTab === 'network' && (
          <NetworkView
            onApplyAllNetwork={() => {
              handleApplyCategory('network');
              alert('Todos os 14 ajustes da utilidade de rede da Palorni foram aplicados com sucesso!');
            }}
            onRunPingTest={handleRunPingTest}
          />
        )}

        {activeTab === 'fixes' && (
          <FixesView
            onRevertCategory={handleRevertCategory}
            onRevertAll={handleRevertAll}
            onOpenRestorePoints={() => setIsRestorePointOpen(true)}
          />
        )}

        {activeTab === 'appearance' && (
          <AppearanceSettingsView />
        )}
      </main>

      {/* High-Density Engine Status Footer */}
      <footer className="bg-app-footer border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] py-2.5 px-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-[#10b981]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <strong className="font-mono text-[10px] uppercase tracking-wider">PALORNI ENGINE V10 ONLINE</strong>
          </span>
          <span className="text-[var(--border-strong)]">|</span>
          <span>ADMIN RIGHTS: <strong className="text-[var(--text-primary)]">GRANTED</strong></span>
          <span className="text-[var(--border-strong)]">|</span>
          <span>CPU THREADS: <strong className="text-accent">{hardware.cpuCores}</strong></span>
        </div>
        <div className="flex items-center space-x-4 font-mono text-[10px] text-[var(--text-muted)]">
          <span>PING: <strong className="text-[#10b981]">{metrics.pingMs}ms</strong></span>
          <span>RAM: <strong className="text-[var(--text-primary)]">{metrics.ramUsageGB}GB / {hardware.ramTotalGB}GB</strong></span>
          <span>PALORNI FREE OPTIMIZER © 2026</span>
        </div>
      </footer>

      {/* Modals */}
      <PatchNotesModal
        isOpen={isPatchNotesOpen}
        onClose={() => setIsPatchNotesOpen(false)}
      />

      <RestorePointModal
        isOpen={isRestorePointOpen}
        onClose={() => setIsRestorePointOpen(false)}
        restorePoints={restorePoints}
        onCreateRestorePoint={handleCreateRestorePoint}
        onApplyRestorePoint={handleApplyRestorePoint}
      />

      <PresetModal
        isOpen={selectedPreset !== null}
        onClose={() => setSelectedPreset(null)}
        preset={selectedPreset}
        allTweaks={winTweaks}
        onConfirmApplyPreset={handleApplyPreset}
      />

      <CleanupConfirmModal
        isOpen={selectedCleanupItem !== null}
        onClose={() => setSelectedCleanupItem(null)}
        item={selectedCleanupItem}
        onConfirmCleanup={handleExecuteQuickCleanup}
      />

      <SystemReportModal
        isOpen={isSystemReportOpen}
        onClose={() => setIsSystemReportOpen(false)}
        hardware={hardware}
        allTweaks={winTweaks}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
