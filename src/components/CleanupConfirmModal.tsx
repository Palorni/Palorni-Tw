import React from 'react';
import { X, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { CleanupItem } from '../types';

interface CleanupConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CleanupItem | null;
  onConfirmCleanup: (item: CleanupItem) => void;
}

export const CleanupConfirmModal: React.FC<CleanupConfirmModalProps> = ({
  isOpen,
  onClose,
  item,
  onConfirmCleanup
}) => {
  if (!isOpen || !item) return null;

  const formattedSize = item.estimatedSizeBytes > 0
    ? (item.estimatedSizeBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
    : 'Variável';

  return (
    <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-5 max-w-md w-full space-y-4 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-[#888] hover:text-white p-1 rounded bg-[#202020] hover:bg-[#2d2d2d] transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded bg-[#3d1a1a] border border-[#732121] text-[#fca5a5]">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Confirmar Limpeza</h3>
            <span className="text-xs text-[#fca5a5] font-mono">{item.category}</span>
          </div>
        </div>

        <div className="bg-[#111] p-3 rounded border border-[#222] space-y-2">
          <h4 className="text-xs font-bold text-white">{item.title}</h4>
          <p className="text-xs text-[#aaa] leading-relaxed">{item.description}</p>
          
          {item.estimatedSizeBytes > 0 && (
            <div className="pt-2 flex items-center justify-between border-t border-[#222] text-xs font-mono">
              <span className="text-[#888]">Espaço Estimado Liberado:</span>
              <strong className="text-[#4fef8b] text-sm">{formattedSize}</strong>
            </div>
          )}

          <div className="pt-2 text-[10px] font-mono text-[#777] bg-[#0a0a0a] p-2 rounded border border-[#1a1a1a] overflow-x-auto">
            Comando: {item.command}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-1 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] font-semibold text-xs px-3.5 py-2 rounded transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirmCleanup(item);
              onClose();
            }}
            className="bg-[#381212] hover:bg-[#521b1b] text-[#fca5a5] border border-[#732121] font-bold text-xs px-4 py-2 rounded transition cursor-pointer flex items-center space-x-1.5 active:scale-95 shadow-md"
          >
            <Trash2 className="h-3.5 w-3.5 text-[#fca5a5]" />
            <span>Executar Limpeza Agora</span>
          </button>
        </div>

      </div>
    </div>
  );
};
