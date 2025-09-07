@echo off
cd /d "G:\Cursor_Project\ai_pm_ceo"
set GIT_PAGER=cat
set PAGER=cat
git add templates-react/
git commit -m "feat: add React+TS template system with 80-slide deck"
git push origin master
echo Git push completed!
pause
