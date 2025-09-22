import React from 'react';

export interface GrenadierSecondaryAttackData {
  damageDie: number;
  critEffectDie: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Anatomist secondary attack values based on subclass dots
 */
export function calculateGrenadierSecondaryAttackData(
  attackDamageDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[],
  attackAoEDots?: boolean[]
): GrenadierSecondaryAttackData & { aoeRadius: number } {
  // Damage and Crit Effect dice: 6 + 2 * dots (matching Level Up page calculation)
  const damageDie = 6 + 2 * (attackDamageDots?.filter(Boolean).length || 0);
  const critEffectDie = 6 + 2 * (attackDamageDots?.filter(Boolean).length || 0);
  // Crit threshold: 18 - crit dots
  const critThreshold = 18 - (attackCritDots?.filter(Boolean).length || 0);
  // Cooldown: 4 - cooldown dots
  const cooldown = 4 - (attackCooldownDots?.filter(Boolean).length || 0);
  const aoeRadius = 2 + (attackAoEDots?.filter(Boolean).length || 0);
  return { damageDie, critEffectDie, critThreshold, cooldown, aoeRadius };
}

/**
 * Generate the secondary attack stats for Grenadier Grenades Cards
 */
export function generateGrenadierSecondaryAttackStatsJSX(
  attackDamageDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[],
  attackAoEDots?: boolean[],
  grenadeName?: string,
  cost?: number
): React.ReactElement {
  const { damageDie, critEffectDie, critThreshold, cooldown, aoeRadius } = calculateGrenadierSecondaryAttackData(
    attackDamageDots,
    attackCritDots,
    attackCooldownDots,
    attackAoEDots
  );

  if (grenadeName === "Amethyst Blast") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 6hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-radius <br />
          <b><u>Damage</u></b> 1d<b>[{damageDie}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 3hx <br />
          <b><u>Crit Effect</u></b> 1d<b>[{damageDie}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Confuse</i></b>
        </div>
      </div>
    );
  }

    if (grenadeName === "Void Grenade") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 6hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-radius <br />
          <b><u>Damage</u></b> 1d<b>[{damageDie}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 3hx <br />
          <b><u>Crit Effect</u></b> 1d<b>[{damageDie}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Restrain</i></b>, <br />
          <span style={{ display: 'block', textAlign: 'right' }}>pull the Target up to 6hx <br />towards the center of <i>AoE</i></span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 1hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single <br />
        <b><u>Chem Token</u></b> <br />
        <b><u>Damage</u></b> <b>[{damageDie}]</b>d8, <b><i>Confuse</i></b> <br />
        <b><u>Crit Effect</u></b> <b>[{critEffectDie}]</b>d8 <br />
      </div>
    </div>
  );
}
