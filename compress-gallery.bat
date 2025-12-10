@echo off
echo Starting image compression...
node scripts/compress-images-simple.js
if exist compression-log.txt (
    echo.
    echo Compression log:
    type compression-log.txt
)
pause
