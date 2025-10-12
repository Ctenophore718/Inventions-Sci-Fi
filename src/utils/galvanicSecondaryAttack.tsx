import React from 'react';

export interface GalvanicSecondaryAttackData {
  aoe: number;
  crit: number;
  damage: string;
  cooldown: number;
}

/**
 * Calculate Galvanic subclass secondary attack (Sabres) values based on progression dots
 */
export function calculateGalvanicSecondaryAttackData(
  galvanicAttackAoEDots?: boolean[],
  galvanicAttackDamageDots?: boolean[],
  galvanicAttackCritDots?: boolean[],
  galvanicAttackCooldownDots?: boolean[]
): GalvanicSecondaryAttackData {
  // Base values
  const range = 1;
  
  // Base AoE is 1hx-radius
  let aoe = 1;
  
  // Add 1hx-radius for each AoE dot selected
  if (galvanicAttackAoEDots) {
    aoe += galvanicAttackAoEDots.filter(Boolean).length;
  }
  
  // Base crit is 18+
  let crit = 18;
  
  // Subtract 1 for each crit dot selected (making it easier to crit)
  if (galvanicAttackCritDots) {
    crit -= galvanicAttackCritDots.filter(Boolean).length;
  }
  
  // Base damage is 1d8
  let damageDice = 1;
  
  // Add 1 die for each damage dot selected
  if (galvanicAttackDamageDots) {
    damageDice += galvanicAttackDamageDots.filter(Boolean).length;
  }
  const damage = `${damageDice}`;
  
  // Base cooldown is 4
  let cooldown = 4;
  
  // Subtract 1 for each cooldown dot selected
  if (galvanicAttackCooldownDots) {
    cooldown -= galvanicAttackCooldownDots.filter(Boolean).length;
  }
  
  return {
    aoe,
    crit,
    damage,
    cooldown
  };
}

/**
 * Generate the Sabres secondary attack JSX with dynamic values (for Level Up page)
 */
export function generateGalvanicSecondaryAttackJSX(
  galvanicAttackAoEDots?: boolean[],
  galvanicAttackDamageDots?: boolean[],
  galvanicAttackCritDots?: boolean[],
  galvanicAttackCooldownDots?: boolean[]
): React.ReactElement {
  const { aoe, crit, damage, cooldown } = calculateGalvanicSecondaryAttackData(
    galvanicAttackAoEDots,
    galvanicAttackDamageDots,
    galvanicAttackCritDots,
    galvanicAttackCooldownDots
  );

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>
          <b><u>Range</u></b> 1hx
        </span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}>
          <b><u>Crit</u></b> <b>[{crit}]</b>+
        </span>
      </div>
      <b><u>Target</u></b> <i>AoE</i> <b>[{aoe}]</b>hx-Radius <br />
      <b><u>Damage</u></b> <b>[{damage}]</b>d8
    </div>
  );
}

/**
 * Generate secondary attack stat JSX for Galvanic (for Cards page)
 */
export function generateGalvanicSecondaryAttackStatsJSX(
  galvanicAttackAoEDots?: boolean[],
  galvanicAttackDamageDots?: boolean[],
  galvanicAttackCritDots?: boolean[],
  galvanicAttackCooldownDots?: boolean[],
  sabreName?: string
): React.ReactElement {
  const { aoe, crit, damage } = calculateGalvanicSecondaryAttackData(
    galvanicAttackAoEDots,
    galvanicAttackDamageDots,
    galvanicAttackCritDots,
    galvanicAttackCooldownDots
  );

  if (sabreName === "Phase Sword") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 1hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{crit}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoe}]</b>hx-Radius <br />
          <b><u>Damage</u></b> <b>[{damage}]</b>d8 <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <br />
          <b><u>Crit Effect</u></b> <b>[{damage}]</b>d8 <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Drain</i></b>
        </div>
      </div>
    );
  }

  if (sabreName === "Truthsinger") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 1hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{crit}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoe}]</b>hx-Radius <br />
          <b><u>Damage</u></b> <b>[{damage}]</b>d8 <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <br />
          <b><u>Crit Effect</u></b> <b>[{damage}]</b>d8 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Blind</i></b>
        </div>
      </div>
    );
  }

  
  // Default fallback
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 1hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{crit}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[{aoe}]</b>hx-Radius <br />
        <b><u>Damage</u></b> {damage} <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
          Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
      </div>
    </div>
  );
}
