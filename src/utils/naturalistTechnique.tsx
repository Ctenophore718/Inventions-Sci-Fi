import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBedOfRejuvenationJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const naturalistTechniqueDots = (sheet?.subclassProgressionDots as any)?.naturalistTechniqueDots || [false, false, false];
  const naturalistTechniqueHitPointsDots = (sheet?.subclassProgressionDots as any)?.naturalistTechniqueHitPointsDots || [false, false, false];
  const naturalistTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.naturalistTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const range = 5 + naturalistTechniqueDots.filter(Boolean).length;
  const hitPoints = 1 + naturalistTechniqueHitPointsDots.filter(Boolean).length;
  const cooldown = 4 - naturalistTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#66cf00', fontSize: '1em' }}>Bed of Rejuvenation</i></b> <i style={{ color: '#66cf00', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You and allies within <b>[{range}]</b>hx gain <b>[{hitPoints}]</b>d6 <b><i style={{ color: '#990000', fontSize: '1em' }}>Hit Points</i></b>. Additionally, enemies within <b>[{range}]</b>hx suffer the <b><i>Drain</i></b> condition.
    </>
  );
};

export const generateBedOfRejuvenationCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const naturalistTechniqueDots = (sheet?.subclassProgressionDots as any)?.naturalistTechniqueDots || [false, false, false];
  const naturalistTechniqueHitPointsDots = (sheet?.subclassProgressionDots as any)?.naturalistTechniqueHitPointsDots || [false, false, false];
  
  // Calculate dynamic values
  const range = 5 + naturalistTechniqueDots.filter(Boolean).length;
  const hitPoints = 1 + naturalistTechniqueHitPointsDots.filter(Boolean).length;
  
  return (
    <>
      You and allies within <b>[{range}]</b>hx gain <b>[{hitPoints}]</b>d6 <b><i style={{ color: '#990000', fontSize: '1em' }}>Hit Points</i></b>. Additionally, enemies within <b>[{range}]</b>hx suffer the <b><i>Drain</i></b> condition.
    </>
  );
};