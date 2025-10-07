# Script to add underscore prefix to unused parameters to fix TypeScript warnings

$files = @(
    "src\components\LevelUpClassCoder.tsx",
    "src\components\LevelUpClassCommander.tsx",
    "src\components\LevelUpClassContemplative.tsx",
    "src\components\LevelUpClassDevout.tsx",
    "src\components\LevelUpClassElementalist.tsx",
    "src\components\LevelUpClassExospecialist.tsx",
    "src\components\LevelUpClassGunslinger.tsx",
    "src\components\LevelUpClassTechnician.tsx",
    "src\utils\anatomistSecondaryAttack.tsx",
    "src\utils\coderPrimaryAttack.tsx",
    "src\utils\coderSecondaryAttack.tsx",
    "src\utils\grenadierSecondaryAttack.tsx",
    "src\utils\grenadierTechnique.tsx",
    "src\utils\divinistTechnique.tsx",
    "src\utils\necroSecondaryAttack.tsx",
    "src\utils\necroTechnique.tsx",
    "src\utils\poisonerSecondaryAttack.tsx",
    "src\utils\poisonerTechnique.tsx",
    "src\utils\naturalistStrike.tsx",
    "src\utils\technologistStrike.tsx"
)

foreach ($file in $files) {
    $path = Join-Path $PWD $file
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        
        # Add underscore prefix to unused parameters
        $content = $content -replace '(\s+)cost(\??: number)', '$1_cost$2'
        $content = $content -replace '(\s+)cooldown([:,])', '$1_cooldown$2'
        $content = $content -replace '(\s+)sheet(:\s*CharacterSheet)', '$1_sheet$2'
        $content = $content -replace '(\s+)subclass(,\s*$)', '$1_subclass$2'
        $content = $content -replace '(\s+)onXpSpChange(,\s*$)', '$1_onXpSpChange$2'
        $content = $content -replace '(\s+)poisonerTechniqueCooldownDots(,\s*$)', '$1_poisonerTechniqueCooldownDots$2'
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed $file"
    }
}

Write-Host "`nDone!"
