import React from 'react';
import { X, Award, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';

interface PatchNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatchNotesModal: React.FC<PatchNotesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
          <div className="p-2 rounded bg-[#201538] border border-[#482882] text-[#c4b5fd]">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Notas de Atualização - Edição 10.0 Final</h3>
            <span className="text-xs text-[#c4b5fd] font-semibold">Palorni System Engine® • Versão Atualizada</span>
          </div>
        </div>

        {/* Changes List */}
        <div className="space-y-2 text-xs text-[#ccc]">
          <div className="bg-[#111] p-2.5 rounded border border-[#222] flex items-start space-x-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#4cc2ff] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold">Novo Plano de Energia Palorni V10:</strong> Atualização de frequências de clock e remoção completa do desuso de núcleos da CPU (Core Parking Off).
            </div>
          </div>

          <div className="bg-[#111] p-2.5 rounded border border-[#222] flex items-start space-x-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#4cc2ff] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold">Remoção Completa de Restrições Premium:</strong> Todos os ajustes de GPU, Registro e utilitário de rede estão 100% gratuitos e liberados sem assinaturas ou cobranças.
            </div>
          </div>

          <div className="bg-[#111] p-2.5 rounded border border-[#222] flex items-start space-x-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#4cc2ff] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold">Novo Perfil NVIDIA Profile Inspector V10:</strong> Perfil NIP exclusivo para otimização do painel de controle 3D com latência ultrabaixa.
            </div>
          </div>

          <div className="bg-[#111] p-2.5 rounded border border-[#222] flex items-start space-x-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#4cc2ff] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold">Leitura Inteligente de Hardware & IA:</strong> Leitor nativo que detecta modelos de CPU/GPU e recomenda otimizações específicas por inteligência artificial.
            </div>
          </div>

          <div className="bg-[#111] p-2.5 rounded border border-[#222] flex items-start space-x-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#4cc2ff] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold">Detector de Jogos & QoS com Aviso FiveM:</strong> Detecção de títulos com regras de prioridade de pacotes e opção de reversão dedicada para quem joga FiveM.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-1 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#2e1852] hover:bg-[#3d216d] text-[#c4b5fd] border border-[#582d99] font-bold text-xs px-4 py-2 rounded transition cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
