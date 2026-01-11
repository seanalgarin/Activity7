Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Restarting Frontend Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kill all node processes related to frontend
Write-Host "Stopping frontend processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Where-Object {
    $_.Path -like "*ACTIVITY7*"
} | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

# Navigate to frontend directory
Set-Location "d:\Downloads\ACTIVITY7\frontend"

Write-Host ""
Write-Host "Starting frontend server..." -ForegroundColor Green
Write-Host "Please wait for the browser to open automatically..." -ForegroundColor Green
Write-Host ""
Write-Host "Once running, press F12 to open DevTools Console" -ForegroundColor Yellow
Write-Host ""

# Start the frontend
npm start
