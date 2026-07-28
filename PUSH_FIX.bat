@echo off
echo =============================================
echo   CapLaw - Deploy a GitHub Pages
echo =============================================
echo.
cd /d "%~dp0"

:: Paso 1: Agregar todos los cambios
git add -A

:: Paso 2: Commit (si hay cambios nuevos)
git diff --cached --quiet
if %errorlevel% neq 0 (
    git commit -m "update: cambios desde local"
    echo [OK] Commit creado con los cambios nuevos.
) else (
    echo [OK] No hay cambios nuevos para commitear.
)

:: Paso 3: Push a main
git push origin main
echo [OK] Push a main completado.

:: Paso 4: Forzar la branch de Pages a que tenga lo mismo que main
git push origin main:feature/prototype-website --force
echo [OK] Branch de Pages actualizada.

echo.
echo =============================================
echo   LISTO! Espera 1-2 min y abre:
echo   https://henrysali.github.io/CapLaw/
echo =============================================
echo.
pause
