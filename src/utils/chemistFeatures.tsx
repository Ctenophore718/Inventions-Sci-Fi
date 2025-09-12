import React from 'react';

export interface ChemistFeatureData {
  chemTokenMax: number;
  critBonus: number;
}

/**
 * Calculate Chemist feature values based on class card dots
 */
export function calculateChemistFeatureData(classCardDots?: boolean[][]): ChemistFeatureData {
  // Get the number of Chem Token max dots selected (array index 0)
  const chemTokenDots = classCardDots?.[0] || [];
  const chemTokenMax = 3 + chemTokenDots.filter(Boolean).length;
  
  // Get the number of +2 Crit dots selected (array index 1)
  const critDots = classCardDots?.[1] || [];
  const critBonus = 2 * critDots.filter(Boolean).length;
  
  return { chemTokenMax, critBonus };
}

/**
 * Generate the Chemical Reaction feature JSX with dynamic values
 */
export function generateChemicalReactionJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { chemTokenMax, critBonus } = calculateChemistFeatureData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#721131' }}>Chemical Reaction.</i></b> At the start of each round, you gain 1 <i>Chem Token</i>, up to a maximum of <b>[{chemTokenMax}]</b> <i>Chem Tokens</i>. While you have at least 1 <i>Chem Token</i>, your <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> gains a +<b>[{critBonus}]</b> Crit and deals +1 Damage die.
    </span>
  );
}
