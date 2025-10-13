import React from 'react';

export interface TacticianTechniqueData {
  range: number;
  damageDice: number;
  cooldown: number;
}

/**
 * Calculate Tactician Technique values based on progression dots
 */
export function calculateTacticianTechniqueData(
  rangeHxDots?: boolean[],
  damageDiceDots?: boolean[],
  cooldownDots?: boolean[]
): TacticianTechniqueData {
  // Base range is 3hx
  const range = 3 + (rangeHxDots?.filter(Boolean).length || 0);
  
  // Base damage die is +1, can add up to +3 more
  const damageDice = 1 + (damageDiceDots?.filter(Boolean).length || 0);
  
  // Base cooldown is 4, can reduce by 2
  const cooldown = 4 - (cooldownDots?.filter(Boolean).length || 0);
  
  return { range, damageDice, cooldown };
}

/**
 * Generate the Tactician Technique JSX with dynamic values
 */
export function generateStratigeryJSX(
  rangeHxDots?: boolean[],
  damageDiceDots?: boolean[],
  cooldownDots?: boolean[]
): React.ReactElement {
  const { range, damageDice, cooldown } = calculateTacticianTechniqueData(rangeHxDots, damageDiceDots, cooldownDots);

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <b><i style={{ color: '#cec31f', fontSize: '1em' }}>Strategery</i></b> <i style={{ color: '#cec31f', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You and allies within <b>[{range}]</b>hx gain +<b>[{damageDice}]</b> Damage dice on their next <span style={{ color: '#351c75' }}><b><i>Strike</i></b></span> or <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> and are also considered to have at least 50% Cover until the beginning of the next round.
    </div>
  );
}
