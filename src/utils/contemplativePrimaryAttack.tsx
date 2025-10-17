import React from 'react';

export interface ContemplativePrimaryAttackData {
  repeatCount: number;
  dieSizeDots: number;
  critDots: number;
  dieSize: number;
  critThreshold: number;
}

/**
 * Calculate Contemplative primary attack values based on class card dots
 */
export function calculateContemplativePrimaryAttackData(classCardDots?: boolean[][]): ContemplativePrimaryAttackData {
  // Get repeat dots (array index 5)
  const repeatDots = classCardDots?.[5]?.filter(Boolean).length || 0;
  const repeatCount = 1 + repeatDots; // Base 1 + repeat dots
  
  // Get die size dots (array index 6)
  const dieSizeDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  
  // Get crit dots in Primary Attack section (array index 7)
  const critDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  
  // Calculate die size: base 6, +2 per dot
  const dieSize = 6 + dieSizeDots * 2;
  
  // Calculate crit threshold: 18 minus crit dots
  const critThreshold = 18 - critDots;
  
  return { repeatCount, dieSizeDots, critDots, dieSize, critThreshold };
}

/**
 * Generate the primary attack stats for Contemplative
 */
export function generateContemplativePrimaryAttackStatsJSX(
  classCardDots?: boolean[][]
): React.ReactElement {
  const { repeatCount, dieSize, critThreshold } = calculateContemplativePrimaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 10hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single<br />
        <b><u>Repeat</u></b> <b>[{repeatCount}]</b><br />
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b><br />
        <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>
      </div>
    </div>
  );
}
