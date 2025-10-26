import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateCleansingWatersJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const waterTechniqueHxDots = (sheet?.subclassProgressionDots as any)?.waterTechniqueHxDots || [false, false, false];
  const waterTechniqueHpDots = (sheet?.subclassProgressionDots as any)?.waterTechniqueHpDots || [false, false, false];
  const waterTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.waterTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
    const hxRange = 3 + waterTechniqueHxDots.filter(Boolean).length;
    const hpDice = 0 + waterTechniqueHpDots.filter(Boolean).length;
  const cooldown = 4 - waterTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#0e42e2', fontSize: '1em' }}>Cleansing Waters</i></b> <i style={{ color: '#0e42e2', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Remove all conditions from yourself and allies within <b>[{hxRange}]</b>hx. Additionally, you and affected allies are <i>Immune</i> to all conditions until the beginning of the next round. Affected allies also gain <b>[{hpDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </>
  );
};

export const generateCleansingWatersCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const waterTechniqueHxDots = (sheet?.subclassProgressionDots as any)?.waterTechniqueHxDots || [false, false, false];
  const waterTechniqueHpDots = (sheet?.subclassProgressionDots as any)?.waterTechniqueHpDots || [false, false, false];
  
  // Calculate dynamic values
    const hxRange = 3 + waterTechniqueHxDots.filter(Boolean).length;
    const hpDice = 0 + waterTechniqueHpDots.filter(Boolean).length;
  
  return (
    <>
      Remove all conditions from yourself and allies within <b>[{hxRange}]</b>hx. Additionally, you and affected allies are <i>Immune</i> to all conditions until the beginning of the next round. Affected allies also gain <b>[{hpDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </>
  );
};
