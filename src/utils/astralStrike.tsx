import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateAstralStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const astralStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.astralStrikeDamageDots || [false, false, false];
  
  // Calculate dynamic values
  const damageDice = 1 + astralStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage.</i></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
      Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>.
    </>
  );
};

// Helper function for CharacterSheet Strike Damage display
export const generateAstralStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const astralStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.astralStrikeDamageDots || [false, false, false];
  const damageDice = 1 + astralStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      {damageDice}d6&nbsp;
      <span style={{ color: '#a929ff', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Neural
        <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};
