import { TweakCategory } from '../types';

export const PALORNI_TWEAK_CATEGORIES: TweakCategory[] = [
  {
    id: 'general',
    name: 'Otimizações Gerais do Sistema',
    icon: 'Cpu',
    description: 'Ajustes no Registro, agendador do Windows, tempo de resposta e prioridades de processo.',
    tweaks: [
      {
        id: 'win32_priority',
        categoryId: 'general',
        title: 'Win32PrioritySeparation = 38 (0x26)',
        description: 'Concede maior fatia de tempo e prioridade ao aplicativo em primeiro plano (seu jogo).',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming', 'HighEnd', 'LowEnd'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v "Win32PrioritySeparation" /t REG_DWORD /d "38" /f'
      },
      {
        id: 'dynamic_tick_hpet',
        categoryId: 'general',
        title: 'Desativar Dynamic Tick & HPET (Timer de Alta Precisão)',
        description: 'Remove micro-engasgos eliminando interrupções do relógio sintético do sistema.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'bcdedit /set Disabledynamictick yes && bcdedit /deletevalue useplatformclock && bcdedit /set useplatformtick yes'
      },
      {
        id: 'process_kill_timeout',
        categoryId: 'general',
        title: 'Reduzir Tempo de Encerramento de Processos Travados',
        description: 'Encerra aplicativos travados em 1 segundo e reduz o atraso nos menus do Windows.',
        impactLevel: 'Baixo',
        applied: false,
        recommendedFor: ['Gaming', 'LowEnd'],
        commandPreview: 'reg add "HKCU\\Control Panel\\Desktop" /v "WaitToKillAppTimeout" /t REG_SZ /d "1000" /f'
      },
      {
        id: 'system_responsiveness',
        categoryId: 'general',
        title: 'Ajustar SystemResponsiveness para 10%',
        description: 'Reserva 90% dos recursos da CPU para tarefas ativas e jogos ao invés de serviços de fundo.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d "10" /f'
      },
      {
        id: 'disable_autologgers',
        categoryId: 'general',
        title: 'Desativar Autologgers & Rastreamento de Erros',
        description: 'Evita gravações constantes de logs em disco provocados por diagnósticos silenciosos.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['LowEnd', 'SSD', 'HDD'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\WMI\\Autologger\\DiagLog" /v "Start" /t REG_DWORD /d 0 /f'
      }
    ]
  },
  {
    id: 'power',
    name: 'Gerenciamento de Energia',
    icon: 'Zap',
    description: 'Importe o Plano de Energia Palorni V10 e desative todas as economias de energia prejudiciais aos jogos.',
    tweaks: [
      {
        id: 'palorni_power_plan_v10',
        categoryId: 'power',
        title: 'Aplicar Plano Palorni Max Performance V10',
        description: 'Plano otimizado pela Palorni que elimina o Core Parking, desativa o throttling e maximiza os clocks da CPU.',
        impactLevel: 'Extremo',
        applied: false,
        recommendedFor: ['Gaming', 'HighEnd', 'LowEnd'],
        commandPreview: 'powercfg -import "C:\\Palorni\\Palorni_Free_Power_Plan_V10.pow" && powercfg /setactive SCHEME_PALORNI'
      },
      {
        id: 'disable_power_throttling',
        categoryId: 'power',
        title: 'Desativar Power Throttling do Windows',
        description: 'Impede que o Windows reduza a frequência da CPU ao detectar tarefas intensas prolongadas.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling" /v "PowerThrottlingOff" /t REG_DWORD /d 1 /f'
      },
      {
        id: 'disable_fast_startup_hibernation',
        categoryId: 'power',
        title: 'Desativar Hibernação e Fast Startup',
        description: 'Libera espaço no SSD/HDD (arquivo hiberfil.sys) e garante uma inicialização 100% limpa da memória RAM.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['SSD', 'HDD', 'LowEnd'],
        commandPreview: 'powercfg /h off && reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power" /v "HiberbootEnabled" /t REG_DWORD /d 0 /f'
      },
      {
        id: 'disable_usb_selective_suspend',
        categoryId: 'power',
        title: 'Desativar Suspensão Seletiva de Portas USB',
        description: 'Garante alimentação constante aos seus periféricos (mouse/teclado), prevenindo desconexões ou latência.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\USB" /v "DisableSelectiveSuspend" /t REG_DWORD /d 1 /f'
      }
    ]
  },
  {
    id: 'kbm',
    name: 'Mouse e Teclado (KBM)',
    icon: 'Mouse',
    description: 'Elimine a aceleração do mouse, ajuste o buffer de entrada e priorize os drivers de entrada.',
    tweaks: [
      {
        id: 'csrss_high_priority',
        categoryId: 'kbm',
        title: 'Prioridade Alta de CPU/IO para CSRSS',
        description: 'Define prioridade em tempo real para o processo do subsistema Windows que gerencia cliques e teclas.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\csrss.exe\\PerfOptions" /v "CpuPriorityClass" /t REG_DWORD /d "4" /f'
      },
      {
        id: 'mouse_1to1_pixel',
        categoryId: 'kbm',
        title: 'Precisão de Pixel 1:1 e Desativar Aceleração',
        description: 'Remove a aceleração suave do Windows (Enhance Pointer Precision) garantindo memória muscular perfeita.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKCU\\Control Panel\\Mouse" /v "MouseSpeed" /t REG_SZ /d "0" /f && reg add "HKCU\\Control Panel\\Mouse" /v "MouseSensitivity" /t REG_SZ /d "10" /f'
      },
      {
        id: 'kbm_queue_size',
        categoryId: 'kbm',
        title: 'Otimizar Tamanho da Fila de Dados (MouseDataQueueSize)',
        description: 'Ajusta o buffer de memória dos drivers mouclass e kbdclass de 100 para 65 (Ideal para CPUs modernas).',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['HighEnd', 'Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\mouclass\\Parameters" /v "MouseDataQueueSize" /t REG_DWORD /d "65" /f'
      },
      {
        id: 'keyboard_repeat_rate',
        categoryId: 'kbm',
        title: 'Maximizar Taxa de Repetição do Teclado',
        description: 'Define KeyboardDelay = 0 e KeyboardSpeed = 31 para resposta instantânea no pressionamento continuo de teclas.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKCU\\Control Panel\\Keyboard" /v "KeyboardDelay" /t REG_SZ /d "0" /f && reg add "HKCU\\Control Panel\\Keyboard" /v "KeyboardSpeed" /t REG_SZ /d "31" /f'
      }
    ]
  },
  {
    id: 'gpu',
    name: 'Otimizações de GPU',
    icon: 'Monitor',
    description: 'Perfis otimizados de placa de vídeo para NVIDIA, AMD Radeon e Intel Graphics.',
    tweaks: [
      {
        id: 'nvidia_inspector_palorni',
        categoryId: 'gpu',
        title: 'Aplicar Perfil Palorni NIP (NVIDIA Profile Inspector)',
        description: 'Ajusta Modo de Gerenciamento de Energia para Desempenho Máximo, desativa G-Sync redundante e otimiza Shaders.',
        impactLevel: 'Extremo',
        applied: false,
        recommendedFor: ['NVIDIA', 'Gaming'],
        commandPreview: 'C:\\Palorni\\NvidiaProfileInspector.exe C:\\Palorni\\Palorni_Free_NVPI_V10.nip'
      },
      {
        id: 'nvidia_contiguous_memory',
        categoryId: 'gpu',
        title: 'Alocação de Memória Contígua para GPU NVIDIA',
        description: 'Força o driver NVIDIA a alocar blocos de memória do sistema sem fragmentação para frames mais estáveis.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['NVIDIA', 'Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000" /v "PreferSystemMemoryContiguous" /t REG_DWORD /d 1 /f'
      },
      {
        id: 'amd_disable_ulps_aspm',
        categoryId: 'gpu',
        title: 'Desativar ULPS & ASPM (AMD Radeon)',
        description: 'Impede que GPUs AMD entrem em estado de hibernação ultra-profunda e eliminem micro-stuttering.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['AMD', 'Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000" /v "EnableUlps" /t REG_DWORD /d 0 /f'
      },
      {
        id: 'disable_hdcp',
        categoryId: 'gpu',
        title: 'Desativar Proteção de Mídia HDCP na Placa de Vídeo',
        description: 'Remove a verificação contínua de criptografia DRM do monitor para liberar ciclos de processamento de GPU.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000" /v "RMHdcpKeyglobZero" /t REG_DWORD /d 1 /f'
      }
    ]
  },
  {
    id: 'cpu',
    name: 'Otimizações de Processador (CPU)',
    icon: 'Activity',
    description: 'Ajustes específicos para arquiteturas AMD Ryzen e Intel Core (C-States, Park e Agendador).',
    tweaks: [
      {
        id: 'disable_core_parking',
        categoryId: 'cpu',
        title: 'Desativar Core Parking Totalmente',
        description: 'Mantém 100% dos núcleos e threads ativos e prontos para processar frames sem latência de acionamento.',
        impactLevel: 'Extremo',
        applied: false,
        recommendedFor: ['Gaming', 'AMD', 'Intel'],
        commandPreview: 'powercfg -setacvalueindex scheme_current sub_processor CPMINCORES 100 && powercfg /setactive SCHEME_CURRENT'
      },
      {
        id: 'disable_cstates',
        categoryId: 'cpu',
        title: 'Desativar C-States e Sleep de Processador',
        description: 'Previne variações de voltagem e quedas de frequência da CPU durante a gameplay.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming', 'HighEnd'],
        warning: 'Não recomendado para notebooks sem refrigeração adequada.',
        commandPreview: 'powercfg -setacvalueindex scheme_current sub_sleep standbyidle 0'
      },
      {
        id: 'disable_power_telemetry',
        categoryId: 'cpu',
        title: 'Desativar Telemetria de Energia e Rastreamento de Uso',
        description: 'Remove serviços de amostragem de gasto energético que monitoram o uso de aplicações.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['Gaming', 'LowEnd'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\EnergyEstimation\\TaggedEnergy" /v "DisableTaggedEnergyLogging" /t REG_DWORD /d 1 /f'
      }
    ]
  },
  {
    id: 'network',
    name: 'Rede e Conexão Palorni Utility',
    icon: 'Wifi',
    description: 'Ajustes no protocolo TCP/IP, prioridade de pacotes DNS, algoritmo Nagle e otimização QoS por jogo.',
    tweaks: [
      {
        id: 'net_dns_priorities',
        categoryId: 'network',
        title: 'Otimizar Prioridade de Resolução DNS',
        description: 'Ajusta DnsPriority = 6 e HostsPriority = 5 no registro para resolver endereços de servidores de jogos mais rápido.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\ServiceProvider" /v "DnsPriority" /t REG_DWORD /d 6 /f'
      },
      {
        id: 'net_tcp_nodelay_ack',
        categoryId: 'network',
        title: 'Desativar Algoritmo Nagle (TCPNoDelay = 1 & TcpAckFrequency = 1)',
        description: 'Envia pacotes de rede imediatamente sem aguardar acúmulo no buffer, reduzindo o ping drasticamente.',
        impactLevel: 'Extremo',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{GUID}" /v "TCPNoDelay" /t REG_DWORD /d 1 /f'
      },
      {
        id: 'net_throttling_index',
        categoryId: 'network',
        title: 'Desativar Limitação de Largura de Banda (NetworkThrottlingIndex)',
        description: 'Remove a limitação nativa do Windows que limita a taxa de transferência de rede durante a execução de mídias/jogos.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d 0xffffffff /f'
      },
      {
        id: 'net_mld_icmp_opt',
        categoryId: 'network',
        title: 'Otimizar MLD & ICMP (Latência Mínima)',
        description: 'Desativa relatórios de eventos e redirects do ICMP para economizar overhead do adaptador de rede.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming'],
        warning: 'Aviso: Este ajuste pode impedir o funcionamento do FiveM. Se você joga FiveM, utilize a opção de reversão exclusiva!',
        commandPreview: 'netsh int ip set global icmpredirects=disabled && netsh int tcp set global chimney=enabled'
      },
      {
        id: 'net_nic_ethernet_opt',
        categoryId: 'network',
        title: 'Otimizar Placa de Rede Ethernet (Desativar Green Ethernet)',
        description: 'Desativa economia de energia no cabo de rede, aumenta buffers de recepção para 1024 e transmissão para 2048.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming', 'HighEnd'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\0000" /v "EnableGreenEthernet" /t REG_SZ /d 0 /f'
      }
    ]
  },
  {
    id: 'memory',
    name: 'Memória RAM',
    icon: 'HardDrive',
    description: 'Liberar espaço em RAM, desativar Paging Executive e ajustar limite SvcHost por capacidade.',
    tweaks: [
      {
        id: 'svchost_split_threshold',
        categoryId: 'memory',
        title: 'Ajustar SvcHostSplitThreshold para o Total de RAM',
        description: 'Agrupa ou separa processos do Windows dinamicamente conforme a quantidade exata de gigabytes da sua memória.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming', 'LowEnd', 'HighEnd'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control" /v "SvcHostSplitThresholdInKB" /t REG_DWORD /d "16777216" /f'
      },
      {
        id: 'disable_paging_executive',
        categoryId: 'memory',
        title: 'Manter Núcleo do Windows em RAM (DisablePagingExecutive)',
        description: 'Força o sistema operacional a manter arquivos executáveis na RAM em vez de paginá-los no disco.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['HighEnd', 'Gaming'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "DisablePagingExecutive" /t REG_DWORD /d 1 /f'
      },
      {
        id: 'disable_memory_compression',
        categoryId: 'memory',
        title: 'Desativar Compressão de Memória (Sistemas de 16GB+)',
        description: 'Evita ciclos contínuos de uso de CPU comprimindo páginas na RAM quando há memória abundante disponível.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['HighEnd'],
        commandPreview: 'PowerShell -Command "Disable-MMAgent -MemoryCompression"'
      }
    ]
  },
  {
    id: 'debloat',
    name: 'Debloat e Remoção de Lixo do Windows',
    icon: 'Trash2',
    description: 'Desative GameDVR, Telemetria, Cortanas/Copilot, Bing e serviços irrelevantes.',
    tweaks: [
      {
        id: 'disable_gamedvr_xbox',
        categoryId: 'debloat',
        title: 'Desativar GameDVR e Gravação em Segundo Plano',
        description: 'Elimina o consumo de FPS provocado pelo recurso de gravação constante do Xbox Game Bar.',
        impactLevel: 'Extremo',
        applied: false,
        recommendedFor: ['Gaming', 'LowEnd', 'HighEnd'],
        commandPreview: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f'
      },
      {
        id: 'disable_telemetry_ceip',
        categoryId: 'debloat',
        title: 'Desativar Telemetria CEIP & Tarefas Agendadas de Coleta',
        description: 'Bloqueia o envio silencioso de estatísticas de uso para os servidores da Microsoft.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['Gaming', 'LowEnd'],
        commandPreview: 'schtasks /change /tn "\\Microsoft\\Windows\\Customer Experience Improvement Program\\Consolidator" /Disable'
      },
      {
        id: 'disable_cortana_copilot',
        categoryId: 'debloat',
        title: 'Desinstalar Cortana e Microsoft Copilot',
        description: 'Remove completamente os assistentes virtuais pré-instalados e seus processos residentes na RAM.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['Gaming', 'LowEnd'],
        commandPreview: 'Powershell -Command "Get-AppxPackage Microsoft.Windows.Ai.Copilot.Provider | Remove-AppxPackage"'
      },
      {
        id: 'disable_print_spooler_maps',
        categoryId: 'debloat',
        title: 'Desativar Serviços de Impressão e Mapas Offline',
        description: 'Desativa o Spooler de Impressão e o gerador de mapas quando não utilizados no PC de jogos.',
        impactLevel: 'Baixo',
        applied: false,
        recommendedFor: ['Gaming'],
        commandPreview: 'sc config Spooler start= disabled && sc config MapsBroker start= disabled'
      }
    ]
  },
  {
    id: 'storage',
    name: 'Armazenamento (SSD / NVMe / HDD)',
    icon: 'Database',
    description: 'Otimização de NTFS, eliminação do tempo de acesso curto e ajuste de gravação do buffer.',
    tweaks: [
      {
        id: 'storage_trim_opt',
        categoryId: 'storage',
        title: 'Executar ReTrim / Otimização de Volume SSD',
        description: 'Informa ao controlador do SSD quais blocos de memória estão limpos para escrita ultra-rápida.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['SSD'],
        commandPreview: 'PowerShell -Command "Optimize-Volume -DriveLetter C -ReTrim"'
      },
      {
        id: 'disable_write_cache_flushing',
        categoryId: 'storage',
        title: 'Desativar Limpeza de Buffer de Gravação de Disco',
        description: 'Aumenta significativamente a velocidade de leitura/escrita mantendo dados em cache rápido.',
        impactLevel: 'Alto',
        applied: false,
        recommendedFor: ['SSD', 'HighEnd'],
        commandPreview: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Enum\\...\\Disk" /v "UserWriteCacheSetting" /t REG_DWORD /d 1 /f'
      },
      {
        id: 'ntfs_memory_mft',
        categoryId: 'storage',
        title: 'Otimizar Zona MFT e Uso de Memória do NTFS',
        description: 'Reserva mais espaço na tabela de arquivos NTFS para acelerar a busca de arquivos de jogos pesados.',
        impactLevel: 'Médio',
        applied: false,
        recommendedFor: ['Gaming', 'SSD', 'HDD'],
        commandPreview: 'fsutil behavior set memoryusage 2 && fsutil behavior set mftzone 4'
      }
    ]
  }
];
