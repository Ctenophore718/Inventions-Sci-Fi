import React from 'react';

export interface TacticianFeatureData {
  range: number;
  crit: number;
  speed: number;
}

/**
 * Calculate Tactician Feature values based on progression dots
 */
export function calculateTacticianFeatureData(
  rangeHxDots?: boolean[],
  critDots?: boolean[],
  speedDots?: boolean[]
): TacticianFeatureData {
  // Base range is 3hx
  const range = 3 + (rangeHxDots?.filter(Boolean).length || 0);
  
  // Base crit is +1, can add up to +2 more
  const crit = 1 + (critDots?.filter(Boolean).length || 0);
  
  // Base speed is +1, can add up to +2 more
  const speed = 1 + (speedDots?.filter(Boolean).length || 0);
  
  return { range, crit, speed };
}

/**
 * Generate the Tactician Feature JSX with dynamic values
 */
export function generateTacticalOffensiveJSX(
  rangeHxDots?: boolean[],
  critDots?: boolean[],
  speedDots?: boolean[]
): React.ReactElement {
  const { range, crit, speed } = calculateTacticianFeatureData(rangeHxDots, critDots, speedDots);

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <b><i style={{ color: '#cec31f', fontSize: '1em' }}>Tactical Offensive.</i></b> At the beginning of the round, you and allies within <b>[{range}]</b>hx of you ignore <i>Rough Terrain</i>, gain +<b>[{crit}]</b> to Crit rolls and +<b>[{speed}]</b> <b><i style={{ color: '#38761d', fontSize: '1em' }}>Speed</i></b> until the end of their turn.
    </div>
  );
}
