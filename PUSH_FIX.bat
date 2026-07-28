@echo off
echo === Forzando push a branch de Pages ===
cd /d "%~dp0"
git push origin main:feature/prototype-website --force
echo.
echo === LISTO. Espera 1-2 min y abre: ===
echo https://henrysali.github.io/CapLaw/?v=3
echo.
pause
