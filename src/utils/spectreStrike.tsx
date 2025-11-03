import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateSpectreStrikeJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Spectre') return null;

  const strikeDamageDots = (sheet.subclassProgressionDots as any)?.spectreStrikeDamageDots || [];
  const strikeExtraDots = (sheet.subclassProgressionDots as any)?.spectreStrikeExtraDots || [];
  const damageDice = 1 + strikeDamageDots.filter(Boolean).length;
  const hasExtraStrike = strikeExtraDots[0] === true;

  return (
    <>
      <b><i><span style={{ color: '#351c75' }}>Strike</span> Damage.</i></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
      Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>. {hasExtraStrike && <>+<b>[1]</b> <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b>.</>}
    </>
  );
};

export const generateSpectreStrikeDamageJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Spectre') return null;

  const strikeDamageDots = (sheet.subclassProgressionDots as any)?.spectreStrikeDamageDots || [];
  const damageDice = 1 + strikeDamageDots.filter(Boolean).length;

  return (
    <>
      [{damageDice}]d6&nbsp;
      <span style={{ color: '#a6965f', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Piercing
        <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};
