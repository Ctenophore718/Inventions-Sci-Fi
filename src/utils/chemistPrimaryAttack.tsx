import React from 'react';

export interface ChemistPrimaryAttackData {
  dieSizeDots: number;
  critDots: number;
  dieSize: number;
  critThreshold: number;
}

/**
 * Calculate Chemist primary attack values based on class card dots
 */
export function calculateChemistPrimaryAttackData(classCardDots?: boolean[][]): ChemistPrimaryAttackData {
  // Get die size dots (array index 6)
  const dieSizeDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  // Get crit dots (array index 7)
  const critDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  
  // Calculate die size: 6 -> 8 -> 10 -> 12
  const dieSize = dieSizeDots === 0 ? 6 : dieSizeDots === 1 ? 8 : dieSizeDots === 2 ? 10 : 12;
  
  // Calculate crit threshold: 18 -> 17 -> 16 -> 15
  const critThreshold = 18 - critDots;
  
  return { dieSizeDots, critDots, dieSize, critThreshold };
}

/**
 * Generate the primary attack stats for Chemist cards
 */
export function generateChemistPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  cost?: number
): React.ReactElement {
  const { dieSize, critThreshold } = calculateChemistPrimaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ marginBottom: '6px' }}>
        <b><u>Range</u></b> 8hx <br />
        <b><u>Crit</u></b> <b>[{critThreshold}]</b>+ <br />
        <b><u>Target</u></b> Single <br />
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <br />
        <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>
      </div>
      {cost && (
        <div style={{ fontStyle: 'italic', color: '#666', fontSize: '0.9em' }}>
          Cost: {cost}c
        </div>
      )}
    </div>
  );
}

/**
 * Get the dart gun cost
 */
export function getDartGunCost(dartGunName: string): number {
  switch (dartGunName) {
    case 'Chem Gun': return 150;
    case 'Happy Pill Pusher': return 160;
    case 'Sour Juicer': return 160;
    case 'Prickly Goo': return 175;
    default: return 0;
  }
}
