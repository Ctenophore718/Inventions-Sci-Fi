# PowerShell script to replace unsafe classCardDots.map calls
$content = Get-Content 'src\components\LevelUp.tsx' -Raw
$content = $content -replace '\s+const newDots = classCardDots\.map\(row => \[\.\.\. row\]\);', '                                const newDots = safeCloneClassCardDots();'
$content | Set-Content 'src\components\LevelUp.tsx' -NoNewline
Write-Host "Replacement complete"
