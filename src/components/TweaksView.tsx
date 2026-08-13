import React, { useState } from 'react';
import { Cpu, Zap, Mouse, Monitor, Activity, Wifi, HardDrive, Trash2, Database, Check, Terminal, AlertTriangle, Filter } from 'lucide-react';
import { TweakCategory, TweakItem } from '../types';

interface TweaksViewProps {
  categories: TweakCategory[];
  onToggleTweak: (tweakId: string) => void;
  onApplyCategory: (categoryId: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu': return <Cpu className="h-5 w-5 text-cyan-400" />;
    case 'Zap': return <Zap className="h-5 w-5 text-amber-400" />;
    case 'Mouse': return <Mouse className="h-5 w-5 text-purple-400" />;
    case 'Monitor': return <Monitor className="h-5 w-5 text-emerald-400" />;
    case 'Activity': return <Activity className="h-5 w-5 text-red-400" />;
    case 'Wifi': return <Wifi className="h-5 w-5 text-blue-400" />;
    case 'HardDrive': return <HardDrive className="h-5 w-5 text-indigo-400" />;
    case 'Trash2': return <Trash2 className="h-5 w-5 text-pink-400" />;
    case 'Database': return <Database className="h-5 w-5 text-orange-400" />;
    default: return <Zap className="h-5 w-5 text-cyan-400" />;
  }
};

