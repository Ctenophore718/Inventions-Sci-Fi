import React from 'react';

export interface ContemplativeTechniqueData {
  rangeBonus: number;
  cooldownReduction: number;
  totalRange: number;
  finalCooldown: number;
}

/**
 * Calculate Contemplative technique values based on class card dots
 */
export function calculateContemplativeTechniqueData(classCardDots?: boolean[][]): ContemplativeTechniqueData {
  // Get the +1hx range dots (array index 3)
  const rangeDots = classCardDots?.[3] || [];
  const rangeBonus = rangeDots.filter(Boolean).length;
  
  // Get the -1 Cooldown dots (array index 4)
  const cooldownDots = classCardDots?.[4] || [];
  const cooldownReduction = cooldownDots.filter(Boolean).length;
  
  // Calculate final values
  const totalRange = 3 + rangeBonus;
  const finalCooldown = 4 - cooldownReduction;
  
  return { rangeBonus, cooldownReduction, totalRange, finalCooldown };
}

/**
 * Generate the Swift Reaction technique JSX with dynamic values (includes header)
 */
export function generateSwiftReactionJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { totalRange, finalCooldown } = calculateContemplativeTechniqueData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#116372', fontSize: '1em' }}>Swift Reaction</i></b>{' '}
      <span style={{ color: '#116372', fontSize: '1em' }}>
        <i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{finalCooldown}]</b>).</i>
      </span>{' '}
      Until the beginning of the next round, you and all allies within <b>[{totalRange}]</b>hx can{' '}
      <b><i style={{ color: '#38761d' }}>Move</i></b> their <b><i style={{ color: '#38761d' }}>Speed</i></b> whenever they take Damage from an{' '}
      <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>. You can <b><i style={{ color: '#351c75' }}>Strike</i></b> during this{' '}
      <b><i style={{ color: '#38761d' }}>Movement</i></b>.
    </span>
  );
}

/**
 * Generate the Swift Reaction technique description JSX without header (for Cards page)
 */
export function generateSwiftReactionDescriptionJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { totalRange } = calculateContemplativeTechniqueData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Until the beginning of the next round, you and all allies within <b>[{totalRange}]</b>hx can{' '}
      <b><i style={{ color: '#38761d' }}>Move</i></b> their <b><i style={{ color: '#38761d' }}>Speed</i></b> whenever they take Damage from an{' '}
      <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>. You can <b><i style={{ color: '#351c75' }}>Strike</i></b> during this{' '}
      <b><i style={{ color: '#38761d' }}>Movement</i></b>.
    </span>
  );
}
