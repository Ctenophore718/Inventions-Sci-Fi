import React from 'react';

export interface GalvanicTechniqueData {
  range: number;
  crit: number;
  hitPoints: string;
  cooldown: number;
}

/**
 * Calculate Galvanic subclass technique values based on progression dots
 */
export function calculateGalvanicTechniqueData(
  galvanicTechniqueHxDots?: boolean[],
  galvanicTechniqueCritDots?: boolean[],
  galvanicTechniqueHpDots?: boolean[],
  galvanicTechniqueCooldownDots?: boolean[]
): GalvanicTechniqueData {
  // Base range is 3hx
  let range = 3;
  
  // Add 1hx for each +1hx dot selected
  if (galvanicTechniqueHxDots) {
    range += galvanicTechniqueHxDots.filter(Boolean).length;
  }
  
  // Base crit is +2
  let crit = 2;
  
  // Add +2 for each crit dot selected
  if (galvanicTechniqueCritDots) {
    crit += galvanicTechniqueCritDots.filter(Boolean).length * 2;
  }
  
  // Calculate hit points - base 0, +1d6 for each dot
  let hitPointDice = 0;
  if (galvanicTechniqueHpDots) {
    hitPointDice += galvanicTechniqueHpDots.filter(Boolean).length;
  }
  const hitPoints = hitPointDice > 0 ? `${hitPointDice}d6` : '';
  
  // Base cooldown is 4
  let cooldown = 4;
  
  // Subtract 1 for each cooldown dot selected
  if (galvanicTechniqueCooldownDots) {
    cooldown -= galvanicTechniqueCooldownDots.filter(Boolean).length;
  }
  
  return {
    range,
    crit,
    hitPoints,
    cooldown
  };
}

/**
 * Generate the Bolstering Oratory technique JSX with dynamic values
 */
export function generateBolsteringOratoryJSX(
  galvanicTechniqueHxDots?: boolean[],
  galvanicTechniqueCritDots?: boolean[],
  galvanicTechniqueHpDots?: boolean[],
  galvanicTechniqueCooldownDots?: boolean[]
): React.ReactElement {
  const { range, crit, hitPoints, cooldown } = calculateGalvanicTechniqueData(
    galvanicTechniqueHxDots,
    galvanicTechniqueCritDots,
    galvanicTechniqueHpDots,
    galvanicTechniqueCooldownDots
  );
  
  // Extract the number of dice from hitPoints string (e.g., "2d6" -> 2)
  const hitPointDiceNum = hitPoints ? parseInt(hitPoints) : 0;
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6fce1f' }}>Bolstering Oratory</i></b> <span style={{ color: '#6fce1f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You remove all conditions from yourself and all allies within <b>[{range}]</b>hx and you all gain +<b>[{crit}]</b> Crit until the beginning of the next round. Additionally, you all gain +<b>[{hitPointDiceNum}]</b>d6 <span style={{ color: '#990000' }}><b><i>Hit Points</i></b></span>.
    </span>
  );
}

/**
 * Generate only the technique description for the Cards page (without title and cooldown)
 */
export function generateBolsteringOratoryDescriptionJSX(
  galvanicTechniqueHxDots?: boolean[],
  galvanicTechniqueCritDots?: boolean[],
  galvanicTechniqueHpDots?: boolean[],
  galvanicTechniqueCooldownDots?: boolean[]
): React.ReactElement {
  const { range, crit } = calculateGalvanicTechniqueData(
    galvanicTechniqueHxDots,
    galvanicTechniqueCritDots,
    galvanicTechniqueHpDots,
    galvanicTechniqueCooldownDots
  );
  
  // Extract the number of dice from hitPoints string (e.g., "2d6" -> 2)
  const hitPointDiceNum = galvanicTechniqueHpDots ? galvanicTechniqueHpDots.filter(Boolean).length : 0;
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You remove all conditions from yourself and all allies within <b>[{range}]</b>hx and you all gain +<b>[{crit}]</b> Crit until the beginning of the next round. Additionally, you all gain +<b>[{hitPointDiceNum}]</b>d6 <span style={{ color: '#990000' }}><b><i>Hit Points</i></b></span>.
    </span>
  );
}
