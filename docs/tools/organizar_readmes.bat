@echo off
setlocal
cd /d "%~dp0\..\.."
if not exist "docs\readmes" mkdir "docs\readmes"
for %%F in (README*.txt) do (
  if exist "%%F" move /Y "%%F" "docs\readmes\" >nul
)
echo READMEs organizados em docs\readmes.
pause
