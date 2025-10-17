import React from 'react';

export interface ContemplativeSecondaryAttackData {
  dieSizeDots: number;
  damageDice: number;
  critDots: number;
  cooldownDots: number;
  dieSize: number;
  critThreshold: number;
  cooldownValue: number;
}

/**
 * Calculate Contemplative secondary attack values based on class card dots
 */
export function calculateContemplativeSecondaryAttackData(classCardDots?: boolean[][]): ContemplativeSecondaryAttackData {
  // Get die size increase dots (array index 8)
  const dieSizeDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  
  // Get damage die dots (array index 9)
  const damageDieDots = classCardDots?.[9]?.filter(Boolean).length || 0;
  const damageDice = 2 + damageDieDots; // Base 2 + 1 per dot
  
  // Get crit dots (array index 10)
  const critDots = classCardDots?.[10]?.filter(Boolean).length || 0;
  
  // Get cooldown dots (array index 11)
  const cooldownDots = classCardDots?.[11]?.filter(Boolean).length || 0;
  
  // Calculate die size: base 8, +2 per dot
  const dieSize = 8 + dieSizeDots * 2;
  
  // Calculate crit threshold: 18 minus crit dots
  const critThreshold = 18 - critDots;
  
  // Calculate cooldown: base 4 minus cooldown dots
  const cooldownValue = 4 - cooldownDots;
  
  return { dieSizeDots, damageDice, critDots, cooldownDots, dieSize, critThreshold, cooldownValue };
}

/**
 * Generate the secondary attack stats for Contemplative
 */
export function generateContemplativeSecondaryAttackStatsJSX(
  classCardDots?: boolean[][]
): React.ReactElement {
  const { damageDice, dieSize, critThreshold } = calculateContemplativeSecondaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 1hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single<br />
        <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b><br />
        <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b>
      </div>
    </div>
  );
}
