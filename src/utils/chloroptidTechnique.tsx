import React from 'react';

export interface ChloroptidTechniqueData {
  aoeChain: number;
  awayDistance: number;
  cooldown: number;
}

/**
 * Calculate Unusual Growth technique values based on species card dots
 */
export function calculateUnusualGrowthData(speciesCardDots?: boolean[][]): ChloroptidTechniqueData {
  // Get the number of '+2hx-Chain AoE' dots selected (index 1 for technique AoE)
  const aoeDots = speciesCardDots?.[1] || [];
  const aoeChain = 1 + aoeDots.filter(Boolean).length * 2;

  // Get the number of '+1hx away' dots selected (index 2)
  const awayDots = speciesCardDots?.[2] || [];
  const awayDistance = 1 + awayDots.filter(Boolean).length;

  // Get the number of '-1 Cooldown' dots selected (index 3)
  const cooldownDots = (speciesCardDots?.[3]?.filter(Boolean).length || 0);
  const cooldown = Math.max(1, 4 - cooldownDots); // Minimum cooldown is 1

  return { aoeChain, awayDistance, cooldown };
}

/**
 * Generate the Unusual Growth technique JSX with dynamic values (for Level Up page)
 */
export function generateUnusualGrowthJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { aoeChain, awayDistance, cooldown } = calculateUnusualGrowthData(speciesCardDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#315f2b', fontSize: '1em' }}>Unusual Growth</i></b> <i style={{ color: '#38761d', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You produce a wall of shrubbery in an <i>AoE</i> <b>[{aoeChain}]</b>hx-Chain originating <b>[{awayDistance}]</b>hx away from you. This shrubbery provides 100% Cover, each hx has 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and each enemy on or adjacent to the created Cover suffers the <b><i>Restrain</i></b> condition.
    </span>
  );
}

/**
 * Generate Unusual Growth description JSX for Cards page (without title and cooldown)
 */
export function generateUnusualGrowthCardJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { aoeChain, awayDistance } = calculateUnusualGrowthData(speciesCardDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You produce a wall of shrubbery in an <i>AoE</i> <b>[{aoeChain}]</b>hx-Chain originating <b>[{awayDistance}]</b>hx away from you. This shrubbery provides 100% Cover, each hx has 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and each enemy on or adjacent to the created Cover suffers the <b><i>Restrain</i></b> condition.
    </span>
  );
}
