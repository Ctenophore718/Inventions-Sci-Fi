import React from 'react';

export interface BeguilerFeatureData {
  range: number;
}

/**
 * Calculate Beguiler subclass feature values based on progression dots
 */
export function calculateBeguilerFeatureData(
  beguilerFeatureHxDots?: boolean[]
): BeguilerFeatureData {
  // Base range is 3hx
  let range = 3;
  
  // Add 1hx for each +1hx dot selected
  if (beguilerFeatureHxDots) {
    range += beguilerFeatureHxDots.filter(Boolean).length;
  }
  
  return {
    range
  };
}

/**
 * Generate the Loyal Servants feature JSX with dynamic values
 */
export function generateLoyalServantsJSX(
  beguilerFeatureHxDots?: boolean[]
): React.ReactElement {
  const { range } = calculateBeguilerFeatureData(beguilerFeatureHxDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#ff43da' }}>Loyal Servants.</i></b> You control allies within <b>[{range}]</b>hx of you when they suffer the <b><i>Confuse</i></b> or <b><i>Mesmerize</i></b> condition. Additionally, whenever you're targeted by an <span style={{ color: '#990000' }}><b><i>Attack</i></b></span>, an ally of your choice within <b>[{range}]</b>hx of you is targeted instead and suffers the <b><i>Confuse</i></b> condition.
    </span>
  );
}
