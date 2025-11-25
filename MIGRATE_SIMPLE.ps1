# Simple Migration Script - Fixed Version
# Run this in PowerShell to move your project from OneDrive to C:\Dev

Write-Host "Starting project migration..." -ForegroundColor Cyan
Write-Host ""

$source = "C:\Users\dcwes\OneDrive\Desktop\Inventions Sci-Fi"
$dest = "C:\Dev\Inventions Sci-Fi"

# Create C:\Dev if it doesn't exist
if (!(Test-Path "C:\Dev")) {
    New-Item -ItemType Directory -Path "C:\Dev" | Out-Null
    Write-Host "Created C:\Dev directory" -ForegroundColor Green
}

# Copy files using robocopy (excludes node_modules, dist, .vercel)
Write-Host "Copying files... This will take a few minutes..." -ForegroundColor Yellow
robocopy "$source" "$dest" /E /XD node_modules dist .vercel /R:0 /W:0 /NFL /NDL

Write-Host ""
Write-Host "Files copied! Now installing dependencies..." -ForegroundColor Green
Write-Host ""

# Install dependencies
Set-Location "$dest"
npm install

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Migration Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "New location: $dest" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Test it: npm run dev" -ForegroundColor Yellow
Write-Host "2. Open VS Code: code ." -ForegroundColor Yellow
Write-Host "3. If it works, delete the OneDrive folder" -ForegroundColor Yellow
Write-Host ""
