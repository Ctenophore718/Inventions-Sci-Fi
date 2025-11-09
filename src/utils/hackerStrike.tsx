import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateForcedTeleportationJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const hackerStrikeForcedTeleportationDots = (sheet?.subclassProgressionDots as any)?.hackerStrikeForcedTeleportationDots || [false];
  
  const hasForcedTeleportation = hackerStrikeForcedTeleportationDots[0];
  
  return (
    <>
      <b><i>Enhanced</i></b> <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> <b><i>Effects.</i></b>{hasForcedTeleportation && <> Forced <b><i style={{ color: '#38761d' }}>Teleportation</i></b>.</>}
    </>
  );
};

export const generateForcedTeleportationCharacterSheetJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const hackerStrikeForcedTeleportationDots = (sheet?.subclassProgressionDots as any)?.hackerStrikeForcedTeleportationDots || [false];
  
  const hasForcedTeleportation = hackerStrikeForcedTeleportationDots[0];
  
  return (
    <>
      <b><i>Enhanced</i></b> <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> <b><i>Effects.</i></b>{hasForcedTeleportation && <> Forced <b><i style={{ color: '#38761d' }}>Teleportation</i></b> to hx adjacent to <i>Drone</i> against 3hx or smaller enemy.</>}
    </>
  );
};
