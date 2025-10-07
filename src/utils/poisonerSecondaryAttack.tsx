import React from 'react';

export interface PoisonerSecondaryAttackData {
  damageDie: number;
  critEffectDie: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Poisoner secondary attack values based on subclass dots
 */
export function calculatePoisonerSecondaryAttackData(
  attackDamageDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[],
  attackAoEDots?: boolean[]
): PoisonerSecondaryAttackData & { aoeRadius: number } {
  // Damage and Crit Effect dice: 1 + damage dots (matching Level Up page calculation)
  const damageDie = 1 + (attackDamageDots?.filter(Boolean).length || 0);
  const critEffectDie = 1 + (attackDamageDots?.filter(Boolean).length || 0);
  // Crit threshold: 18 - crit dots
  const critThreshold = 18 - (attackCritDots?.filter(Boolean).length || 0);
  // cooldown: 4 - cooldown dots
  const _cooldown = 4 - (attackCooldownDots?.filter(Boolean).length || 0);
  const aoeRadius = 2 + (attackAoEDots?.filter(Boolean).length || 0);
  return { damageDie, critEffectDie, critThreshold, cooldown: _cooldown, aoeRadius };
}

/**
 * Generate the secondary attack stats for Poisoner Noxious Fumes Cards
 */
export function generatePoisonerSecondaryAttackStatsJSX(
  attackDamageDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[],
  attackAoEDots?: boolean[],
  noxiousFumeName?: string,
  _cost?: number
): React.ReactElement {
  const { damageDie, critEffectDie, critThreshold, cooldown: _cooldown, aoeRadius } = calculatePoisonerSecondaryAttackData(
    attackDamageDots,
    attackCritDots,
    attackCooldownDots,
    attackAoEDots
  );

  if (noxiousFumeName === "Brainstorm") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> Self</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-radius <br />
          <b><u>Damage</u></b> <b>[{damageDie}]</b>d4  <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, leaves 
            <span style={{ display: 'block', textAlign: 'right' }}><i>Dangerous Terrain</i> <i>(<b>Mesmerize</b>, <br /></i>affects<i> <b><span style={{ color: '#38761d' }}>Fly</span></b>)</i> for 1 round</span>
          <b><u>Crit Effect</u></b> <b>[{critEffectDie}]</b>d4 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Confuse</i></b>
        </div>
      </div>
    );
  }

  if (noxiousFumeName === "Color Spray") {
    return (
      <div style={{ fontSize: '0.85em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> Self</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-radius <br />
          <b><u>Damage</u></b> <b>[{damageDie}]</b>d4 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}> Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, 
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}> Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}> Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}> Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, or <br /><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}> Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, leaves <i>Dangerous <br />Terrain</i> <i>(<b>Sleep</b>, </i>affects<i> <b><span style={{ color: '#38761d' }}>Fly</span></b>)</i></span>
          <b><u>Crit Effect</u></b> <b>[{critEffectDie}]</b>d4 (same Damage type),
        <span style={{ display: 'block', textAlign: 'right' }}><i><b>Spike</b> (same Damage type)</i></span>

        </div>
      </div>
    );
  }

  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> Self</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-radius <br />
        <b><u>Damage</u></b> <b>[{damageDie}]</b>d4, <i>Dangerous Terrain</i> <i>(affects <b><span style={{ color: '#38761d' }}>Fly</span></b>)</i> <br />
        <b><u>Crit Effect</u></b> <b>[{critEffectDie}]</b>d4
      </div>
    </div>
  );
}
