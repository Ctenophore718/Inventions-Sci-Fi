import React from 'react';

export interface GalvanicStrikeData {
  damage: string;
  strike: number;
  aoe: number;
}

/**
 * Calculate Galvanic subclass strike values based on progression dots
 */
export function calculateGalvanicStrikeData(
  galvanicStrikeDamageDots?: boolean[],
  galvanicStrikeStrikeDots?: boolean[],
  galvanicStrikeAoEDots?: boolean[]
): GalvanicStrikeData {
  // Base damage is 0 (no additional damage dice beyond standard Strike)
  let damageDice = 0;
  
  // Add 1 die for damage dot selected
  if (galvanicStrikeDamageDots) {
    damageDice += galvanicStrikeDamageDots.filter(Boolean).length;
  }
  const damage = damageDice > 0 ? `+${damageDice}d6` : '';
  
  // Base strike count is 0 (no additional strikes beyond standard)
  let strike = 0;
  
  // Add 1 for strike dot selected
  if (galvanicStrikeStrikeDots) {
    strike += galvanicStrikeStrikeDots.filter(Boolean).length;
  }
  
  // Base AoE is 0 (no AoE)
  let aoe = 0;
  
  // Add 1hx-radius for each AoE dot selected
  if (galvanicStrikeAoEDots) {
    aoe += galvanicStrikeAoEDots.filter(Boolean).length;
  }
  
  return {
    damage,
    strike,
    aoe
  };
}

/**
 * Generate the Galvanic Strike JSX with dynamic values
 */
export function generateGalvanicStrikeJSX(
  galvanicStrikeDamageDots?: boolean[],
  galvanicStrikeStrikeDots?: boolean[],
  galvanicStrikeAoEDots?: boolean[]
): React.ReactElement {
  const { damage, strike, aoe } = calculateGalvanicStrikeData(
    galvanicStrikeDamageDots,
    galvanicStrikeStrikeDots,
    galvanicStrikeAoEDots
  );
  
  // Calculate additional damage dice from Galvanic strike dots
  const damageDice = galvanicStrikeDamageDots?.filter(Boolean).length || 0;
  
  return (
    <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <b><i>Enhanced</i></b> <b><i style={{ color: '#351c75' }}>Strike</i></b> <b><i>Effects.</i></b> Damage type <span style={{ color: '#808080', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
        Slashing
        <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>.
      {damageDice > 0 && <> <b>+[{damageDice}]</b>d6 Damage.</>}
      {strike > 0 && <> <b>+[{strike}]</b> <span style={{ color: '#351c75' }}><b><i>Strike</i></b></span>.</>}
      {aoe > 0 && <> <i>AoE</i> <b>[{aoe}]</b>hx-Radius.</>}
    </div>
  );
}
