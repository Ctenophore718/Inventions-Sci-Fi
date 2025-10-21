import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateWeakenJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const voidTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.voidTechniqueRangeDots || [false, false, false];
  const voidTechniqueHalveSpeedDots = (sheet?.subclassProgressionDots as any)?.voidTechniqueHalveSpeedDots || [false];
  const voidTechniqueInflictDrainDots = (sheet?.subclassProgressionDots as any)?.voidTechniqueInflictDrainDots || [false];
  const voidTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.voidTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const range = 3 + voidTechniqueRangeDots.filter(Boolean).length;
  const cooldown = 4 - voidTechniqueCooldownDots.filter(Boolean).length;
  const hasHalveSpeed = voidTechniqueHalveSpeedDots[0];
  const hasInflictDrain = voidTechniqueInflictDrainDots[0];
  
  return (
    <>
  <b><i style={{ color: '#5b73b1', fontSize: '1em' }}>Weaken</i></b> <i style={{ color: '#5b73b1', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the start of the next round, enemies within <b>[{range}]</b>hx of you deal half Damage on all <b><i style={{ color: '#990000', fontSize: '1em' }}>Attacks</i></b> and <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strikes</i></b>, <b><i style={{ color: '#38761d', fontSize: '1em' }}>Move</i></b> at <b>[{hasHalveSpeed ? 'half' : 'full'}]</b> <b><i style={{ color: '#38761d', fontSize: '1em' }}>Speed</i></b> and suffer the <b>[{hasInflictDrain ? <i>Drain</i> : ' - '}]</b> condition.
    </>
  );
};

export const generateWeakenCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const voidTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.voidTechniqueRangeDots || [false, false, false];
  const voidTechniqueHalveSpeedDots = (sheet?.subclassProgressionDots as any)?.voidTechniqueHalveSpeedDots || [false];
  const voidTechniqueInflictDrainDots = (sheet?.subclassProgressionDots as any)?.voidTechniqueInflictDrainDots || [false];
  
  // Calculate dynamic values
  const range = 3 + voidTechniqueRangeDots.filter(Boolean).length;
  const hasHalveSpeed = voidTechniqueHalveSpeedDots[0];
  const hasInflictDrain = voidTechniqueInflictDrainDots[0];
  
  return (
    <>
      Until the start of the next round, enemies within <b>[{range}]</b>hx of you deal half Damage on all <b><i style={{ color: '#990000', fontSize: '1em' }}>Attacks</i></b> and <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strikes</i></b>, <b><i style={{ color: '#38761d', fontSize: '1em' }}>Move</i></b> at <b>[{hasHalveSpeed ? 'half' : 'full'}]</b> <b><i style={{ color: '#38761d', fontSize: '1em' }}>Speed</i></b> and suffer the <b>[{hasInflictDrain ? <i>Drain</i> : ' - '}]</b> condition.
    </>
  );
};
