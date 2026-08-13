@echo off
title Palorni System Optimizer - Web App
echo =====================================================
echo   Iniciando Palorni System Optimizer (Node + Vite)
echo =====================================================
echo.

if not exist node_modules (
    echo [!] Primeira execucao detectada. Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo [X] Erro ao instalar dependencias. Verifique se o Node.js esta instalado.
        pause
        exit /b %errorlevel%
    )
)

echo [>] Abrindo o navegador e iniciando servidor em http://localhost:3000 ...
timeout /t 2 >nul
start http://localhost:3000
call npm run dev
pause
