import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateChaosStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const chaosStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.chaosStrikeDamageDots || [false, false, false];
  const chaosStrikeMultiStrikeDots = (sheet?.subclassProgressionDots as any)?.chaosStrikeMultiStrikeDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + chaosStrikeDamageDots.filter(Boolean).length;
  const hasMultiStrike = chaosStrikeMultiStrikeDots[0];
  
  return (
    <>
      <b>[{damageDice}]</b>d6 <span style={{ color: '#808080', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
        Slashing
        <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
      {hasMultiStrike && <>, +<b>[1]</b> <b><i style={{ color: '#351c75' }}>Strike</i></b>.</>}
    </>
  );
};

export const generateChaosStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const chaosStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.chaosStrikeDamageDots || [false, false, false];
  
  // Calculate dynamic values
  const damageDice = 1 + chaosStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      {damageDice}d6&nbsp;
      <span style={{ color: '#808080', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
        Slashing
        <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};
