@echo off
title Launching Engr. Afnan Badar Portfolio
cd /d "%~dp0"
echo ========================================================
echo   Launching Engr. Afnan Badar Portfolio Website...
echo ========================================================
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting Python local server...
    python preview.py
) else (
    echo Python not found in PATH. Opening index.html directly...
    start "" "%~dp0index.html"
)
pause
