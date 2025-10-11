import React from 'react';

export interface GalvanicFeatureData {
  range: number;
  hitPoints: string;
}

/**
 * Calculate Galvanic subclass feature values based on progression dots
 */
export function calculateGalvanicFeatureData(
  galvanicFeatureHxDots?: boolean[],
  galvanicFeatureHpDots?: boolean[]
): GalvanicFeatureData {
  // Base range is 3hx
  let range = 3;
  
  // Add 1hx for each +1hx dot selected
  if (galvanicFeatureHxDots) {
    range += galvanicFeatureHxDots.filter(Boolean).length;
  }
  
  // Calculate hit points
  let hitPointDice = 1;
  if (galvanicFeatureHpDots) {
    hitPointDice += galvanicFeatureHpDots.filter(Boolean).length;
  }
  const hitPoints = `${hitPointDice}`;
  
  return {
    range,
    hitPoints
  };
}

/**
 * Generate the Inspiring Presence feature JSX with dynamic values
 */
export function generateInspiringPresenceJSX(
  galvanicFeatureHxDots?: boolean[],
  galvanicFeatureHpDots?: boolean[]
): React.ReactElement {
  const { range, hitPoints } = calculateGalvanicFeatureData(galvanicFeatureHxDots, galvanicFeatureHpDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6fce1f' }}>Inspiring Presence.</i></b> Allies within <b>[{range}]</b>hx of you at the beginning of the round gain +<b>[{hitPoints}]</b>d6 <span style={{ color: '#990000' }}><b><i>Hit Points</i></b></span>.
    </span>
  );
}
