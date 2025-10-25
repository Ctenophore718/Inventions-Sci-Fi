import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateWingsOfAirJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const airTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.airTechniqueRangeDots || [false, false, false];
  const airTechniqueSpeedDots = (sheet?.subclassProgressionDots as any)?.airTechniqueSpeedDots || [false, false, false];
  const airTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.airTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const range = 3 + airTechniqueRangeDots.filter(Boolean).length;
  const speedBonus = 2 + airTechniqueSpeedDots.filter(Boolean).length;
  const cooldown = 4 - airTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#0ee2df', fontSize: '1em' }}>Wings of Air</i></b> <i style={{ color: '#0ee2df', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You and allies within <b>[{range}]</b>hx gain a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b> and +<b>[{speedBonus}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b> until the beginning of the next round.
    </>
  );
};

export const generateWingsOfAirCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const airTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.airTechniqueRangeDots || [false, false, false];
  const airTechniqueSpeedDots = (sheet?.subclassProgressionDots as any)?.airTechniqueSpeedDots || [false, false, false];
  
  // Calculate dynamic values
  const range = 3 + airTechniqueRangeDots.filter(Boolean).length;
  const speedBonus = 2 + airTechniqueSpeedDots.filter(Boolean).length;
  
  return (
    <>
      You and allies within <b>[{range}]</b>hx gain a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b> and +<b>[{speedBonus}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b> until the beginning of the next round.
    </>
  );
};
