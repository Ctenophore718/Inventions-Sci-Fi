import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateEnemiesOnAllSidesJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const coerciveTechniqueDots = sheet?.subclassProgressionDots?.coerciveTechniqueDots || [false, false, false];
  const coerciveTechniqueCreatureDots = sheet?.subclassProgressionDots?.coerciveTechniqueCreatureDots || [false, false];
  const coerciveTechniqueCooldownDots = sheet?.subclassProgressionDots?.coerciveTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const range = 5 + coerciveTechniqueDots.filter(Boolean).length;
  const creatures = 1 + coerciveTechniqueCreatureDots.filter(Boolean).length;
  const cooldown = 4 - coerciveTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#43c9ff', fontSize: '1em' }}>Enemies On All Sides</i></b> <i style={{ color: '#43c9ff', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> <b>[{creatures}]</b> creature(s) within <b>[{range}]</b>hx suffer(s) the <b><i>Demoralize</i></b> condition. In addition, all Attacks made against that creature inflict the <i>Confuse</i> condition until the beginning of the next round.
    </>
  );
};

export const generateEnemiesOnAllSidesCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const coerciveTechniqueDots = sheet?.subclassProgressionDots?.coerciveTechniqueDots || [false, false, false];
  const coerciveTechniqueCreatureDots = sheet?.subclassProgressionDots?.coerciveTechniqueCreatureDots || [false, false];
  
  // Calculate dynamic values
  const range = 5 + coerciveTechniqueDots.filter(Boolean).length;
  const creatures = 1 + coerciveTechniqueCreatureDots.filter(Boolean).length;
  
  return (
    <>
      <b>[{creatures}]</b> creature(s) within <b>[{range}]</b>hx suffer(s) the <b><i>Demoralize</i></b> condition. In addition, all Attacks made against that creature inflict the <i>Confuse</i> condition until the beginning of the next round.
    </>
  );
};