# Fix remaining unused variables by prefixing with underscore# PowerShell script to replace unsafe classCardDots.map calls

$content = Get-Content 'src\components\LevelUp.tsx' -Raw

# Fix subclass parameters in LevelUp Class components$content = $content -replace '\s+const newDots = classCardDots\.map\(row => \[\.\.\. row\]\);', '                                const newDots = safeCloneClassCardDots();'

Get-ChildItem "src\components\LevelUpClassContemplative.tsx", "src\components\LevelUpClassDevout.tsx", "src\components\LevelUpClassExospecialist.tsx", "src\components\LevelUpClassGunslinger.tsx", "src\components\LevelUpClassTechnician.tsx" | ForEach-Object {$content | Set-Content 'src\components\LevelUp.tsx' -NoNewline

    $content = Get-Content $_.FullName -RawWrite-Host "Replacement complete"

    # Replace "subclass," with "_subclass," in parameter list
    $content = $content -replace '(\n\s+charClass,\s*\n\s+)subclass,', '$1_subclass,'
    # Replace "subclass:" with "_subclass:" in type definition
    $content = $content -replace '(\n\s+charClass: string;\s*\n\s+)subclass:', '$1_subclass:'
    Set-Content $_.FullName $content -NoNewline
    Write-Host "Fixed $($_.Name)"
}

# Fix unused cooldown destructuring
$cooldownFiles = @(
    "src\utils\anatomistSecondaryAttack.tsx",
    "src\utils\divinistTechnique.tsx",
    "src\utils\grenadierSecondaryAttack.tsx",
    "src\utils\grenadierTechnique.tsx",
    "src\utils\necroSecondaryAttack.tsx",
    "src\utils\necroTechnique.tsx",
    "src\utils\poisonerSecondaryAttack.tsx",
    "src\utils\poisonerTechnique.tsx"
)

foreach ($file in $cooldownFiles) {
    $path = Join-Path $PWD $file
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        $content = $content -replace ', cooldown \}', ', cooldown: _cooldown }'
        $content = $content -replace ', cooldown \) =', ', cooldown: _cooldown ) ='
        $content = $content -replace 'const cooldown =', 'const _cooldown ='
        $content = $content -replace 'poisonerTechniqueCooldownDots,', '_poisonerTechniqueCooldownDots,'
        Set-Content $path $content -NoNewline
        Write-Host "Fixed $([System.IO.Path]::GetFileName($file))"
    }
}

# Fix unused helper functions by prefixing with underscore
Get-ChildItem "src\components\LevelUpClass*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace '(\n\s+)const handleDotClick =', '$1const _handleDotClick ='
    $content = $content -replace '(\n\s+)const handleSpDotClick =', '$1const _handleSpDotClick ='
    Set-Content $_.FullName $content -NoNewline
    Write-Host "Fixed $($_.Name)"
}

Write-Host "`nDone!"
