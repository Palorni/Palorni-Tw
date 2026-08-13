import React from 'react';
import { X, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { PresetProfile, TweakItem } from '../types';

interface PresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: PresetProfile | null;
  allTweaks: TweakItem[];
  onConfirmApplyPreset: (preset: PresetProfile) => void;
}

export const PresetModal: React.FC<PresetModalProps> = ({
  isOpen,
  onClose,
  preset,
  allTweaks,
  onConfirmApplyPreset
}) => {
  if (!isOpen || !preset) return null;

  // Find tweak objects matched to the preset items
  const matchedTweaks = preset.tweakValues.map(pv => {
    const tweakObj = allTweaks.find(t => t.id === pv.tweakId);
    return {
      pv,
      tweakObj
    };
  }).filter(item => item.tweakObj !== undefined);

  return (
    <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-5 max-w-xl w-full space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-[#888] hover:text-white p-1 rounded bg-[#202020] hover:bg-[#2d2d2d] transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded bg-[#1e2e3d] border border-[#316a94] text-[#4cc2ff]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white">Aplicar Preset: {preset.name}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#234d6e] text-[#4cc2ff] font-bold">
                {preset.badge}
              </span>
            </div>
            <p className="text-xs text-[#aaa] mt-0.5">{preset.description}</p>
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-[#111] p-3 rounded border border-[#222] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#888] font-mono">
            <span>Ajustes inclusos neste preset:</span>
            <strong className="text-[#4cc2ff]">{matchedTweaks.length} alterações ativas</strong>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {matchedTweaks.map(({ pv, tweakObj }) => (
              <div key={pv.tweakId} className="bg-[#181818] border border-[#282828] p-2.5 rounded text-xs flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Sliders className="h-3.5 w-3.5 text-[#4cc2ff] shrink-0" />
                  <span className="font-semibold text-white">{tweakObj?.title}</span>
                </div>
                <div className="text-right shrink-0 font-mono text-[11px]">
                  <span className="text-[#888]">{tweakObj?.currentValue || 'Atual'}</span>
                  <span className="text-[#888] mx-1.5">➔</span>
                  <span className="text-[#4fef8b] font-bold">{pv.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Footer & Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <span className="text-[11px] text-[#888]">
            Todas as alterações podem ser revertidas individualmente depois.
          </span>
          
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onClose}
              className="bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] font-semibold text-xs px-3.5 py-2 rounded transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirmApplyPreset(preset);
                onClose();
              }}
              className="bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] font-bold text-xs px-4 py-2 rounded transition cursor-pointer flex items-center space-x-1.5 active:scale-95 shadow-md"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#4cc2ff]" />
              <span>Confirmar & Aplicar Preset</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
