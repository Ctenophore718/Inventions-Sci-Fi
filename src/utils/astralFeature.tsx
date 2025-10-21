import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateMartyrJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const astralFeatureRangeDots = (sheet?.subclassProgressionDots as any)?.astralFeatureRangeDots || [false, false, false];
  const astralFeatureAllyDots = (sheet?.subclassProgressionDots as any)?.astralFeatureAllyDots || [false, false, false];
  const astralFeatureHitPointsDots = (sheet?.subclassProgressionDots as any)?.astralFeatureHitPointsDots || [false, false, false];
  
  // Calculate dynamic values
  const range = 5 + astralFeatureRangeDots.filter(Boolean).length;
  const allyCount = 1 + astralFeatureAllyDots.filter(Boolean).length;
  const hitPointsDice = 2 + astralFeatureHitPointsDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#5bb1af', fontSize: '1em' }}>Martyr.</i></b> Whenever you take Damage, <b>[{allyCount}]</b> {allyCount === 1 ? 'ally' : 'allies'} within <b>[{range}]</b>hx gain{allyCount === 1 ? 's' : ''} <b>[{hitPointsDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </>
  );
};
