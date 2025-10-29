import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateAeronautStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const aeronautStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.aeronautStrikeDamageDots || [false, false, false];
  
  // Calculate dynamic values - starts at 1d6, adds +1 die per dot
  const damageDice = 1 + aeronautStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      <b><i>Strike Damage.</i></b> <b>{damageDice}</b>d6 <b><u style={{ color: '#575757', display: 'inline-flex', alignItems: 'center' }}>
      Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.
    </>
  );
};
