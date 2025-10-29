import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateSteelWingsJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const aeronautFeatureSpeedDots = (sheet?.subclassProgressionDots as any)?.aeronautFeatureSpeedDots || [false, false, false];
  
  // Calculate dynamic values
  const speed = 2 + (aeronautFeatureSpeedDots.filter(Boolean).length * 2);
  
  return (
    <>
      <b><i style={{ color: '#3da1d8', fontSize: '1em' }}>Steel Wings.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b> and an additional +2hx <b><i style={{ color: '#38761d' }}>Speed</i></b>.
    </>
  );
};
