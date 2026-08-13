import React, { useState } from 'react';
import { X, RotateCcw, CheckCircle2, ShieldCheck, Plus, History } from 'lucide-react';
import { RestorePoint } from '../types';

interface RestorePointModalProps {
  isOpen: boolean;
  onClose: () => void;
  restorePoints: RestorePoint[];
  onCreateRestorePoint: (name: string) => void;
  onApplyRestorePoint: (point: RestorePoint) => void;
}

export const RestorePointModal: React.FC<RestorePointModalProps> = ({
  isOpen,
  onClose,
  restorePoints,
  onCreateRestorePoint,
  onApplyRestorePoint
}) => {
  const [newPointName, setNewPointName] = useState('');
  const [creating, setCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newPointName.trim() || 'Ponto de Restauração Palorni Free Utility';
    setCreating(true);
    setTimeout(() => {
      onCreateRestorePoint(name);
      setCreating(false);
      setNewPointName('');
      setSuccessMessage(`Ponto de restauração "${name}" criado com sucesso!`);
      setTimeout(() => setSuccessMessage(null), 3500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-5 max-w-lg w-full space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-[#888] hover:text-white p-1 rounded bg-[#202020] hover:bg-[#2d2d2d] transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded bg-[#162736] border border-[#234d6e] text-[#4cc2ff]">
            <RotateCcw className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Pontos de Restauração do Windows</h3>
            <span className="text-xs text-[#888]">Proteção do Registro antes de aplicar otimizações</span>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="bg-[#102d1a] border border-[#1f5c32] rounded p-2.5 flex items-center space-x-2 text-[#4fef8b] text-xs font-mono">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#4fef8b] shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Create Form */}
        <form onSubmit={handleCreate} className="bg-[#111] p-3 rounded border border-[#222] space-y-2">
          <label className="text-xs font-semibold text-[#ccc] block">Criar Novo Ponto de Restauração:</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: Antes das otimizações Palorni V10"
              value={newPointName}
              onChange={(e) => setNewPointName(e.target.value)}
              className="flex-1 px-2.5 py-1.5 bg-[#0a0a0a] border border-[#222] rounded text-xs text-white focus:outline-none focus:border-[#4cc2ff]"
            />
            <button
              type="submit"
              disabled={creating}
              className="bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] font-bold text-xs px-3.5 py-1.5 rounded transition flex items-center space-x-1 cursor-pointer disabled:opacity-50"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{creating ? 'Criando...' : 'Criar Ponto'}</span>
            </button>
          </div>
        </form>

        {/* Existing Points List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#aaa] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
            <History className="h-3.5 w-3.5 text-[#4cc2ff]" />
            <span>Histórico de Pontos do Sistema:</span>
          </h4>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {restorePoints.map((pt) => (
              <div
                key={pt.id}
                className="bg-[#111] border border-[#222] rounded p-3 flex items-center justify-between hover:border-[#333] transition"
              >
                <div>
                  <h5 className="text-xs font-bold text-white">{pt.name}</h5>
                  <span className="text-[10px] text-[#888] font-mono">{pt.timestamp} • {pt.tweaksAppliedCount} ajustes ativos</span>
                </div>

                <button
                  onClick={() => onApplyRestorePoint(pt)}
                  className="bg-[#222] hover:bg-[#2d2d2d] text-[#4cc2ff] text-xs font-semibold px-2.5 py-1 rounded border border-[#383838] transition cursor-pointer"
                >
                  Restaurar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-1 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] font-semibold text-xs px-4 py-1.5 rounded transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
