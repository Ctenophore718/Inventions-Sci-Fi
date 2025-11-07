import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateSniperStrikeJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Sniper') return null;

  return (
    <>
      <b><i style={{ color: '#351c75' }}>Strike</i> Damage.</b> 1d4 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
      Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.
    </>
  );
};

// Version for Character Sheet (without "Strike Damage." label)
export const generateSniperStrikeDamageJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Sniper') return null;

  return (
    <>
      1d4&nbsp;
      <span style={{ color: '#915927', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning
        <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};
