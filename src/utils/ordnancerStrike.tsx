import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateOrdnancerStrikeJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Ordnancer') return null;

  // Get progression dots
  const strikeDamageDiceDots = (sheet?.subclassProgressionDots as any)?.ordnancerStrikeDamageDiceDots?.filter(Boolean).length || 0;
  const totalDice = 1 + strikeDamageDiceDots;

  return (
    <>
      <b><i style={{ color: '#351c75' }}>Strike</i> Damage.</b> <b>[{totalDice}]</b>d8 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
      Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.
    </>
  );
};

// Version for Character Sheet (without "Strike Damage." label)
export const generateOrdnancerStrikeDamageJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Ordnancer') return null;

  // Get progression dots
  const strikeDamageDiceDots = (sheet?.subclassProgressionDots as any)?.ordnancerStrikeDamageDiceDots?.filter(Boolean).length || 0;
  const totalDice = 1 + strikeDamageDiceDots;

  return (
    <>
      [{totalDice}]d8&nbsp;
      <span style={{ color: '#915927', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning
        <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};
