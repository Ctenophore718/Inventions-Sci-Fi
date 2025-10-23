import React from 'react';

export interface ElementalistTechniqueData {
  tripleDamage: boolean;
  cooldown: number;
}

/**
 * Calculate Elementalist technique values based on class card dots
 */
export function calculateElementalistTechniqueData(classCardDots?: boolean[][]): ElementalistTechniqueData {
  // Get the "Triple Damage dice" dot (array index 2)
  const tripleDamageDot = classCardDots?.[2]?.[0] || false;
  const tripleDamage = tripleDamageDot;
  
  // Get the number of '-1 Cooldown' dots selected (array index 3)
  const cooldownDots = classCardDots?.[3]?.filter(Boolean).length || 0;
  const cooldown = Math.max(2, 4 - cooldownDots); // Minimum cooldown is 2
  
  return { tripleDamage, cooldown };
}

/**
 * Generate the Commune technique JSX with dynamic values
 */
export function generateCommuneJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { tripleDamage, cooldown } = calculateElementalistTechniqueData(classCardDots);
  const damageMultiplier = tripleDamage ? 'triple' : 'double';
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      <i><span style={{ color: '#231172' }}><b>Commune</b> (Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</span></i> You deal {damageMultiplier} Damage dice with your next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>.
    </span>
  );
}

/**
 * Generate only the technique description for the Cards page (without title and cooldown)
 */
export function generateCommuneDescriptionJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { tripleDamage } = calculateElementalistTechniqueData(classCardDots);
  const damageMultiplier = tripleDamage ? 'triple' : 'double';
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      You deal {damageMultiplier} Damage dice with your next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>.
    </span>
  );
}
