import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateInertialStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const inertialStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.inertialStrikeDamageDots || [false, false, false];
  const inertialStrikeRestrainDots = (sheet?.subclassProgressionDots as any)?.inertialStrikeRestrainDots || [false];
  const inertialStrikeSleepDots = (sheet?.subclassProgressionDots as any)?.inertialStrikeSleepDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + inertialStrikeDamageDots.filter(Boolean).length * 2;
  const hasRestrain = inertialStrikeRestrainDots[0];
  const hasSleep = inertialStrikeSleepDots[0];
  
  // Build conditions string
  let conditions = '';
  if (hasRestrain && hasSleep) {
    conditions = ', Restrain, Sleep';
  } else if (hasRestrain) {
    conditions = ', Restrain';
  } else if (hasSleep) {
    conditions = ', Sleep';
  }
  
  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage.</i></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
      Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>{conditions ? <><b><i>{conditions}</i></b></> : ''}.
    </>
  );
};

// Helper function for CharacterSheet Strike Damage display
export const generateInertialStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const inertialStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.inertialStrikeDamageDots || [false, false, false];
  const damageDice = 1 + inertialStrikeDamageDots.filter(Boolean).length * 2;
  
  return (
    <>
      {damageDice}d6&nbsp;
      <span style={{ color: '#516fff', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Force
        <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};

// Helper function for CharacterSheet Strike Effects display
export const generateInertialStrikeEffectsJSX = (sheet: CharacterSheet | null): React.JSX.Element | null => {
  const inertialStrikeRestrainDots = (sheet?.subclassProgressionDots as any)?.inertialStrikeRestrainDots || [false];
  const inertialStrikeSleepDots = (sheet?.subclassProgressionDots as any)?.inertialStrikeSleepDots || [false];
  
  const hasRestrain = inertialStrikeRestrainDots[0];
  const hasSleep = inertialStrikeSleepDots[0];
  
  if (hasRestrain && hasSleep) {
    return <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Restrain</i></b>, <b><i>Sleep</i></b></span>;
  } else if (hasRestrain) {
    return <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Restrain</i></b></span>;
  } else if (hasSleep) {
    return <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Sleep</i></b></span>;
  }
  
  return null;
};
