import React from 'react';

export interface CoderTechniqueData {
  damageDice: number;
  cooldownReduction: number;
  damageResistance: string;
}

/**
 * Calculate Coder technique values based on class card dots
 */
export function calculateCoderTechniqueData(classCardDots?: boolean[][]): CoderTechniqueData {
  // Get the +1d6 Damage dots (array index 2)
  const damageDots = classCardDots?.[2] || [];
  const damageDice = 1 + damageDots.filter(Boolean).length;
  
  // Get the -1 Cooldown dots from Technique section (array index 5)
  const cooldownDots = classCardDots?.[5] || [];
  const cooldownReduction = cooldownDots.filter(Boolean).length;
  
  // Get damage resistance status
  const immunityDots = classCardDots?.[4] || [];
  const resistDots = classCardDots?.[3] || [];
  let damageResistance = ' - ';
  if (immunityDots[0]) {
    damageResistance = 'Immune';
  } else if (resistDots[0]) {
    damageResistance = 'Resistant';
  }
  
  return { damageDice, cooldownReduction, damageResistance };
}

/**
 * Generate the Reflection Script technique JSX with dynamic values (includes header)
 */
export function generateReflectionScriptJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { damageDice, cooldownReduction, damageResistance } = calculateCoderTechniqueData(classCardDots);
  const finalCooldown = 4 - cooldownReduction;
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#112972', fontSize: '1em' }}>Reflection Script</i></b>{' '}
      <span style={{ color: '#112972', fontSize: '1em' }}>
        <i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{finalCooldown}]</b>).</i>
      </span>{' '}
      Until the start of the next round, whenever you and any ally within 3hx of you take Damage from an enemy, that enemy takes{' '}
      <b>[{damageDice}]</b>d6 Damage of the same type it dealt. Additionally, you and allies within 3hx are{' '}
      <b>[</b>{damageResistance === 'Immune' ? <i>Immune</i> : damageResistance === 'Resistant' ? <i>Resistant</i> : ' - '}<b>]</b>{' '}
      to the original Damage.
    </span>
  );
}

/**
 * Generate the Reflection Script technique description JSX without header (for Cards page)
 */
export function generateReflectionScriptDescriptionJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { damageDice, damageResistance } = calculateCoderTechniqueData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Until the start of the next round, whenever you and any ally within 3hx of you take Damage from an enemy, that enemy takes{' '}
      <b>[{damageDice}]</b>d6 Damage of the same type it dealt. Additionally, you and allies within 3hx are{' '}
      <b>[</b>{damageResistance === 'Immune' ? <i>Immune</i> : damageResistance === 'Resistant' ? <i>Resistant</i> : ' - '}<b>]</b>{' '}
      to the original Damage.
    </span>
  );
}