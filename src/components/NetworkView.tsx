import React, { useState } from 'react';
import { Wifi, Activity, Zap, Radio, Globe, Shield, RefreshCw, CheckCircle2 } from 'lucide-react';

interface NetworkViewProps {
  onApplyAllNetwork: () => void;
  onRunPingTest: (region: string) => Promise<number>;
}

const FORTNITE_SERVERS = [
  { id: 'eu', name: 'Europa (Frankfurt)', host: 'ping-eu.ds.on.epicgames.com' },
  { id: 'nae', name: 'América do Norte Leste (NA East)', host: 'ping-nae.ds.on.epicgames.com' },
  { id: 'nac', name: 'América do Norte Central (NA Central)', host: 'ping-nac.ds.on.epicgames.com' },
  { id: 'naw', name: 'América do Norte Oeste (NA West)', host: 'ping-naw.ds.on.epicgames.com' },
  { id: 'br', name: 'Brasil (São Paulo / Rio)', host: 'ping-br.ds.on.epicgames.com' },
  { id: 'asia', name: 'Ásia (Tóquio)', host: 'ping-asia.ds.on.epicgames.com' },
  { id: 'me', name: 'Oriente Médio (Mormugao)', host: 'ping-me.ds.on.epicgames.com' },
  { id: 'oce', name: 'Oceania (Sydney)', host: 'ping-oce.ds.on.epicgames.com' }
];

export const NetworkView: React.FC<NetworkViewProps> = ({
  onApplyAllNetwork,
  onRunPingTest
}) => {
  const [testingPing, setTestingPing] = useState<string | null>(null);
  const [pingResults, setPingResults] = useState<Record<string, number>>({});

  const handleTestServer = async (server: typeof FORTNITE_SERVERS[0]) => {
    setTestingPing(server.id);
    const ms = await onRunPingTest(server.host);
    setPingResults(prev => ({ ...prev, [server.id]: ms }));
    setTestingPing(null);
  };

  const handleTestAllServers = async () => {
    for (const server of FORTNITE_SERVERS) {
      await handleTestServer(server);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-[#162736] text-[#4cc2ff] border border-[#234d6e] text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
            NETWORK & LATENCY ENGINE
          </span>
          <h2 className="text-lg font-extrabold text-white tracking-tight mt-1">
            Otimização de Ping & Teste Real Fortnite
          </h2>
          <p className="text-xs text-[#aaa] mt-0.5 max-w-2xl leading-relaxed">
            Configure o TCPNoDelay, desative o bloqueio de largura de banda do Windows e faça o teste de latência real comunicando-se diretamente com os servidores dedicados da Epic Games.
          </p>
        </div>

        <button
          onClick={onApplyAllNetwork}
          className="bg-[#1e3a4e] hover:bg-[#284d68] text-[#4cc2ff] border border-[#316a94] font-bold text-xs px-4 py-2 rounded transition shadow-sm flex items-center space-x-1.5 cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
        >
          <Zap className="h-3.5 w-3.5 fill-[#4cc2ff]" />
          <span>Aplicar Todos os Ajustes de Rede (1-14)</span>
        </button>
      </div>

      {/* Real Fortnite Server Ping Inspector */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#222] pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded bg-[#101010] border border-[#222] text-[#4cc2ff]">
              <Radio className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Ping Real de Servidores Fortnite</h3>
              <p className="text-[11px] text-[#888]">Pinge diretamente os endpoints Epic Games Datacenter (amostragem direta)</p>
            </div>
          </div>

          <button
            onClick={handleTestAllServers}
            className="bg-[#222] hover:bg-[#2d2d2d] text-[#ccc] text-xs font-semibold px-3 py-1.5 rounded border border-[#383838] transition flex items-center space-x-1.5 cursor-pointer active:scale-95 shrink-0"
          >
            <RefreshCw className="h-3 w-3 text-[#4cc2ff]" />
            <span>Testar Todas as Regiões</span>
          </button>
        </div>

        {/* Server Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {FORTNITE_SERVERS.map((server) => {
            const result = pingResults[server.id];
            const isLoading = testingPing === server.id;

            return (
              <div
                key={server.id}
                className="bg-[#111] border border-[#222] rounded p-3 flex flex-col justify-between space-y-2 hover:border-[#333] transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-white">{server.name}</span>
                    <Globe className="h-3 w-3 text-[#666]" />
                  </div>
                  <span className="text-[10px] text-[#666] font-mono block truncate" title={server.host}>
                    {server.host}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-[#222]">
                  <div className="text-xs font-mono font-extrabold">
                    {isLoading ? (
                      <span className="text-xs text-[#4cc2ff] flex items-center space-x-1">
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span>Pingando...</span>
                      </span>
                    ) : result !== undefined ? (
                      <span className={result < 35 ? 'text-[#4fef8b]' : result < 70 ? 'text-[#fbbf24]' : 'text-[#ccc]'}>
                        {result} ms
                      </span>
                    ) : (
                      <span className="text-xs text-[#666]">Não testado</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleTestServer(server)}
                    disabled={isLoading}
                    className="text-[10px] font-mono font-bold text-[#4cc2ff] hover:text-[#78d3ff] bg-[#162736] px-2 py-0.5 rounded border border-[#234d6e] transition cursor-pointer disabled:opacity-50"
                  >
                    Testar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network Core Adjustments List */}
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5 font-mono">
          <Shield className="h-3.5 w-3.5 text-[#4cc2ff]" />
          <span>Ajustes Específicos de Protocolo da Palorni</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#ccc]">
          <div className="bg-[#111] p-3 rounded border border-[#222] space-y-1">
            <strong className="text-white font-bold block text-xs">1. MaxUserPort & TcpTimedWaitDelay</strong>
            <p className="text-[#888]">Expande portas efémeras para 65534 e reduz o tempo de fechamento de conexões inativas para 30s.</p>
          </div>

          <div className="bg-[#111] p-3 rounded border border-[#222] space-y-1">
            <strong className="text-white font-bold block text-xs">2. Algoritmo de Nagle Desativado</strong>
            <p className="text-[#888]">Força envio instantâneo de pacotes de tiros/movimentos sem enfileiramento na placa de rede.</p>
          </div>

          <div className="bg-[#111] p-3 rounded border border-[#222] space-y-1">
            <strong className="text-white font-bold block text-xs">3. Regra QoS DSCP Value = 46</strong>
            <p className="text-[#888]">Atribui prioridade máxima de roteamento aos pacotes do jogo no roteador e no provedor.</p>
          </div>

          <div className="bg-[#111] p-3 rounded border border-[#222] space-y-1">
            <strong className="text-white font-bold block text-xs">4. Desativar Probing Ativo (NlaSvc)</strong>
            <p className="text-[#888]">Bloqueia pings contínuos de verificação de internet da Microsoft que roubam frequência de banda.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
