import React from 'react';

export interface NecroSecondaryAttackData {
  damageDie: number;
  critEffectDie: number;
  critThreshold: number;
  cooldown: number;
  speed: number;
}

/**
 * Calculate Necro secondary attack values based on subclass dots
 */
export function calculateNecroSecondaryAttackData(
  attackSpeedDots?: boolean[],
  attackDamageDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[]
): NecroSecondaryAttackData {
  // Speed: 4 + speed dots
  const speed = (attackSpeedDots?.filter(Boolean).length || 0);
  // Damage and Crit Effect dice: 1 + damage dots
  const damageDie = 1 + (attackDamageDots?.filter(Boolean).length || 0);
  const critEffectDie = 1 + (attackDamageDots?.filter(Boolean).length || 0);
  // Crit threshold: 18 - crit dots
  const critThreshold = 18 - (attackCritDots?.filter(Boolean).length || 0);
  // cooldown: 4 - cooldown dots
  const _cooldown = 4 - (attackCooldownDots?.filter(Boolean).length || 0);
  return { speed, damageDie, critEffectDie, critThreshold, cooldown: _cooldown };
}

/**
 * Generate the secondary attack stats for Necro Chem Zombie cards
 */
export function generateNecroSecondaryAttackStatsJSX(
  attackSpeedDots?: boolean[],
  attackDamageDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[],
  chemZombieName?: string,
  _cost?: number
): React.ReactElement {
  const { speed, damageDie, critEffectDie, critThreshold, cooldown: _cooldown } = calculateNecroSecondaryAttackData(
    attackSpeedDots,
    attackDamageDots,
    attackCritDots,
    attackCooldownDots
  );

  if (chemZombieName === "Synthetic Corpse") {
    return (
      <div style={{ fontSize: '0.8em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Summon</u></b> 1 <b><i style={{ color: '#990000', fontSize: '1em' }}>Hit Point</i></b></span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Chem Token</u></b> 2, create +1 <i>Chem Zombie</i> <br />
          <b><u><i><span style={{ color: '#38761d' }}>Speed</span></i></u></b> 4+<b>[{speed}]</b>hx <br />
          <b><u>Range</u></b> 1hx <br />
          <b><u>Target</u></b> <i>AoE</i> 3hx-cone <br />
          <b><u>Damage</u></b> <b>[{damageDie}]</b>d6, <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, Self-Destruct <br />
          <b><u>Crit Effect</u></b> <b>[{critEffectDie}]</b>d6 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i> (<u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u>)</b></span>
        </div>
      </div>
    );
  }

  // Default case for other Chem Zombies (if any are added later)
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Summon</u></b> 1 <b><i style={{ color: '#990000', fontSize: '1em' }}>Hit Point</i></b></span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Chem Token</u></b> 2, create +1 <i>Chem Zombie</i> <br />
        <b><u><i><span style={{ color: '#38761d' }}>Speed</span></i></u></b> {speed}hx <br />
        <b><u>Range</u></b> 1hx <br />
        <b><u>Target</u></b> <i>AoE</i> 3hx-cone <br />
        <b><u>Damage</u></b> <b>[{damageDie}]</b>d6, Self-Destruct <br />
        <b><u>Crit Effect</u></b> <b>[{critEffectDie}]</b>d6
      </div>
    </div>
  );
}