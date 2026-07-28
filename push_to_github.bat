@echo off
cd /d "%~dp0"
git init
git add -A
git commit -m "feat: Redesign completo - Felipe Salinas Legal Consultant"
git branch -M main
git remote add origin https://github.com/HenrySali/CapLaw.git
git push -u origin main --force
pause
