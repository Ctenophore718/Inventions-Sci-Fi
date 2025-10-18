import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateGravityWellJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const inertialTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.inertialTechniqueRangeDots || [false, false, false];
  const inertialTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.inertialTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const range = 3 + inertialTechniqueRangeDots.filter(Boolean).length;
  const cooldown = 4 - inertialTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#1c945e', fontSize: '1em' }}>Gravity Well</i></b> <i style={{ color: '#1c945e', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the beginning of the next round, while within <b>[{range}]</b>hx of you, enemies cannot <b><i style={{ color: '#38761d', fontSize: '1em' }}>Move</i></b> except to <b><i style={{ color: '#38761d', fontSize: '1em' }}>Move</i></b> closer to you. Additionally, enemy <b><i style={{ color: '#990000', fontSize: '1em' }}>Attacks</i></b> targeting allies within <b>[{range}]</b>hx of you are automatically redirected to you.
    </>
  );
};

export const generateGravityWellCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const inertialTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.inertialTechniqueRangeDots || [false, false, false];
  
  // Calculate dynamic values
  const range = 3 + inertialTechniqueRangeDots.filter(Boolean).length;
  
  return (
    <>
      Until the beginning of the next round, while within <b>[{range}]</b>hx of you, enemies cannot <b><i style={{ color: '#38761d' }}>Move</i></b> except to <b><i style={{ color: '#38761d' }}>Move</i></b> closer to you. Additionally, enemy <b><i style={{ color: '#990000' }}>Attacks</i></b> targeting allies within <b>[{range}]</b>hx of you are automatically redirected to you.
    </>
  );
};
