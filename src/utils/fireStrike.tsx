import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateFireStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const fireStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.fireStrikeDamageDots || [false, false];
  const fireStrikeExtraStrikeDots = (sheet?.subclassProgressionDots as any)?.fireStrikeExtraStrikeDots || [false];
  const fireStrikeInflictSpikeDots = (sheet?.subclassProgressionDots as any)?.fireStrikeInflictSpikeDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + fireStrikeDamageDots.filter(Boolean).length;
  const hasExtraStrike = 0 + fireStrikeExtraStrikeDots[0];
  const inflictsSpike = fireStrikeInflictSpikeDots[0];
  
  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> <b><i>Damage</i></b>. <b>[{damageDice}]</b>d6 <b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>, + <b>[{hasExtraStrike}]</b> <b><i style={{ color: '#351c75' }}>Strike</i></b>{inflictsSpike && <>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b></>}.</>
  );
};

export const generateFireStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const fireStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.fireStrikeDamageDots || [false, false];
  
  // Calculate dynamic values
  const damageDice = 1 + fireStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      {damageDice}d6&nbsp; 
      <u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u>
    </>
  );
};
