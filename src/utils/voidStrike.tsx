import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateVoidStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const voidStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.voidStrikeDamageDots || [false, false, false];
  const voidStrikeInflictDrainDots = (sheet?.subclassProgressionDots as any)?.voidStrikeInflictDrainDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + voidStrikeDamageDots.filter(Boolean).length;
  const hasInflictDrain = voidStrikeInflictDrainDots[0];
  
  return (
    <>
      <b>[{damageDice}]</b>d6 <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
        Toxic
        <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b>.{hasInflictDrain ? <> Inflict <b><i>Drain</i></b>.</> : ''}
    </>
  );
};

export const generateVoidStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const voidStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.voidStrikeDamageDots || [false, false, false];
  const voidStrikeInflictDrainDots = (sheet?.subclassProgressionDots as any)?.voidStrikeInflictDrainDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + voidStrikeDamageDots.filter(Boolean).length;
  const hasInflictDrain = voidStrikeInflictDrainDots[0];
  
  return (
    <>
      {damageDice}d6 <u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}> Toxic
        <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u>
    </>
  );
};
