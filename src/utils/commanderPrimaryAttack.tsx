import React from 'react';

export interface CommanderPrimaryAttackData {
  damageBonus: number;
  critBonus: number;
  baseDamage: number;
  critThreshold: number;
}

/**
 * Calculate Commander primary attack values based on class card dots
 */
export function calculateCommanderPrimaryAttackData(
  classCardDots?: boolean[][],
  subclass?: string,
  tacticianFeatureCritDots?: boolean[]
): CommanderPrimaryAttackData {
  // Get damage die dots (array index 6)
  const damageDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  // Get crit dots (array index 7)
  const critDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  
  // Calculate base damage dice: 1 + damage dots
  const baseDamage = 1 + damageDots;
  
  // Add Tactician Tactical Offensive crit bonus: base +1, plus +1 per dot (up to 2 dots)
  const tacticianCritBonus = subclass === 'Tactician' 
    ? 1 + (tacticianFeatureCritDots?.filter(Boolean).length || 0) 
    : 0;
  
  // Calculate crit threshold: 18 - crit dots - Tactician bonus
  const critThreshold = 18 - critDots - tacticianCritBonus;
  
  return { damageBonus: damageDots, critBonus: critDots, baseDamage, critThreshold };
}

/**
 * Generate the primary attack stats for Commander cards
 */
export function generateCommanderPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  rifleName?: string,
  subclass?: string,
  tacticianFeatureCritDots?: boolean[]
): React.ReactElement {
  const { baseDamage, critThreshold } = calculateCommanderPrimaryAttackData(classCardDots, subclass, tacticianFeatureCritDots);
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 10hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single <br />
        {rifleName === 'Plasma Rifle' ? (
          <>
            <b><u>Damage</u></b> <b>[{baseDamage}]</b>d6 <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{baseDamage}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Spike</i></b><br /> 
            <div style={{ textAlign: 'right', width: '100%' }}><b>(<u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u>)</b></div>   
          </>
        ) : rifleName === 'Sapper Gun' ? (
          <>
            <b><u>Damage</u></b> <b>[{baseDamage}]</b>d6 <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{baseDamage}]</b>d6 <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Drain</i></b>
          </>
        ) : (
          <>
            <b><u>Damage</u></b> <b>[{baseDamage}]</b>d6 <br />
            <b><u>Crit Effect</u></b> <b>[{baseDamage}]</b>d6
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the rifle cost
 */
export function getRifleCost(rifleName: string): number {
  switch (rifleName) {
    case 'Plasma Rifle': return 150;
    case 'Sapper Gun': return 150;
    default: return 0;
  }
}
