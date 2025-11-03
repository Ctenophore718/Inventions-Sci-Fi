import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBrawlerStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const brawlerStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.brawlerStrikeDamageDots || [false, false, false];
  const brawlerStrikeSpikeDots = (sheet?.subclassProgressionDots as any)?.brawlerStrikeSpikeDots || [false];
  
  // Calculate dynamic values - starts at 1d6, adds +1 die per dot
  const damageDice = 1 + brawlerStrikeDamageDots.filter(Boolean).length;
  const hasSpike = brawlerStrikeSpikeDots[0];
  
  return (
    <>
      <b><i>Strike Damage.</i></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
      Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.{hasSpike && <> <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>.</>}
    </>
  );
};

// Version for Character Sheet (without "Strike Damage." label)
export const generateBrawlerStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const brawlerStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.brawlerStrikeDamageDots || [false, false, false];
  
  // Calculate dynamic values - starts at 1d6, adds +1 die per dot
  const damageDice = 1 + brawlerStrikeDamageDots.filter(Boolean).length;
  
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

// Strike Effects for Character Sheet
export const generateBrawlerStrikeEffectsJSX = (sheet: CharacterSheet | null): React.JSX.Element | null => {
  const brawlerStrikeSpikeDots = (sheet?.subclassProgressionDots as any)?.brawlerStrikeSpikeDots || [false];
  
  if (!brawlerStrikeSpikeDots[0]) {
    return null;
  }
  
  return (
    <span style={{ color: '#000', fontWeight: 'normal' }}>
      <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b>
    </span>
  );
};
