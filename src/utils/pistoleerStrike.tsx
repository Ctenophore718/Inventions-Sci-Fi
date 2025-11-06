import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generatePistoleerStrikeJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Pistoleer') return null;

  // Get progression dots
  const strikeDots = (sheet?.subclassProgressionDots as any)?.pistoleerStrikeDots?.filter(Boolean).length || 0;

  return (
    <>
      <b><i style={{ color: '#351c75' }}>Strike</i> Damage.</b> 1d4 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
      Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>{strikeDots > 0 && <>, +<b>[{strikeDots}]</b> <b><i style={{ color: '#351c75' }}>Strike</i></b></>}.
    </>
  );
};

// Version for Character Sheet (without "Strike Damage." label)
export const generatePistoleerStrikeDamageJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Pistoleer') return null;

  // Get progression dots
  const strikeDots = (sheet?.subclassProgressionDots as any)?.pistoleerStrikeDots?.filter(Boolean).length || 0;

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
