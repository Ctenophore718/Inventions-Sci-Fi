# Fix type definitions in LevelUpClass* files

$files = @(
    "src\components\LevelUpClassContemplative.tsx",
    "src\components\LevelUpClassDevout.tsx",
    "src\components\LevelUpClassElementalist.tsx",
    "src\components\LevelUpClassExospecialist.tsx",
    "src\components\LevelUpClassGunslinger.tsx",
    "src\components\LevelUpClassTechnician.tsx"
)

foreach ($file in $files) {
    $path = Join-Path $PWD $file
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        
        # Fix _sheet to sheet in type definition
        $content = $content -replace '(type LevelUpClass\w+Props = \{[^}]*)\n  _sheet:', '$1' + "`n  sheet:"
        
        # Fix _subclass to _subclass in type definition and function parameter
        $content = $content -replace '(type LevelUpClass\w+Props = \{[^}]*\n[^}]*)\n  subclass:', '$1' + "`n  _subclass:"
        $content = $content -replace '(\n  charClass,\s*\n)  subclass,', '$1  // eslint-disable-next-line @typescript-eslint/no-unused-vars' + "`n  _subclass,"
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed $file"
    }
}

Write-Host "`nDone!"
