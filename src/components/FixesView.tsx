import React, { useState } from 'react';
import { RotateCcw, AlertOctagon, CheckCircle2, ShieldAlert, Sparkles, Wrench } from 'lucide-react';

interface FixesViewProps {
  onRevertCategory: (categoryName: string) => void;
  onRevertAll: () => void;
  onOpenRestorePoints: () => void;
}

export const FixesView: React.FC<FixesViewProps> = ({
  onRevertCategory,
  onRevertAll,
  onOpenRestorePoints
}) => {
  const [revertedNotice, setRevertedNotice] = useState<string | null>(null);

  const handleRevertClick = (categoryName: string) => {
    onRevertCategory(categoryName);
    setRevertedNotice(`Ajustes da categoria "${categoryName}" foram revertidos com sucesso para o padrão do Windows.`);
    setTimeout(() => setRevertedNotice(null), 4000);
  };

  const handleRevertAllClick = () => {
    if (confirm('Tem certeza de que deseja reverter TODAS as otimizações aplicadas pela Palorni?')) {
      onRevertAll();
      setRevertedNotice('Todas as otimizações de registro, rede e energia foram revertidas para as configurações padrão do Windows.');
      setTimeout(() => setRevertedNotice(null), 5000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-[#2d2208] text-[#fbbf24] border border-[#5e4710] text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
            SAFETY & ROLLBACK MODULE
          </span>
          <h2 className="text-lg font-extrabold text-white tracking-tight mt-1">
            Central de Correções Rápidas e Reversão
          </h2>
          <p className="text-xs text-[#aaa] mt-0.5 max-w-2xl leading-relaxed">
            Caso encontre instabilidade em algum jogo ou precise restaurar as definições originais do sistema, você pode reverter categorias individuais ou utilizar um Ponto de Restauração.
          </p>
        </div>

        <button
          onClick={handleRevertAllClick}
          className="bg-[#381212] hover:bg-[#521b1b] text-[#fca5a5] border border-[#732121] font-bold text-xs px-4 py-2 rounded transition shadow-sm flex items-center space-x-1.5 cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5 text-[#fca5a5]" />
          <span>REVERTER TUDO PARA PADRÃO ⚠️</span>
        </button>
      </div>

      {/* Success Notice */}
      {revertedNotice && (
        <div className="bg-[#102d1a] border border-[#1f5c32] rounded p-3 flex items-center space-x-2 text-[#4fef8b] text-xs font-mono">
          <CheckCircle2 className="h-4 w-4 text-[#4fef8b] shrink-0" />
          <span>{revertedNotice}</span>
        </div>
      )}

      {/* Quick Fixes Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        
        {/* Fix FiveM */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3.5 space-y-2.5 hover:border-[#383838] transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#fbbf24] uppercase">Correção FiveM</span>
            <Wrench className="h-3.5 w-3.5 text-[#fbbf24]" />
          </div>
          <h4 className="text-xs font-bold text-white">Reverter Otimização MLD / ICMP</h4>
          <p className="text-xs text-[#888] leading-relaxed">
            Restaura as rotas padrão do protocolo ICMP e do gerenciador de mídia do Windows para permitir a conexão a servidores do FiveM.
          </p>
          <button
            onClick={() => handleRevertClick('Rede e Conexão Palorni Utility')}
            className="w-full py-1.5 bg-[#222] hover:bg-[#2d2d2d] text-[#fef08a] border border-[#5e4710] font-bold text-xs rounded transition cursor-pointer"
          >
            Reverter MLD/ICMP (Fix FiveM)
          </button>
        </div>

        {/* Fix GameDVR / Xbox */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3.5 space-y-2.5 hover:border-[#383838] transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#4cc2ff] uppercase">Serviços Xbox</span>
            <Wrench className="h-3.5 w-3.5 text-[#4cc2ff]" />
          </div>
          <h4 className="text-xs font-bold text-white">Habilitar Xbox Bar & GameDVR</h4>
          <p className="text-xs text-[#888] leading-relaxed">
            Reativa os serviços do Xbox App e a gravação de tela integrada do Windows caso precise gravar partidas.
          </p>
          <button
            onClick={() => handleRevertClick('Debloat e Remoção de Lixo do Windows')}
            className="w-full py-1.5 bg-[#222] hover:bg-[#2d2d2d] text-[#4cc2ff] border border-[#234d6e] font-bold text-xs rounded transition cursor-pointer"
          >
            Reativar GameDVR e Xbox
          </button>
        </div>

        {/* Fix Power Plans */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3.5 space-y-2.5 hover:border-[#383838] transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#c4b5fd] uppercase">Planos de Energia</span>
            <Wrench className="h-3.5 w-3.5 text-[#c4b5fd]" />
          </div>
          <h4 className="text-xs font-bold text-white">Restaurar Planos de Energia Padrão</h4>
          <p className="text-xs text-[#888] leading-relaxed">
            Executa o comando <code className="text-[#c4b5fd]">powercfg -restoredefaultschemes</code> para recuperar o plano Equilibrado do Windows.
          </p>
          <button
            onClick={() => handleRevertClick('Gerenciamento de Energia')}
            className="w-full py-1.5 bg-[#222] hover:bg-[#2d2d2d] text-[#c4b5fd] border border-[#482882] font-bold text-xs rounded transition cursor-pointer"
          >
            Restaurar Planos Padrão
          </button>
        </div>

      </div>

      {/* System Restore Point Card */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded bg-[#101010] border border-[#222] text-[#4cc2ff]">
            <RotateCcw className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Utilizar Ponto de Restauração do Windows (RSTRUI)</h3>
            <p className="text-xs text-[#888]">
              O recurso mais seguro para retornar o computador exatamente ao estado em que se encontrava antes de aplicar qualquer utilitário.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onOpenRestorePoints}
            className="bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] font-bold text-xs px-4 py-2 rounded transition cursor-pointer active:scale-95"
          >
            Abrir Gerenciador de Pontos de Restauração
          </button>
        </div>
      </div>
    </div>
  );
};
