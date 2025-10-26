import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateEarthStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const earthStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.earthStrikeDamageDots || [false, false, false];
  const earthStrikeInflictRestrainDots = (sheet?.subclassProgressionDots as any)?.earthStrikeInflictRestrainDots || [false];

  // Calculate dynamic values
  const baseDamageDie = 1;
  const damageDie = baseDamageDie + (earthStrikeDamageDots.filter(Boolean).length * 2);
  const inflictsRestrain = earthStrikeInflictRestrainDots[0];

  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage.</i></b> <b>[{damageDie}]</b>d6 <b><u style={{ color: '#8B4513', display: 'inline-flex', alignItems: 'center' }}>
      Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>{inflictsRestrain && <>, <b><i>Restrain</i></b></>}.
    </>
  );
};

// Helper function for CharacterSheet Strike Damage display
export const generateEarthStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const earthStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.earthStrikeDamageDots || [false, false, false];
  const damageDice = 1 + (earthStrikeDamageDots.filter(Boolean).length * 2);
  
  return (
    <>
      {damageDice}d6&nbsp;
      <span style={{ color: '#8B4513', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning
        <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};
