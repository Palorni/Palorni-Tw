import { TweakItem, CleanupItem, PresetProfile } from '../types';

export const WIN_TWEAK_GROUPS = [
  { id: 'all', name: 'Todos os Tweaks' },
  { id: 'favorites', name: 'Meus Favoritos ⭐' },
  { id: 'taskbar', name: '1. Barra de Tarefas' },
  { id: 'start_menu', name: '2. Menu Iniciar' },
  { id: 'explorer', name: '3. Explorador de Arquivos' },
  { id: 'context_menu', name: '4. Menu de Contexto' },
  { id: 'win_ui', name: '5. Interface do Windows' },
  { id: 'privacy', name: '6. Privacidade & Dados' },
  { id: 'notifications', name: '7. Notificações' },
  { id: 'mouse', name: '8. Mouse & Ponteiro' },
  { id: 'keyboard', name: '9. Teclado' },
  { id: 'desktop', name: '10. Área de Trabalho' },
  { id: 'updates', name: '11. Windows Update' },
  { id: 'cleanup', name: '12. Limpeza do Sistema' },
  { id: 'shortcuts', name: '13. Atalhos do Windows' },
];

export const INITIAL_WIN_TWEAKS: TweakItem[] = [
  // --- 1. TASKBAR ---
  {
    id: 'tb_alignment',
    categoryId: 'wintweaks',
    categoryGroup: 'taskbar',
    title: 'Alinhamento da Barra de Tarefas',
    description: 'Define se os ícones da barra de tarefas ficam centralizados ou alinhados à esquerda.',
    impactLevel: 'Baixo',
    applied: false,
    supportedWinVersion: 'Windows 11 21H2+',
    currentValue: 'Center',
    recommendedValue: 'Left',
    selectedValue: 'Center',
    options: [
      { label: 'Esquerda (Left)', value: 'Left' },
      { label: 'Centro (Center)', value: 'Center' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "TaskbarAl" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "TaskbarAl" -Value 1'
  },
  {
    id: 'tb_search',
    categoryId: 'wintweaks',
    categoryGroup: 'taskbar',
    title: 'Estilo do Botão de Pesquisa',
    description: 'Escolha a aparência da busca na barra de tarefas (Caixa completa, Ícone + Rótulo, Apenas Ícone ou Oculto).',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Search Icon',
    recommendedValue: 'Search Icon',
    selectedValue: 'Search Icon',
    options: [
      { label: 'Caixa de Pesquisa', value: 'Search Box' },
      { label: 'Ícone e Rótulo', value: 'Search Icon and Label' },
      { label: 'Apenas Ícone', value: 'Search Icon' },
      { label: 'Ocultar', value: 'Hide' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" -Name "SearchboxTaskbarMode" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" -Name "SearchboxTaskbarMode" -Value 2'
  },
  {
    id: 'tb_task_view',
    categoryId: 'wintweaks',
    categoryGroup: 'taskbar',
    title: 'Botão de Visão de Tarefas (Task View)',
    description: 'Exibe ou oculta o botão de alternância de áreas de trabalho virtuais na barra de tarefas.',
    impactLevel: 'Baixo',
    applied: false,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Show',
    recommendedValue: 'Hide',
    selectedValue: 'Show',
    options: [
      { label: 'Exibir (Show)', value: 'Show' },
      { label: 'Ocultar (Hide)', value: 'Hide' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "ShowTaskViewButton" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "ShowTaskViewButton" -Value 1'
  },
  {
    id: 'tb_widgets',
    categoryId: 'wintweaks',
    categoryGroup: 'taskbar',
    title: 'Widgets do Windows 11',
    description: 'Ativa ou desativa o ícone e feed de Widgets. Apenas remove o botão da barra sem quebrar o sistema.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 11 21H2+',
    currentValue: 'Disable',
    recommendedValue: 'Disable',
    selectedValue: 'Disable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "TaskbarDa" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "TaskbarDa" -Value 1'
  },
  {
    id: 'tb_chat_teams',
    categoryId: 'wintweaks',
    categoryGroup: 'taskbar',
    title: 'Chat do Microsoft Teams',
    description: 'Remove o ícone de Chat/Teams integrado da barra de tarefas.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 11 21H2+',
    currentValue: 'Hide',
    recommendedValue: 'Hide',
    selectedValue: 'Hide',
    options: [
      { label: 'Exibir (Show)', value: 'Show' },
      { label: 'Ocultar (Hide)', value: 'Hide' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "TaskbarMn" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "TaskbarMn" -Value 1'
  },
  {
    id: 'tb_end_task',
    categoryId: 'wintweaks',
    categoryGroup: 'taskbar',
    title: 'Encerrar Tarefa com Botão Direito (End Task)',
    description: 'Permite fechar programas congelados diretamente com o botão direito no ícone da barra de tarefas.',
    impactLevel: 'Médio',
    applied: true,
    supportedWinVersion: 'Windows 11 23H2+',
    currentValue: 'Enabled',
    recommendedValue: 'Enabled',
    selectedValue: 'Enabled',
    options: [
      { label: 'Ativado (Enabled)', value: 'Enabled' },
      { label: 'Desativado (Disabled)', value: 'Disabled' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "TaskbarDeveloperSettings" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "TaskbarDeveloperSettings" -Value 0'
  },
  {
    id: 'tb_seconds',
    categoryId: 'wintweaks',
    categoryGroup: 'taskbar',
    title: 'Segundos no Relógio da Barra de Tarefas',
    description: 'Exibe contagem de segundos ao lado da hora no relógio do sistema.',
    impactLevel: 'Baixo',
    applied: false,
    supportedWinVersion: 'Windows 11 22H2+',
    currentValue: 'Off',
    recommendedValue: 'On',
    selectedValue: 'Off',
    options: [
      { label: 'Ligado (On)', value: 'On' },
      { label: 'Desligado (Off)', value: 'Off' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "ShowSecondsInSystemClock" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "ShowSecondsInSystemClock" -Value 0'
  },
  {
    id: 'tb_autohide',
    categoryId: 'wintweaks',
    categoryGroup: 'taskbar',
    title: 'Ocultar Barra de Tarefas Automaticamente',
    description: 'Esconde a barra de tarefas quando o cursor do mouse não está na parte inferior.',
    impactLevel: 'Baixo',
    applied: false,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Always show',
    recommendedValue: 'Always show',
    selectedValue: 'Always show',
    options: [
      { label: 'Sempre Exibir (Always show)', value: 'Always show' },
      { label: 'Ocultar Automaticamente', value: 'Automatically hide' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StuckRects3" -Name "Settings" -Value ([byte[]](0x30,0x00,0x00,0x00,0xfe,0xff,0xff,0xff,0x03,0x00,0x00,0x00))',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StuckRects3" -Name "Settings" -Value ([byte[]](0x30,0x00,0x00,0x00,0xfe,0xff,0xff,0xff,0x02,0x00,0x00,0x00))'
  },

  // --- 2. START MENU ---
  {
    id: 'sm_recommendations',
    categoryId: 'wintweaks',
    categoryGroup: 'start_menu',
    title: 'Recomendações no Menu Iniciar',
    description: 'Reduz ou desativa a área de arquivos e artigos recomendados no Menu Iniciar do Windows 11.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 11 22H2+',
    currentValue: 'Disabled',
    recommendedValue: 'Disabled',
    selectedValue: 'Disabled',
    options: [
      { label: 'Exibir Recomendados', value: 'Enabled' },
      { label: 'Desativar Recomendados', value: 'Disabled' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "Start_IrisRecommendations" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "Start_IrisRecommendations" -Value 1'
  },
  {
    id: 'sm_recent_apps',
    categoryId: 'wintweaks',
    categoryGroup: 'start_menu',
    title: 'Aplicativos Adicionados Recentemente',
    description: 'Exibe ou oculta a seção de aplicativos instalados há pouco tempo no Menu Iniciar.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Hide',
    recommendedValue: 'Hide',
    selectedValue: 'Hide',
    options: [
      { label: 'Exibir (Show)', value: 'Show' },
      { label: 'Ocultar (Hide)', value: 'Hide' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "Start_TrackProgs" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "Start_TrackProgs" -Value 1'
  },
  {
    id: 'sm_recent_opened',
    categoryId: 'wintweaks',
    categoryGroup: 'start_menu',
    title: 'Itens Abertos Recentemente',
    description: 'Ativa ou desativa o histórico de documentos e arquivos abertos recentemente no Iniciar e Jump Lists.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disable',
    recommendedValue: 'Disable',
    selectedValue: 'Disable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "Start_TrackDocs" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "Start_TrackDocs" -Value 1'
  },
  {
    id: 'sm_layout',
    categoryId: 'wintweaks',
    categoryGroup: 'start_menu',
    title: 'Layout do Menu Iniciar',
    description: 'Escolha se prefere mais ícones fixados (More pins), o padrão balanceado ou mais recomendações.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 11 22H2+',
    currentValue: 'More pins',
    recommendedValue: 'More pins',
    selectedValue: 'More pins',
    options: [
      { label: 'Mais Ícones Fixados (More pins)', value: 'More pins' },
      { label: 'Padrão (Default)', value: 'Default' },
      { label: 'Mais Recomendações', value: 'More recommendations' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartPage" -Name "StartLayout" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartPage" -Name "StartLayout" -Value 0'
  },

  // --- 3. FILE EXPLORER ---
  {
    id: 'fe_open_to',
    categoryId: 'wintweaks',
    categoryGroup: 'explorer',
    title: 'Abrir Explorador de Arquivos Em',
    description: 'Escolha se o Atalho do Explorador abre na Início (Home/Acesso Rápido) ou em Este PC.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'This PC',
    recommendedValue: 'This PC',
    selectedValue: 'This PC',
    options: [
      { label: 'Início (Home / Quick Access)', value: 'Home' },
      { label: 'Este PC (This PC)', value: 'This PC' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "LaunchTo" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "LaunchTo" -Value 2'
  },
  {
    id: 'fe_file_extensions',
    categoryId: 'wintweaks',
    categoryGroup: 'explorer',
    title: 'Exibir Extensões de Arquivos Conhecidos',
    description: 'Sempre mostra a extensão dos arquivos (.exe, .txt, .png, .zip), prevenindo phishing e arquivos maliciosos camuflados.',
    impactLevel: 'Médio',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Always show',
    recommendedValue: 'Always show',
    selectedValue: 'Always show',
    options: [
      { label: 'Sempre Exibir Extensões', value: 'Always show' },
      { label: 'Ocultar Extensões', value: 'Hide' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "HideFileExt" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "HideFileExt" -Value 1'
  },
  {
    id: 'fe_hidden_files',
    categoryId: 'wintweaks',
    categoryGroup: 'explorer',
    title: 'Arquivos e Pastas Ocultos',
    description: 'Exibe pastas ocultas do sistema como AppData e ProgramData.',
    impactLevel: 'Baixo',
    applied: false,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Hide hidden files',
    recommendedValue: 'Show hidden files',
    selectedValue: 'Hide hidden files',
    options: [
      { label: 'Exibir Arquivos Ocultos', value: 'Show hidden files' },
      { label: 'Ocultar Arquivos Ocultos', value: 'Hide hidden files' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "Hidden" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "Hidden" -Value 2'
  },
  {
    id: 'fe_protected_os_files',
    categoryId: 'wintweaks',
    categoryGroup: 'explorer',
    title: 'Arquivos Protegidos do Sistema Operacional',
    description: 'Exibe arquivos críticos e protegidos do Windows (boot.ini, desktop.ini). Recomendado manter DESATIVADO por segurança.',
    warning: 'ATENÇÃO DE SEGURANÇA: Exibir arquivos protegidos do SO pode resultar em deleção acidental de arquivos necessários para iniciar o Windows.',
    impactLevel: 'Alto',
    applied: false,
    requiresWarningConfirm: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Hide (Recommended)',
    recommendedValue: 'Hide (Recommended)',
    selectedValue: 'Hide (Recommended)',
    options: [
      { label: 'Ocultar Protegidos (Recomendado)', value: 'Hide (Recommended)' },
      { label: 'Exibir Arquivos do Sistema ⚠️', value: 'Show' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "ShowSuperHidden" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "ShowSuperHidden" -Value 0'
  },
  {
    id: 'fe_full_path_title',
    categoryId: 'wintweaks',
    categoryGroup: 'explorer',
    title: 'Caminho Completo na Barra de Título',
    description: 'Exibe o caminho completo do diretório (ex: C:\\Windows\\System32) na barra de título do Explorador.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Enable',
    recommendedValue: 'Enable',
    selectedValue: 'Enable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CabinetState" -Name "FullPath" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CabinetState" -Name "FullPath" -Value 0'
  },
  {
    id: 'fe_compact_view',
    categoryId: 'wintweaks',
    categoryGroup: 'explorer',
    title: 'Modo de Exibição Compacto',
    description: 'Reduz o espaçamento entre itens e pastas no Explorador de Arquivos do Windows 11 para exibir mais itens por tela.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 11 21H2+',
    currentValue: 'Enable',
    recommendedValue: 'Enable',
    selectedValue: 'Enable',
    options: [
      { label: 'Compacto (Enable)', value: 'Enable' },
      { label: 'Espaçamento Padrão', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "UseCompactMode" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "UseCompactMode" -Value 0'
  },

  // --- 4. CONTEXT MENU ---
  {
    id: 'cm_classic_menu',
    categoryId: 'wintweaks',
    categoryGroup: 'context_menu',
    title: 'Menu de Contexto Clássico do Windows 10',
    description: 'Restaura o menu de botão direito tradicional do Windows 10 sem a necessidade de clicar em "Mostrar mais opções" no Windows 11.',
    impactLevel: 'Alto',
    applied: true,
    supportedWinVersion: 'Windows 11 21H2+',
    currentValue: 'Classic Context Menu',
    recommendedValue: 'Classic Context Menu',
    selectedValue: 'Classic Context Menu',
    options: [
      { label: 'Menu Clássico Win10 (Recomendado)', value: 'Classic Context Menu' },
      { label: 'Menu Moderno Win11', value: 'Modern Context Menu' }
    ],
    commandPreview: 'reg add "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32" /f /ve',
    revertCommandPreview: 'reg delete "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f'
  },
  {
    id: 'cm_open_terminal',
    categoryId: 'wintweaks',
    categoryGroup: 'context_menu',
    title: 'Opção "Abrir no Terminal / PowerShell"',
    description: 'Garante a presença da opção "Abrir no Terminal" ao clicar com botão direito em qualquer pasta ou espaço vazio.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Enabled',
    recommendedValue: 'Enabled',
    selectedValue: 'Enabled',
    options: [
      { label: 'Ativado (Enabled)', value: 'Enabled' },
      { label: 'Desativado (Disabled)', value: 'Disabled' }
    ],
    commandPreview: 'New-Item -Path "HKCR:\\Directory\\shell\\OpenTerminalHere" -Force',
    revertCommandPreview: 'Remove-Item -Path "HKCR:\\Directory\\shell\\OpenTerminalHere" -Recurse -Force'
  },
  {
    id: 'cm_copy_path',
    categoryId: 'wintweaks',
    categoryGroup: 'context_menu',
    title: 'Atalho "Copiar como Caminho" Sem Shift',
    description: 'Disponibiliza a opção de copiar o caminho exato do arquivo sem precisar pressionar a tecla Shift.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Enabled',
    recommendedValue: 'Enabled',
    selectedValue: 'Enabled',
    options: [
      { label: 'Ativado (Enabled)', value: 'Enabled' },
      { label: 'Desativado (Disabled)', value: 'Disabled' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCR:\\AllFilesystemObjects\\shell\\windows.copypath" -Name "Extended" -Value ""',
    revertCommandPreview: 'Remove-ItemProperty -Path "HKCR:\\AllFilesystemObjects\\shell\\windows.copypath" -Name "Extended"'
  },
  {
    id: 'cm_take_ownership',
    categoryId: 'wintweaks',
    categoryGroup: 'context_menu',
    title: 'Opção "Obter Propriedade (Take Ownership)"',
    description: 'Adiciona menu de contexto avançado para assumir permissões de administrador sobre pastas restritas.',
    warning: 'OPÇÃO AVANÇADA: Não modifique permissões de pastas protegidas do C:\\Windows a menos que saiba exatamente o que está fazendo.',
    impactLevel: 'Alto',
    applied: false,
    requiresWarningConfirm: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disabled',
    recommendedValue: 'Disabled',
    selectedValue: 'Disabled',
    options: [
      { label: 'Desativado (Seguro)', value: 'Disabled' },
      { label: 'Ativar Take Ownership ⚠️', value: 'Enabled' }
    ],
    commandPreview: 'cmd /c "reg add HKCR\\*\\shell\\runas /ve /d \"Take Ownership\" /f"',
    revertCommandPreview: 'cmd /c "reg delete HKCR\\*\\shell\\runas /f"'
  },

  // --- 5. WINDOWS UI ---
  {
    id: 'ui_dark_mode',
    categoryId: 'wintweaks',
    categoryGroup: 'win_ui',
    title: 'Modo Escuro / Claro do Windows',
    description: 'Define o tema visual do sistema e aplicativos para Escuro, Claro ou Automático.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Dark',
    recommendedValue: 'Dark',
    selectedValue: 'Dark',
    options: [
      { label: 'Modo Escuro (Dark)', value: 'Dark' },
      { label: 'Modo Claro (Light)', value: 'Light' },
      { label: 'Padrão do Sistema', value: 'System' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "AppsUseLightTheme" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "AppsUseLightTheme" -Value 1'
  },
  {
    id: 'ui_transparency',
    categoryId: 'wintweaks',
    categoryGroup: 'win_ui',
    title: 'Efeitos de Transparência',
    description: 'Ativa ou desativa a transparência nas janelas e barra de tarefas. Desativar economiza ciclo de GPU.',
    impactLevel: 'Médio',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disabled',
    recommendedValue: 'Disabled',
    selectedValue: 'Disabled',
    options: [
      { label: 'Ativado (Enabled)', value: 'Enabled' },
      { label: 'Desativado (Disabled - Mais FPS)', value: 'Disabled' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "EnableTransparency" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "EnableTransparency" -Value 1'
  },
  {
    id: 'ui_animations',
    categoryId: 'wintweaks',
    categoryGroup: 'win_ui',
    title: 'Animações da Interface e Janelas',
    description: 'Controla efeitos de abertura e minimização de janelas. Desativar proporciona resposta instantânea.',
    impactLevel: 'Médio',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disabled',
    recommendedValue: 'Disabled',
    selectedValue: 'Disabled',
    options: [
      { label: 'Ativado (Enabled)', value: 'Enabled' },
      { label: 'Desativado (Desempenho)', value: 'Disabled' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Desktop" -Name "UserPreferencesMask" -Value ([byte[]](0x90,0x12,0x03,0x80,0x10,0x00,0x00,0x00))',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Desktop" -Name "UserPreferencesMask" -Value ([byte[]](0x9e,0x3e,0x07,0x80,0x12,0x00,0x00,0x00))'
  },
  {
    id: 'ui_visual_preset',
    categoryId: 'wintweaks',
    categoryGroup: 'win_ui',
    title: 'Preset de Efeitos Visuais (sysdm.cpl)',
    description: 'Ajuste os efeitos de desempenho gráfico do Windows sem desativar fontes suavizadas ou miniaturas.',
    impactLevel: 'Alto',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Performance',
    recommendedValue: 'Performance',
    selectedValue: 'Performance',
    options: [
      { label: 'Windows Default', value: 'Windows Default' },
      { label: 'Melhor Desempenho (Performance)', value: 'Performance' },
      { label: 'Balanceado', value: 'Balanced' },
      { label: 'Aparência Gráfica', value: 'Appearance' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" -Name "VisualFXSetting" -Value 2',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" -Name "VisualFXSetting" -Value 0'
  },

  // --- 6. PRIVACY / CONVENIENCE ---
  {
    id: 'pr_advertising_id',
    categoryId: 'wintweaks',
    categoryGroup: 'privacy',
    title: 'ID de Anúncios Personalizados',
    description: 'Bloqueia o rastreamento do ID de publicidade usado para exibir anúncios direcionados dentro de apps.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disable',
    recommendedValue: 'Disable',
    selectedValue: 'Disable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" -Name "Enabled" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" -Name "Enabled" -Value 1'
  },
  {
    id: 'pr_win_suggestions',
    categoryId: 'wintweaks',
    categoryGroup: 'privacy',
    title: 'Sugestões e Dicas do Windows nas Configurações',
    description: 'Desativa anúncios de serviços Microsoft e sugestões de conteúdo na página de Configurações.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disable',
    recommendedValue: 'Disable',
    selectedValue: 'Disable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" -Name "SubscribedContent-338393Enabled" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" -Name "SubscribedContent-338393Enabled" -Value 1'
  },
  {
    id: 'pr_activity_history',
    categoryId: 'wintweaks',
    categoryGroup: 'privacy',
    title: 'Histórico de Atividades e Sincronização Cloud',
    description: 'Desativa o envio do histórico de navegação e arquivos abertos para a nuvem da Microsoft.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disable',
    recommendedValue: 'Disable',
    selectedValue: 'Disable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" -Name "EnableActivityFeed" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" -Name "EnableActivityFeed" -Value 1'
  },

  // --- 7. NOTIFICATIONS ---
  {
    id: 'notif_system',
    categoryId: 'wintweaks',
    categoryGroup: 'notifications',
    title: 'Notificações Globais do Windows',
    description: 'Ativa ou desativa pop-ups de notificações do sistema durante jogos e uso diário.',
    impactLevel: 'Médio',
    applied: false,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Enable',
    recommendedValue: 'Enable',
    selectedValue: 'Enable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" -Name "ToastEnabled" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" -Name "ToastEnabled" -Value 0'
  },
  {
    id: 'notif_lockscreen',
    categoryId: 'wintweaks',
    categoryGroup: 'notifications',
    title: 'Notificações na Tela de Bloqueio',
    description: 'Oculta mensagens e alertas quando o computador estiver na tela de bloqueio.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disable',
    recommendedValue: 'Disable',
    selectedValue: 'Disable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" -Name "NOC_GLOBAL_SETTING_ALLOW_CRITICAL_TOASTS_ABOVE_LOCK" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" -Name "NOC_GLOBAL_SETTING_ALLOW_CRITICAL_TOASTS_ABOVE_LOCK" -Value 1'
  },

  // --- 8. MOUSE ---
  {
    id: 'm_acceleration',
    categoryId: 'wintweaks',
    categoryGroup: 'mouse',
    title: 'Aceleração do Mouse (Enhance Pointer Precision)',
    description: 'Desativa a aceleração do ponteiro para garantir mira 1:1 consistente em jogos competitivos.',
    impactLevel: 'Extremo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Off (Aprimorar Precisão Desativado)',
    recommendedValue: 'Off (Mira 1:1 Perfeita)',
    selectedValue: 'Off (Aprimorar Precisão Desativado)',
    options: [
      { label: 'Desativado (Off - Recomendado para Jogos)', value: 'Off (Aprimorar Precisão Desativado)' },
      { label: 'Ativado (On)', value: 'On' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Mouse" -Name "MouseSpeed" -Value "0"; Set-ItemProperty -Path "HKCU:\\Control Panel\\Mouse" -Name "MouseThreshold1" -Value "0"; Set-ItemProperty -Path "HKCU:\\Control Panel\\Mouse" -Name "MouseThreshold2" -Value "0"',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Mouse" -Name "MouseSpeed" -Value "1"'
  },
  {
    id: 'm_speed',
    categoryId: 'wintweaks',
    categoryGroup: 'mouse',
    title: 'Velocidade Sensibilidade do Ponteiro (1-20)',
    description: 'Valor padrão no Windows é 10 (nível 6/11 do painel de controle). Mudar altera a escala de DPI.',
    impactLevel: 'Médio',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: '10 (Padrão 6/11)',
    recommendedValue: '10 (Padrão 6/11)',
    selectedValue: '10 (Padrão 6/11)',
    options: [
      { label: '6 (Sensibilidade Baixa)', value: '6' },
      { label: '8 (Sensibilidade Média-Baixa)', value: '8' },
      { label: '10 (Padrão Windows 6/11)', value: '10 (Padrão 6/11)' },
      { label: '12 (Sensibilidade Alta)', value: '12' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Mouse" -Name "MouseSensitivity" -Value "10"',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Mouse" -Name "MouseSensitivity" -Value "10"'
  },

  // --- 9. KEYBOARD ---
  {
    id: 'kb_repeat_rate',
    categoryId: 'wintweaks',
    categoryGroup: 'keyboard',
    title: 'Taxa de Repetição de Teclas (Repeat Rate)',
    description: 'Aumenta a velocidade com que o Windows repete a tecla mantida pressionada (ideal para strafe em FPS).',
    impactLevel: 'Alto',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Max (31 - Mais Rápido)',
    recommendedValue: 'Max (31 - Mais Rápido)',
    selectedValue: 'Max (31 - Mais Rápido)',
    options: [
      { label: 'Máxima Velocidade (31 - Recomendado)', value: 'Max (31 - Mais Rápido)' },
      { label: 'Média (20)', value: '20' },
      { label: 'Padrão (10)', value: '10' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Keyboard" -Name "KeyboardSpeed" -Value "31"',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Keyboard" -Name "KeyboardSpeed" -Value "10"'
  },
  {
    id: 'kb_sticky_keys',
    categoryId: 'wintweaks',
    categoryGroup: 'keyboard',
    title: 'Atalhos das Teclas de Aderência (Sticky Keys)',
    description: 'Desativa o pop-up irritante das Teclas de Aderência ao pressionar SHIFT 5 vezes em jogos.',
    impactLevel: 'Alto',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disabled',
    recommendedValue: 'Disabled',
    selectedValue: 'Disabled',
    options: [
      { label: 'Desativado (Sem Bip / Pop-up)', value: 'Disabled' },
      { label: 'Ativado (Padrão)', value: 'Enabled' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Accessibility\\StickyKeys" -Name "Flags" -Value "506"',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Control Panel\\Accessibility\\StickyKeys" -Name "Flags" -Value "510"'
  },

  // --- 10. DESKTOP ---
  {
    id: 'dt_icons',
    categoryId: 'wintweaks',
    categoryGroup: 'desktop',
    title: 'Ícones Principais da Área de Trabalho',
    description: 'Escolha quais ícones do sistema (Este PC, Lixeira, Rede, Painel de Controle) aparecem na Área de Trabalho.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'This PC & Lixeira',
    recommendedValue: 'This PC & Lixeira',
    selectedValue: 'This PC & Lixeira',
    options: [
      { label: 'Este PC & Lixeira', value: 'This PC & Lixeira' },
      { label: 'Exibir Todos (PC, Rede, Lixeira, Painel)', value: 'Exibir Todos' },
      { label: 'Ocultar Todos', value: 'Ocultar Todos' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\HideDesktopIcons\\NewStartPanel" -Name "{20D04FE0-3AEA-1069-A2D8-08002B30309D}" -Value 0',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\HideDesktopIcons\\NewStartPanel" -Name "{20D04FE0-3AEA-1069-A2D8-08002B30309D}" -Value 1'
  },
  {
    id: 'dt_shake_minimize',
    categoryId: 'wintweaks',
    categoryGroup: 'desktop',
    title: 'Chacoalhar para Minimizar (Aero Shake)',
    description: 'Desativa o recurso que minimiza todas as outras janelas quando você chacoalha a barra de título de uma janela.',
    impactLevel: 'Baixo',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Disable',
    recommendedValue: 'Disable',
    selectedValue: 'Disable',
    options: [
      { label: 'Ativado (Enable)', value: 'Enable' },
      { label: 'Desativado (Disable)', value: 'Disable' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "DisallowShaking" -Value 1',
    revertCommandPreview: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "DisallowShaking" -Value 0'
  },

  // --- 11. WINDOWS UPDATE CONVENIENCE ---
  {
    id: 'wu_pause_updates',
    categoryId: 'wintweaks',
    categoryGroup: 'updates',
    title: 'Pausar Atualizações Automáticas por 5 Semanas',
    description: 'Pausa downloads automáticos sem desativar a segurança do Windows ou do Defender.',
    impactLevel: 'Médio',
    applied: true,
    supportedWinVersion: 'Windows 10 / 11',
    currentValue: 'Pausado por 35 dias',
    recommendedValue: 'Pausado por 35 dias',
    selectedValue: 'Pausado por 35 dias',
    options: [
      { label: 'Pausar por 5 Semanas', value: 'Pausado por 35 dias' },
      { label: 'Atualizações Normais', value: 'Normal' }
    ],
    commandPreview: 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings" -Name "PauseFeatureUpdatesStartTime" -Value (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")',
    revertCommandPreview: 'Remove-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings" -Name "PauseFeatureUpdatesStartTime"'
  }
];

export const CLEANUP_TOOLS_LIST: CleanupItem[] = [
  {
    id: 'clean_dns',
    title: 'Limpar Cache de DNS da Rede',
    category: 'Rede',
    description: 'Executa `ipconfig /flushdns` para resolver problemas de conexão e servidores com rotas lentas.',
    estimatedSizeBytes: 0,
    command: 'ipconfig /flushdns'
  },
  {
    id: 'clean_win_temp',
    title: 'Limpar Pasta Temporária do Windows (C:\\Windows\\Temp)',
    category: 'Arquivos do Sistema',
    description: 'Remove logs de instaladores e arquivos temporários criados pelo sistema operacional.',
    estimatedSizeBytes: 1420000000, // ~1.42 GB
    command: 'Remove-Item -Path "C:\\Windows\\Temp\\*" -Recurse -Force -ErrorAction SilentlyContinue'
  },
  {
    id: 'clean_user_temp',
    title: 'Limpar Pasta Temporária do Usuário (%temp%)',
    category: 'Arquivos de Usuário',
    description: 'Libera espaço em disco excluindo caches de programas e rastros de inicialização.',
    estimatedSizeBytes: 2850000000, // ~2.85 GB
    command: 'Remove-Item -Path "$env:TEMP\\*" -Recurse -Force -ErrorAction SilentlyContinue'
  },
  {
    id: 'clean_directx_shaders',
    title: 'Limpar Cache de Shaders DirectX (D3DSCache)',
    category: 'Gráficos & Jogos',
    description: 'Remove compilações antigas de shaders de GPU. Recomendado se houver stuttering após atualizar drivers.',
    estimatedSizeBytes: 890000000, // ~890 MB
    command: 'Remove-Item -Path "$env:LOCALAPPDATA\\NVIDIA\\DXCache\\*" -Recurse -Force -ErrorAction SilentlyContinue'
  },
  {
    id: 'clean_thumbnails',
    title: 'Limpar Cache de Miniaturas de Imagens (Thumbcache)',
    category: 'Explorador',
    description: 'Recria o banco de dados de miniaturas de fotos e vídeos para corrigir ícones corrompidos.',
    estimatedSizeBytes: 420000000, // ~420 MB
    command: 'taskkill /f /im explorer.exe; Remove-Item -Path "$env:LOCALAPPDATA\\Microsoft\\Windows\\Explorer\\thumbcache_*.db" -Force; start explorer.exe'
  },
  {
    id: 'clean_recycle_bin',
    title: 'Evaziar Lixeira do Windows',
    category: 'Lixeira',
    description: 'Remove definitivamente todos os itens descartados na Lixeira de todas as partições.',
    estimatedSizeBytes: 4800000000, // ~4.8 GB
    command: 'Clear-RecycleBin -Force -ErrorAction SilentlyContinue',
    requiresConfirm: true
  },
  {
    id: 'clean_delivery_optimization',
    title: 'Limpar Cache do Otimizador de Entrega',
    category: 'Atualizações',
    description: 'Remove pacotes acumulados de atualizações baixadas da Microsoft Store e Windows Update.',
    estimatedSizeBytes: 1950000000, // ~1.95 GB
    command: 'Delete-DeliveryOptimizationCache'
  },
  {
    id: 'clean_error_reports',
    title: 'Limpar Relatórios de Erros do Windows (WER)',
    category: 'Relatórios',
    description: 'Remove arquivos de despejo de memória e relatórios de travamentos de aplicativos.',
    estimatedSizeBytes: 310000000, // ~310 MB
    command: 'Remove-Item -Path "$env:LOCALAPPDATA\\CrashDumps\\*" -Recurse -Force -ErrorAction SilentlyContinue'
  }
];

export const PRESETS_LIST: PresetProfile[] = [
  {
    id: 'preset_default',
    name: 'Windows Default',
    badge: 'Padrão de Fábrica',
    description: 'Restaura as configurações de fábrica do Windows sem aplicar otimizações agressivas.',
    tweakValues: [
      { tweakId: 'tb_alignment', value: 'Center', applied: false },
      { tweakId: 'tb_widgets', value: 'Enable', applied: false },
      { tweakId: 'tb_chat_teams', value: 'Show', applied: false },
      { tweakId: 'cm_classic_menu', value: 'Modern Context Menu', applied: false },
      { tweakId: 'ui_transparency', value: 'Enabled', applied: false },
      { tweakId: 'ui_animations', value: 'Enabled', applied: false },
      { tweakId: 'm_acceleration', value: 'On', applied: false },
      { tweakId: 'kb_sticky_keys', value: 'Enabled', applied: false }
    ]
  },
  {
    id: 'preset_clean',
    name: 'Clean Windows',
    badge: 'Limpo & Sem Anúncios',
    description: 'Foco em remover propagandas, widgets, sugestões, notificações invasivas e arquivos temporários.',
    tweakValues: [
      { tweakId: 'tb_widgets', value: 'Disable', applied: true },
      { tweakId: 'tb_chat_teams', value: 'Hide', applied: true },
      { tweakId: 'sm_recommendations', value: 'Disabled', applied: true },
      { tweakId: 'pr_advertising_id', value: 'Disable', applied: true },
      { tweakId: 'pr_win_suggestions', value: 'Disable', applied: true },
      { tweakId: 'notif_lockscreen', value: 'Disable', applied: true }
    ]
  },
  {
    id: 'preset_gaming',
    name: 'Gaming Standard',
    badge: 'Desempenho Gamer',
    description: 'Foco em Game Mode, aceleração de mouse desativada, End Task ativado e modo de alto desempenho.',
    tweakValues: [
      { tweakId: 'm_acceleration', value: 'Off (Aprimorar Precisão Desativado)', applied: true },
      { tweakId: 'kb_repeat_rate', value: 'Max (31 - Mais Rápido)', applied: true },
      { tweakId: 'kb_sticky_keys', value: 'Disabled', applied: true },
      { tweakId: 'tb_end_task', value: 'Enabled', applied: true },
      { tweakId: 'ui_transparency', value: 'Disabled', applied: true },
      { tweakId: 'ui_visual_preset', value: 'Performance', applied: true }
    ]
  },
  {
    id: 'preset_competitive',
    name: 'Competitive Gaming (FPS Max)',
    badge: 'Máxima Latência Ultrabaixa',
    description: 'Combina desativação de animações, transparência, aceleração de mouse, menu clássico Win10 e prioridade total.',
    tweakValues: [
      { tweakId: 'm_acceleration', value: 'Off (Aprimorar Precisão Desativado)', applied: true },
      { tweakId: 'kb_repeat_rate', value: 'Max (31 - Mais Rápido)', applied: true },
      { tweakId: 'kb_sticky_keys', value: 'Disabled', applied: true },
      { tweakId: 'cm_classic_menu', value: 'Classic Context Menu', applied: true },
      { tweakId: 'ui_animations', value: 'Disabled', applied: true },
      { tweakId: 'ui_transparency', value: 'Disabled', applied: true },
      { tweakId: 'ui_visual_preset', value: 'Performance', applied: true },
      { tweakId: 'fe_file_extensions', value: 'Always show', applied: true }
    ]
  },
  {
    id: 'preset_productivity',
    name: 'Productivity & Work',
    badge: 'Foco & Organização',
    description: 'Foco em menu Iniciar compacto, Explorador abrindo em Este PC, extensões visíveis e sem distrações.',
    tweakValues: [
      { tweakId: 'fe_open_to', value: 'This PC', applied: true },
      { tweakId: 'fe_file_extensions', value: 'Always show', applied: true },
      { tweakId: 'fe_full_path_title', value: 'Enable', applied: true },
      { tweakId: 'fe_compact_view', value: 'Enable', applied: true },
      { tweakId: 'tb_alignment', value: 'Left', applied: true },
      { tweakId: 'sm_layout', value: 'More pins', applied: true }
    ]
  }
];

export const WINDOWS_TOOLS_SHORTCUTS = [
  {
    id: 'shortcut_restart_explorer',
    name: 'Reiniciar Windows Explorer',
    icon: 'RefreshCw',
    description: 'Mata e reinicia o processo `explorer.exe` sem precisar reiniciar o computador para aplicar alterações de registro.',
    actionCommand: 'taskkill /f /im explorer.exe & start explorer.exe'
  },
  {
    id: 'shortcut_restart_dns',
    name: 'Reiniciar Serviço DNS Client',
    icon: 'Radio',
    description: 'Reinicia a pilha de resolução de nomes da placa de rede.',
    actionCommand: 'net stop dnscache & net start dnscache'
  },
  {
    id: 'shortcut_advanced_sys',
    name: 'Propriedades do Sistema (sysdm.cpl)',
    icon: 'Sliders',
    description: 'Abre o painel avançado do Windows para ajustar memória virtual (Paging File) e variáveis de ambiente.',
    actionCommand: 'sysdm.cpl'
  },
  {
    id: 'shortcut_device_manager',
    name: 'Gerenciador de Dispositivos (devmgmt.msc)',
    icon: 'Cpu',
    description: 'Abre o gerenciador para atualizar drivers de GPU, USB e adaptadores de rede.',
    actionCommand: 'devmgmt.msc'
  },
  {
    id: 'shortcut_disk_mgmt',
    name: 'Gerenciamento de Disco (diskmgmt.msc)',
    icon: 'Server',
    description: 'Abre o particionador de discos e volumes do Windows.',
    actionCommand: 'diskmgmt.msc'
  },
  {
    id: 'shortcut_net_connections',
    name: 'Conexões de Rede (ncpa.cpl)',
    icon: 'Globe',
    description: 'Painel clássico para editar adaptadores Ethernet, Wi-Fi e configurações de IPv4/IPv6.',
    actionCommand: 'ncpa.cpl'
  },
  {
    id: 'shortcut_power_options',
    name: 'Opções de Energia (powercfg.cpl)',
    icon: 'Zap',
    description: 'Painel clássico de escolha de plano de energia e suspensão.',
    actionCommand: 'powercfg.cpl'
  },
  {
    id: 'shortcut_win_security',
    name: 'Segurança do Windows',
    icon: 'Shield',
    description: 'Abre o painel oficial da Central de Segurança do Windows Defender.',
    actionCommand: 'start ms-settings:windowsdefender'
  },
  {
    id: 'shortcut_installed_apps',
    name: 'Aplicativos Instalados',
    icon: 'Layout',
    description: 'Abre a página oficial para desinstalar programas no Windows 10/11.',
    actionCommand: 'start ms-settings:appsfeatures'
  },
  {
    id: 'shortcut_startup_apps',
    name: 'Aplicativos de Inicialização',
    icon: 'Activity',
    description: 'Gerencie quais programas iniciam automaticamente junto com o Windows.',
    actionCommand: 'start ms-settings:startupapps'
  },
  {
    id: 'shortcut_graphics_settings',
    name: 'Configurações de Elementos Gráficos',
    icon: 'Monitor',
    description: 'Configure o Agendamento de GPU Acelerado por Hardware (HAGS) por aplicativo.',
    actionCommand: 'start ms-settings:display-advancedgraphics'
  },
  {
    id: 'shortcut_win_update',
    name: 'Windows Update',
    icon: 'ExternalLink',
    description: 'Abre diretamente a tela oficial do Windows Update para verificar atualizações pendentes.',
    actionCommand: 'start ms-settings:windowsupdate'
  }
];
