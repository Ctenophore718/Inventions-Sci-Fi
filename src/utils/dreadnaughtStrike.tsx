import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateDreadnaughtStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const dreadnaughtStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtStrikeDamageDots || [false, false, false];
  
  // Calculate dynamic values - starts at 2d6, adds +2 dice per dot
  const damageDice = 2 + (dreadnaughtStrikeDamageDots.filter(Boolean).length * 2);
  
  return (
    <>
      <b><i><span style={{ color: '#351c75' }}>Strike</span> Damage.</i></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
      Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.
    </>
  );
};

// Version for Character Sheet (without "Strike Damage." label)
export const generateDreadnaughtStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const dreadnaughtStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtStrikeDamageDots || [false, false, false];
  
  // Calculate dynamic values - starts at 2d6, adds +2 dice per dot
  const damageDice = 2 + (dreadnaughtStrikeDamageDots.filter(Boolean).length * 2);
  
  return (
    <>
      [{damageDice}]d6&nbsp;
      <span style={{ color: '#915927', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning
        <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};
