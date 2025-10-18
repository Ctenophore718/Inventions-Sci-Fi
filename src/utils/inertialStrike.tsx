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
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage.</i></b> {damageDice}d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
      Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>{conditions ? <><b><i>{conditions}</i></b></> : ''}.
    </>
  );
};
