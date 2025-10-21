import React from 'react';

export interface DevoutTechniqueData {
  rangeDots: number;
  damageDots: number;
  cooldownDots: number;
  range: number;
  damageBonus: number;
  cooldown: number;
}

/**
 * Calculate Devout technique values based on class card dots
 */
export function calculateDevoutTechniqueData(classCardDots?: boolean[][]): DevoutTechniqueData {
  // Get +1hx Attack Range dots (array index 1)
  const rangeDots = classCardDots?.[1]?.filter(Boolean).length || 0;
  // Get +1d6 Attack Damage dots (array index 2)
  const damageDots = classCardDots?.[2]?.filter(Boolean).length || 0;
  // Get -1 Cooldown dots (array index 3)
  const cooldownDots = classCardDots?.[3]?.filter(Boolean).length || 0;
  
  // Base range is always part of the base attack, so range bonus is just the dots
  const range = rangeDots;
  // Damage bonus from dots
  const damageBonus = damageDots;
  // Calculate cooldown: base 4, minus cooldown dots
  const cooldown = 4 - cooldownDots;
  
  return { rangeDots, damageDots, cooldownDots, range, damageBonus, cooldown };
}

/**
 * Generate the Flagellation technique JSX with dynamic values
 * For use in the Technique section (includes header with cooldown)
 */
export function generateFlagellationJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { range, damageBonus, cooldown } = calculateDevoutTechniqueData(classCardDots);
  
  return (
    <>
      <b><i style={{ color: '#6b1172', fontSize: '1em' }}>Flagellation</i></b> <i style={{ color: '#6b1172', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You choose to deal 1d4 to 5d4 untyped Damage to yourself that cannot be reduced in any way. As a result, you gain a +2 Crit, +<b>[{range}]</b>hx Range and +<b>[{damageBonus}]</b>d6 Damage to your next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> for each die of Damage you dealt yourself.
    </>
  );
}

/**
 * Generate the Flagellation card stats JSX (without header)
 * For use in the Cards page
 */
export function generateFlagellationCardStatsJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { range, damageBonus } = calculateDevoutTechniqueData(classCardDots);
  
  return (
    <>
      You choose to deal 1d4 to 5d4 untyped Damage to yourself that cannot be reduced in any way. As a result, you gain a +2 Crit, +<b>[{range}]</b>hx Range and +<b>[{damageBonus}]</b>d6 Damage to your next <b><i style={{ color: '#990000' }}>Attack</i></b> for each die of Damage you dealt yourself.
    </>
  );
}
