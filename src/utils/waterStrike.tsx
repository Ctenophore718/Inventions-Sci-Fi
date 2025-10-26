import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateWaterStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const waterStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.waterStrikeDamageDots || [false];
  const waterStrikeInflictDemoralizeDots = (sheet?.subclassProgressionDots as any)?.waterStrikeInflictDemoralizeDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + waterStrikeDamageDots.filter(Boolean).length;
  const inflictsDemoralize = waterStrikeInflictDemoralizeDots[0];
  
  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> <b><i>Damage</i></b>. <b>[{damageDice}]</b>d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
      Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>{inflictsDemoralize && <>, <b><i>Demoralize</i></b></>}.
    </>
  );
};

export const generateWaterStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const waterStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.waterStrikeDamageDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + waterStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      {damageDice}d6&nbsp; 
      <u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
      Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u>
    </>
  );
};
