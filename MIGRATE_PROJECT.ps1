# Project Migration Script - Move from OneDrive to Local Drive
# This script will safely move your Inventions Sci-Fi project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Project Migration: OneDrive → Local" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$sourcePath = "C:\Users\dcwes\OneDrive\Desktop\Inventions Sci-Fi"
$destinationPath = "C:\Dev\Inventions Sci-Fi"

Write-Host "SOURCE: $sourcePath" -ForegroundColor Yellow
Write-Host "DESTINATION: $destinationPath" -ForegroundColor Green
Write-Host ""

# Step 1: Verify source exists
Write-Host "[Step 1/8] Verifying source directory..." -ForegroundColor Cyan
if (-not (Test-Path $sourcePath)) {
    Write-Host "ERROR: Source directory not found!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Source directory verified" -ForegroundColor Green
Write-Host ""

# Step 2: Check for uncommitted changes
Write-Host "[Step 2/8] Checking Git status..." -ForegroundColor Cyan
Push-Location $sourcePath
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  WARNING: You have uncommitted changes!" -ForegroundColor Yellow
    Write-Host "Uncommitted files:" -ForegroundColor Yellow
    Write-Host $gitStatus -ForegroundColor Yellow
    Write-Host ""
    $commit = Read-Host "Do you want to commit these changes first? (y/n)"
    if ($commit -eq 'y') {
        Write-Host "Please commit your changes manually, then run this script again." -ForegroundColor Yellow
        Pop-Location
        exit 0
    }
} else {
    Write-Host "✓ No uncommitted changes" -ForegroundColor Green
}
Pop-Location
Write-Host ""

# Step 3: Close VS Code
Write-Host "[Step 3/8] Checking for VS Code processes..." -ForegroundColor Cyan
$vscodeProcesses = Get-Process | Where-Object { $_.ProcessName -like "*code*" }
if ($vscodeProcesses) {
    Write-Host "⚠️  VS Code is currently running!" -ForegroundColor Yellow
    Write-Host "Please close VS Code before continuing." -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Press Enter after closing VS Code, or 'q' to quit"
    if ($continue -eq 'q') {
        exit 0
    }
}
Write-Host "✓ VS Code check complete" -ForegroundColor Green
Write-Host ""

# Step 4: Create destination directory
Write-Host "[Step 4/8] Creating destination directory..." -ForegroundColor Cyan
if (-not (Test-Path "C:\Dev")) {
    New-Item -ItemType Directory -Path "C:\Dev" -Force | Out-Null
    Write-Host "✓ Created C:\Dev directory" -ForegroundColor Green
} else {
    Write-Host "✓ C:\Dev already exists" -ForegroundColor Green
}

if (Test-Path $destinationPath) {
    Write-Host "⚠️  Destination directory already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Delete existing directory? (y/n)"
    if ($overwrite -eq 'y') {
        Remove-Item -Path $destinationPath -Recurse -Force
        Write-Host "✓ Removed existing directory" -ForegroundColor Green
    } else {
        Write-Host "Migration cancelled." -ForegroundColor Red
        exit 0
    }
}
Write-Host ""

# Step 5: Copy project files
Write-Host "[Step 5/8] Copying project files..." -ForegroundColor Cyan
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

# Copy with progress (excluding unnecessary folders)
$excludeFolders = @('node_modules', 'dist', '.vercel', '.git\objects')
$robocopyArgs = @(
    $sourcePath,
    $destinationPath,
    '/E',           # Copy subdirectories, including empty ones
    '/XD',          # Exclude directories
    'node_modules',
    'dist',
    '.vercel',
    '/NDL',         # No Directory List
    '/NP',          # No Progress
    '/R:0',         # 0 retries
    '/W:0'          # 0 wait between retries
)

$result = robocopy @robocopyArgs

if ($LASTEXITCODE -le 7) {
    Write-Host "✓ Files copied successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  Some files may not have copied correctly" -ForegroundColor Yellow
}
Write-Host ""

# Step 6: Reinstall dependencies
Write-Host "[Step 6/8] Installing dependencies..." -ForegroundColor Cyan
Write-Host "Running npm install..." -ForegroundColor Yellow
Push-Location $destinationPath
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  There were issues installing dependencies" -ForegroundColor Yellow
}
Pop-Location
Write-Host ""

# Step 7: Verify Git repository
Write-Host "[Step 7/8] Verifying Git repository..." -ForegroundColor Cyan
Push-Location $destinationPath
$gitRemote = git remote -v
if ($gitRemote) {
    Write-Host "✓ Git repository verified" -ForegroundColor Green
    Write-Host "Remote: $($gitRemote[0])" -ForegroundColor Gray
} else {
    Write-Host "⚠️  Git remote not found" -ForegroundColor Yellow
}
Pop-Location
Write-Host ""

# Step 8: Final instructions
Write-Host "[Step 8/8] Migration Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open the new location in VS Code:" -ForegroundColor White
Write-Host "   code '$destinationPath'" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Test the development server:" -ForegroundColor White
Write-Host "   cd '$destinationPath'" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Verify everything works, then:" -ForegroundColor White
Write-Host "   - You can delete the OneDrive folder" -ForegroundColor Yellow
Write-Host "   - Or keep it as backup for a few days" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Update your Git remote if needed:" -ForegroundColor White
Write-Host "   git remote -v" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Offer to open VS Code
$openVSCode = Read-Host "Open VS Code in new location now? (y/n)"
if ($openVSCode -eq 'y') {
    code $destinationPath
    Write-Host "✓ VS Code launched" -ForegroundColor Green
}

Write-Host ""
Write-Host "Migration complete! Enjoy the improved performance! 🚀" -ForegroundColor Green
