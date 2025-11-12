import React from 'react';

export interface AvenochTechniqueData {
  rangeBonus: number;
  cooldown: number;
}

/**
 * Calculate Avian Gaze technique values based on species card dots
 */
export function calculateAvianGazeData(speciesCardDots?: boolean[][]): AvenochTechniqueData {
  // Get the number of '+2hx Range' dots selected (index 2 for technique range)
  const rangeDots = speciesCardDots?.[2] || [];
  const rangeBonus = rangeDots.filter(Boolean).length * 2;

  // Get the number of '-1 Cooldown' dots selected (index 3)
  const cooldownDots = (speciesCardDots?.[3]?.filter(Boolean).length || 0);
  const cooldown = Math.max(1, 3 - cooldownDots); // Minimum cooldown is 1

  return { rangeBonus, cooldown };
}

/**
 * Generate the Avian Gaze technique JSX with dynamic values (for Level Up page)
 */
export function generateAvianGazeJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { rangeBonus, cooldown } = calculateAvianGazeData(speciesCardDots);
  const totalRange = 2 + rangeBonus;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b5f59', fontSize: '1em' }}>Avian Gaze</i></b> <i style={{ color: '#2b5f59', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the start of the next round, non-Cone <b><i style={{ color: '#990000' }}>Attacks</i></b> made by you or your allies within 5hx get +<b>[{totalRange}]</b>hx Range.
    </span>
  );
}

/**
 * Generate Avian Gaze description JSX for Cards page (without title and cooldown)
 */
export function generateAvianGazeCardJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { rangeBonus } = calculateAvianGazeData(speciesCardDots);
  const totalRange = 2 + rangeBonus;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Until the start of the next round, non-Cone <b><i style={{ color: '#990000' }}>Attacks</i></b> made by you or your allies within 5hx get +<b>[{totalRange}]</b>hx Range.
    </span>
  );
}
