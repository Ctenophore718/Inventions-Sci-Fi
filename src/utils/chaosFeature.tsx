import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateAggressionJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const chaosFeatureMoveDots = (sheet?.subclassProgressionDots as any)?.chaosFeatureMoveDots || [false, false, false];
  
  // Calculate dynamic values
  const moveDistance = 2 + chaosFeatureMoveDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#b15b6c', fontSize: '1em' }}>Aggression.</i></b> Whenever you take Damage, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{moveDistance}]</b>hx.
    </>
  );
};
