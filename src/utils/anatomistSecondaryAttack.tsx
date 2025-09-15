import React from 'react';

export interface AnatomistSecondaryAttackData {
  damageDie: number;
  critEffectDie: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Anatomist secondary attack values based on subclass dots
 */
export function calculateAnatomistSecondaryAttackData(
  attackDamageDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[]
): AnatomistSecondaryAttackData {
  // Damage and Crit Effect dice: 1 + dots
  const damageDie = 1 + (attackDamageDots?.filter(Boolean).length || 0);
  const critEffectDie = 1 + (attackDamageDots?.filter(Boolean).length || 0);
  // Crit threshold: 18 - crit dots
  const critThreshold = 18 - (attackCritDots?.filter(Boolean).length || 0);
  // Cooldown: 4 - cooldown dots
  const cooldown = 4 - (attackCooldownDots?.filter(Boolean).length || 0);
  return { damageDie, critEffectDie, critThreshold, cooldown };
}

/**
 * Generate the secondary attack stats for Anatomist Super Serum cards
 */
export function generateAnatomistSecondaryAttackStatsJSX(
  attackDamageDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[],
  serumName?: string,
  cost?: number
): React.ReactElement {
  const { damageDie, critEffectDie, critThreshold, cooldown } = calculateAnatomistSecondaryAttackData(
    attackDamageDots,
    attackCritDots,
    attackCooldownDots
  );

  if (serumName === "Jacob's Ladder") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 1hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> Single <br />
          <b><u>Chem Token</u></b> 1, +2d8 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <br />
          <b><u>Damage</u></b> <b>[{damageDie}]</b>d8 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Confuse</i></b> <br />
          <b><u>Crit Effect</u></b> <b>[{critEffectDie}]</b>d8 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Confuse</i></b>, <br />
          <div style={{ textAlign: 'right', width: '100%' }}><b><i>Mesmerize</i></b></div>
        </div>
      </div>
    );
  }

  if (serumName === "Vampirismagoria") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 1hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> Single <br />
          <b><u>Chem Token</u></b> 2, gain 8d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> <br />
          <b><u>Damage</u></b> <b>[{damageDie}]</b>d8 <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Confuse</i></b> <br />
          <b><u>Crit Effect</u></b> <b>[{critEffectDie}]</b>d8 <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Drain</i></b>
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
