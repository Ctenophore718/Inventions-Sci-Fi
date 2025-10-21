import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateFatigueJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const voidFeatureRangeDots = (sheet?.subclassProgressionDots as any)?.voidFeatureRangeDots || [false, false, false];
  
  // Calculate dynamic values
  const range = 8 + voidFeatureRangeDots.filter(Boolean).length * 2;
  
  return (
    <>
      <b><i style={{ color: '#5b73b1', fontSize: '1em' }}>Fatigue.</i></b> Whenever you take Damage, you inflict the <b><i>Demoralize</i></b> condition to one creature within <b>[{range}]</b>hx.
    </>
  );
};