export const TweaksView: React.FC<TweaksViewProps> = ({
  categories,
  onToggleTweak,
  onApplyCategory
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || 'general');
  const [filterImpact, setFilterImpact] = useState<string>('Todos');
  const [showTerminalPreview, setShowTerminalPreview] = useState<string | null>(null);

  const selectedCategoryObj = categories.find(c => c.id === activeCategory) || categories[0];

  const filteredTweaks = selectedCategoryObj.tweaks.filter(t => {
    if (filterImpact === 'Todos') return true;
    return t.impactLevel === filterImpact;
  });

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-[#162736] text-[#4cc2ff] border border-[#234d6e] text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
            CATÁLOGO PALORNI V10
          </span>
          <h2 className="text-lg font-extrabold text-white tracking-tight mt-1">
            Central Principal de Otimização do Windows
          </h2>
          <p className="text-xs text-[#aaa] mt-0.5 max-w-2xl leading-relaxed">
            Selecione uma categoria abaixo para alternar ajustes individuais de registro, políticas de energia, buffer de periféricos e otimizações de rede.
          </p>
        </div>

        <button
          onClick={() => onApplyCategory(selectedCategoryObj.id)}
          className="bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] font-bold text-xs px-4 py-2 rounded transition shadow-sm flex items-center space-x-1.5 cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
        >
          <Zap className="h-3.5 w-3.5 fill-[#4cc2ff]" />
          <span>Aplicar Todos Desta Categoria</span>
        </button>
      </div>

      {/* Category Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-1.5">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          const appliedInCat = cat.tweaks.filter(t => t.applied).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-2.5 rounded border flex flex-col items-center justify-between text-center transition cursor-pointer ${
                isActive
                  ? 'bg-[#182a38] border-[#316a94] text-white shadow-sm'
                  : 'bg-[#161616] border-[#262626] hover:border-[#383838] text-[#888] hover:text-[#eee]'
              }`}
            >
              <div className="mb-1">{getCategoryIcon(cat.icon)}</div>
              <span className="text-[10px] font-bold leading-tight line-clamp-2">{cat.name}</span>
              <span className="text-[9px] font-mono text-[#666] mt-1">
                {appliedInCat}/{cat.tweaks.length} On
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Category Status Header */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-[#101010] border border-[#222]">
            {getCategoryIcon(selectedCategoryObj.icon)}
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{selectedCategoryObj.name}</h3>
            <p className="text-[11px] text-[#888]">{selectedCategoryObj.description}</p>
          </div>
        </div>

        {/* Filter Impact */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <Filter className="h-3 w-3 text-[#666]" />
          <span className="text-xs text-[#888] font-mono">Impacto:</span>
          {['Todos', 'Extremo', 'Alto', 'Médio'].map((impact) => (
            <button
              key={impact}
              onClick={() => setFilterImpact(impact)}
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition cursor-pointer ${
                filterImpact === impact
                  ? 'bg-[#182a38] text-[#4cc2ff] border-[#316a94]'
                  : 'bg-[#202020] text-[#888] border-[#303030] hover:text-[#ccc]'
              }`}
            >
              {impact}
            </button>
          ))}
        </div>
      </div>

      {/* Tweaks List Cards */}
      <div className="space-y-2">
        {filteredTweaks.map((tweak) => (
          <div
            key={tweak.id}
            className={`p-3.5 rounded border transition ${
              tweak.applied
                ? 'bg-[#141d17] border-[#225833]'
                : 'bg-[#161616] border-[#282828] hover:border-[#383838]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              
              {/* Info */}
              <div className="space-y-1 max-w-3xl">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <h4 className="text-xs font-bold text-white">{tweak.title}</h4>
                  
                  {/* Impact Tag */}
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase ${
                      tweak.impactLevel === 'Extremo'
                        ? 'bg-[#2d1238] text-[#d8b4fe] border-[#582173]'
                        : tweak.impactLevel === 'Alto'
                        ? 'bg-[#381212] text-[#fca5a5] border-[#732121]'
                        : 'bg-[#2d2208] text-[#fef08a] border-[#5e4710]'
                    }`}
                  >
                    Impacto {tweak.impactLevel}
                  </span>

                  {/* Status Tag */}
                  {tweak.applied && (
                    <span className="text-[9px] font-mono font-bold bg-[#102d1a] text-[#4fef8b] border border-[#1f5c32] px-1.5 py-0.2 rounded flex items-center space-x-1">
                      <Check className="h-2.5 w-2.5" />
                      <span>Ativo</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#aaa] leading-relaxed">{tweak.description}</p>

                {tweak.warning && (
                  <div className="flex items-center space-x-1.5 text-[10px] text-[#fef08a] bg-[#2d2208] border border-[#5e4710] px-2 py-0.5 rounded mt-1">
                    <AlertTriangle className="h-3 w-3 text-[#fbbf24] shrink-0" />
                    <span>{tweak.warning}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1.5 shrink-0">
                {tweak.commandPreview && (
                  <button
                    onClick={() =>
                      setShowTerminalPreview(showTerminalPreview === tweak.id ? null : tweak.id)
                    }
                    className="p-1.5 bg-[#202020] hover:bg-[#2a2a2a] text-[#888] hover:text-white rounded border border-[#333] transition cursor-pointer"
                    title="Ver Comando PowerShell / Registro"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                  </button>
                )}

                <button
                  onClick={() => onToggleTweak(tweak.id)}
                  className={`px-3 py-1.5 rounded font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 active:scale-95 ${
                    tweak.applied
                      ? 'bg-[#1f5c32] hover:bg-[#297842] text-[#4fef8b] border border-[#349c55]'
                      : 'bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] border border-[#3a3a3a]'
                  }`}
                >
                  <span>{tweak.applied ? 'Otimizado ✅' : 'Aplicar Ajuste ⚡'}</span>
                </button>
              </div>

            </div>

            {/* Terminal Command Code Preview Drawer */}
            {showTerminalPreview === tweak.id && tweak.commandPreview && (
              <div className="mt-3 pt-2 border-t border-[#262626] space-y-1">
                <span className="text-[9px] font-mono font-bold text-[#888] uppercase block">
                  Comando do Registro / PowerShell Executado no Windows:
                </span>
                <pre className="bg-[#0a0a0a] p-2.5 rounded border border-[#222] text-[10px] font-mono text-[#4cc2ff] overflow-x-auto select-all">
                  {tweak.commandPreview}
                </pre>
              </div>
            )}
          </div>
        ))}

        {filteredTweaks.length === 0 && (
          <div className="text-center py-8 text-xs text-[#666] bg-[#141414] rounded border border-[#242424]">
            Nenhum ajuste encontrado para este nível de impacto.
          </div>
        )}
      </div>
    </div>
  );
};
