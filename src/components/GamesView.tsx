import React, { useState } from 'react';
import { Crosshair, Target, Zap, Car, Flame, Shield, CheckCircle, Search, Plus, Play, Info } from 'lucide-react';
import { InstalledGame } from '../types';

interface GamesViewProps {
  games: InstalledGame[];
  onApplyGameQoS: (game: InstalledGame) => void;
  onAddCustomGame: (gameName: string, exeName: string) => void;
}

const getGameIcon = (iconName: string) => {
  switch (iconName) {
    case 'Crosshair': return <Crosshair className="h-6 w-6 text-cyan-400" />;
    case 'Target': return <Target className="h-6 w-6 text-red-400" />;
    case 'Zap': return <Zap className="h-6 w-6 text-amber-400" />;
    case 'Car': return <Car className="h-6 w-6 text-purple-400" />;
    case 'Flame': return <Flame className="h-6 w-6 text-orange-400" />;
    case 'Shield': return <Shield className="h-6 w-6 text-emerald-400" />;
    default: return <Play className="h-6 w-6 text-blue-400" />;
  }
};

export const GamesView: React.FC<GamesViewProps> = ({
  games,
  onApplyGameQoS,
  onAddCustomGame
}) => {
  const [selectedGame, setSelectedGame] = useState<InstalledGame | null>(games[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGameName, setNewGameName] = useState('');
  const [newExeName, setNewExeName] = useState('');

  const filteredGames = games.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.executable.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameName || !newExeName) return;
    let exeClean = newExeName.trim();
    if (!exeClean.toLowerCase().endsWith('.exe')) {
      exeClean += '.exe';
    }
    onAddCustomGame(newGameName, exeClean);
    setNewGameName('');
    setNewExeName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-[#1e1a38] text-[#c4b5fd] border border-[#44386b] text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
            DETECTOR DE JOGOS & QOS
          </span>
          <h2 className="text-lg font-extrabold text-white tracking-tight mt-1">
            Jogos Detectados e Perfis de Latência
          </h2>
          <p className="text-xs text-[#aaa] mt-0.5 max-w-2xl leading-relaxed">
            Selecione qualquer jogo instalado para aplicar a política de Priorização de Pacotes QoS da Palorni (DSCP 46) no Windows e otimizar a resposta dos periféricos.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#222] hover:bg-[#2d2d2d] text-white font-semibold text-xs px-3.5 py-2 rounded border border-[#3d3d3d] transition flex items-center space-x-1.5 cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
        >
          <Plus className="h-3.5 w-3.5 text-[#4cc2ff]" />
          <span>Adicionar Jogo Manualmente</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#666]" />
        <input
          type="text"
          placeholder="Buscar jogo detectado ou executável (ex: Fortnite, cs2.exe)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-[#161616] border border-[#2a2a2a] rounded text-xs text-[#eee] placeholder-[#666] focus:outline-none focus:border-[#4cc2ff] font-mono transition"
        />
      </div>

      {/* Main Grid: Game List & Selected Game Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        
        {/* Game Cards List */}
        <div className="lg:col-span-1 space-y-2 max-h-[580px] overflow-y-auto pr-1 no-scrollbar">
          {filteredGames.map((game) => {
            const isSelected = selectedGame?.id === game.id;
            return (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className={`p-3 rounded border transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#182a38] border-[#31698e] shadow-sm'
                    : 'bg-[#161616] border-[#262626] hover:border-[#3a3a3a]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded bg-[#101010] border border-[#222]">
                    {getGameIcon(game.iconName)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{game.name}</h4>
                    <span className="text-[10px] font-mono text-[#888] bg-[#202020] px-1.5 py-0.2 rounded">
                      {game.platform}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold text-[#4cc2ff]">
                  QoS 46
                </span>
              </div>
            );
          })}

          {filteredGames.length === 0 && (
            <div className="text-center py-6 text-xs text-[#666] bg-[#141414] rounded border border-[#242424]">
              Nenhum jogo encontrado.
            </div>
          )}
        </div>

        {/* Selected Game Detailed Inspector */}
        <div className="lg:col-span-2">
          {selectedGame ? (
            <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 space-y-4">
              
              {/* Game Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#222] pb-3 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded bg-[#101010] border border-[#2a2a2a]">
                    {getGameIcon(selectedGame.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">{selectedGame.name}</h3>
                    <p className="text-xs text-[#888]">
                      Gênero: <span className="text-[#ccc]">{selectedGame.genre}</span> • Plataforma: <span className="text-[#4cc2ff] font-semibold">{selectedGame.platform}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onApplyGameQoS(selectedGame)}
                  className="bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] font-bold text-xs px-4 py-2 rounded transition shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95"
                >
                  <Zap className="h-3.5 w-3.5 fill-[#4cc2ff]" />
                  <span>Aplicar Prioridade QoS (DSCP 46)</span>
                </button>
              </div>

              {/* Executable Path Info */}
              <div className="bg-[#111] border border-[#222] rounded p-3 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#888] uppercase">Caminho do Executável do Jogo:</span>
                <div className="font-mono text-xs text-[#4cc2ff] bg-[#0a0a0a] p-2 rounded border border-[#1f1f1f] break-all select-all">
                  {selectedGame.path}\<strong className="text-white">{selectedGame.executable}</strong>
                </div>
              </div>

              {/* Recommended Tweaks List for Game */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#ddd] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                  <CheckCircle className="h-3.5 w-3.5 text-[#4fef8b]" />
                  <span>Ajustes Recomendados pela Palorni para {selectedGame.name}:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedGame.recommendedTweaks.map((tweak, idx) => (
                    <div key={idx} className="bg-[#111] border border-[#222] rounded p-2.5 text-xs text-[#ccc] flex items-start space-x-2 font-sans">
                      <span className="text-[#4cc2ff] font-bold">•</span>
                      <span>{tweak}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FiveM Warning Notice if applicable */}
              {selectedGame.id === 'fivem' && (
                <div className="bg-[#2d2208] border border-[#5e4710] rounded p-3 flex items-start space-x-2.5 text-xs text-[#fef08a]">
                  <Info className="h-4 w-4 text-[#fbbf24] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#fbbf24] font-bold">Aviso Especial FiveM / Roleplay:</strong> O ajuste MLD/ICMP pode interferir ao carregar pacotes de servidores com antibot estrito. Utilize a aba de Correções se houver erros de conexão.
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-12 text-center text-xs text-[#666]">
              Selecione um jogo na lista ao lado para ver o diagnóstico.
            </div>
          )}
        </div>

      </div>

      {/* Modal: Add Custom Game */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-5 max-w-md w-full space-y-3 shadow-2xl">
            <h3 className="text-base font-bold text-white">Adicionar Jogo Personalizado</h3>
            <p className="text-xs text-[#888]">
              Digite o nome do jogo e o arquivo executável (exemplo: <code className="text-[#4cc2ff]">gta5.exe</code>).
            </p>

            <form onSubmit={handleAddGameSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#ccc] block mb-1">Nome do Jogo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Apex Legends"
                  value={newGameName}
                  onChange={(e) => setNewGameName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#111] border border-[#2a2a2a] rounded text-xs text-white focus:outline-none focus:border-[#4cc2ff]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#ccc] block mb-1">Executável (.exe):</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: r5apex.exe"
                  value={newExeName}
                  onChange={(e) => setNewExeName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#111] border border-[#2a2a2a] rounded text-xs text-white focus:outline-none focus:border-[#4cc2ff] font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] text-xs font-semibold rounded cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] text-xs font-bold rounded cursor-pointer"
                >
                  Adicionar & Criar Regra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
