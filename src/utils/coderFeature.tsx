import React from 'react';

export interface CoderFeatureData {
  coverIgnore: string;
  critBonus: number;
}

/**
 * Calculate Coder feature values based on class card dots
 */
export function calculateCoderFeatureData(classCardDots?: boolean[][]): CoderFeatureData {
  // Get the Ignore 100% Cover dot (array index 0)
  const coverDots = classCardDots?.[0] || [];
  const coverIgnore = coverDots[0] ? '100%' : '50%';
  
  // Get the number of +1 Crit dots selected (array index 1)
  const critDots = classCardDots?.[1] || [];
  const critBonus = critDots.filter(Boolean).length;
  
  return { coverIgnore, critBonus };
}

/**
 * Generate the Subtle Magic feature JSX with dynamic values
 */
export function generateSubtleMagicJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { coverIgnore, critBonus } = calculateCoderFeatureData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#112972', fontSize: '1em' }}>Subtle Magic.</i></b>{' '}
      <span style={{ fontSize: '1em', fontWeight: 400 }}>
        Your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> ignore <b>[{coverIgnore}]</b> Cover and gain +<b>[{critBonus}]</b> Crit.
      </span>
    </span>
  );
}