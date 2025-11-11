import React from 'react';

export interface AvenochTechniqueData {
  rangeBonus: number;
  cooldown: number;
}

/**
 * Calculate Avian Gaze technique values based on species card dots
 */
export function calculateAvianGazeData(speciesCardDots?: boolean[][]): AvenochTechniqueData {
  // Get the number of '+2hx Range' dots selected (index for technique range)
  const rangeDots = speciesCardDots?.[3] || [];
  const rangeBonus = 2 * (rangeDots.filter(Boolean).length || 0);

  // Get the number of '-1 Cooldown' dots selected
  const cooldownDots = (speciesCardDots?.[4]?.filter(Boolean).length || 0);
  const cooldown = Math.max(1, 3 - cooldownDots); // Minimum cooldown is 1

  return { rangeBonus, cooldown };
}

/**
 * Generate the Avian Gaze technique JSX with dynamic values (for Level Up page)
 */
export function generateAvianGazeJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { rangeBonus, cooldown } = calculateAvianGazeData(speciesCardDots);
  const totalRange = 5 + rangeBonus;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i>Avian Gaze</i></b> <i>(Cooldown <b style={{ fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the start of the next round, non-cone Attacks made by you or your allies within <b>[{totalRange}]</b>hx get +2hx Range.
    </span>
  );
}

/**
 * Generate Avian Gaze description JSX for Cards page (without title and cooldown)
 */
export function generateAvianGazeCardJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { rangeBonus } = calculateAvianGazeData(speciesCardDots);
  const totalRange = 5 + rangeBonus;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Until the start of the next round, non-cone Attacks made by you or your allies within <b>[{totalRange}]</b>hx get +2hx Range.
    </span>
  );
}
