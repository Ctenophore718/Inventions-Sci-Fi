import React from 'react';

export interface MemoryManifestData {
  rangeBonus: number;
  cooldown: number;
  includesInactive: boolean;
}

export interface LimitPushData {
  rangeBonus: number;
  cooldown: number;
  cooldownTokens: number;
}

/**
 * Calculate Memory Manifest technique values based on species card dots
 */
export function calculateMemoryManifestData(speciesCardDots?: boolean[][]): MemoryManifestData {
  // Get the number of '+1hx Range' dots selected (index 3)
  const rangeDots = speciesCardDots?.[3] || [];
  const rangeBonus = rangeDots.filter(Boolean).length;

  // Get the 'Includes Inactive Techniques' dot (index 4)
  const includesInactive = speciesCardDots?.[4]?.[0] || false;

  // Get the number of '-1 Cooldown' dots selected (index 5)
  const cooldownDots = (speciesCardDots?.[5]?.filter(Boolean).length || 0);
  const cooldown = Math.max(1, 4 - cooldownDots);

  return { rangeBonus, cooldown, includesInactive };
}

/**
 * Generate the Memory Manifest technique JSX with dynamic values (for Level Up page)
 */
export function generateMemoryManifestJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { rangeBonus, cooldown, includesInactive } = calculateMemoryManifestData(speciesCardDots);
  const totalRange = 3 + rangeBonus;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f5e2b', fontSize: '1em' }}>Memory Manifest</i></b> <i style={{ color: '#5f5e2b', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You can use any <i>Active</i> or <b>{includesInactive ? '[Inactive]' : '[ - ]'}</b> <b><i style={{ color: '#bf9000' }}>Technique</i></b> from an ally within <b>[{totalRange}]</b>hx of you.
    </span>
  );
}

/**
 * Generate Memory Manifest description JSX for Cards page (without title and cooldown)
 */
export function generateMemoryManifestCardJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { rangeBonus, includesInactive } = calculateMemoryManifestData(speciesCardDots);
  const totalRange = 3 + rangeBonus;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You can use any <i>Active</i> or <b>{includesInactive ? '[Inactive]' : '[ - ]'}</b> <b><i style={{ color: '#bf9000' }}>Technique</i></b> from an ally within <b>[{totalRange}]</b>hx of you.
    </span>
  );
}

/**
 * Calculate Limit Push technique values based on species card dots
 */
export function calculateLimitPushData(speciesCardDots?: boolean[][]): LimitPushData {
  // Get the number of '+1hx Range' dots selected (index 6)
  const rangeDots = speciesCardDots?.[6] || [];
  const rangeBonus = rangeDots.filter(Boolean).length;

  // Get the '+1 Cooldown Token' dot (index 7)
  const cooldownTokens = speciesCardDots?.[7]?.[0] ? 2 : 1;

  // Get the number of '-1 Cooldown' dots selected (index 8)
  const cooldownDots = (speciesCardDots?.[8]?.filter(Boolean).length || 0);
  const cooldown = Math.max(1, 4 - cooldownDots);

  return { rangeBonus, cooldown, cooldownTokens };
}

/**
 * Generate the Limit Push technique JSX with dynamic values (for Level Up page)
 */
export function generateLimitPushJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { rangeBonus, cooldown, cooldownTokens } = calculateLimitPushData(speciesCardDots);
  const totalRange = 3 + rangeBonus;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f5e2b', fontSize: '1em' }}>Limit Push </i></b> <i style={{ color: '#5f5e2b', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You and allies within <b>[{totalRange}]</b>hx of you can remove <b>[{cooldownTokens}]</b> Cooldown Token(s) from any <i>Inactive</i> <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#bf9000' }}>Technique</i></b>.
    </span>
  );
}

/**
 * Generate Limit Push description JSX for Cards page (without title and cooldown)
 */
export function generateLimitPushCardJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { rangeBonus, cooldownTokens } = calculateLimitPushData(speciesCardDots);
  const totalRange = 3 + rangeBonus;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You and allies within <b>[{totalRange}]</b>hx of you can remove <b>[{cooldownTokens}]</b> Cooldown Token(s) from any <i>Inactive</i> <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#bf9000' }}>Technique</i></b>.
    </span>
  );
}
