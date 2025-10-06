import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateTechManipulationJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const technologistFeatureDots = (sheet?.subclassProgressionDots as any)?.technologistFeatureDots || [false, false, false];
  
  // Calculate dynamic range value
  const range = 5 + technologistFeatureDots.filter(Boolean).length;
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#8c43ff' }}>Tech Manipulation.</i></b> Enemies within <b>[{range}]</b>hx of you cannot Crit on <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>. In addition, when you or an ally within <b>[{range}]</b>hx of you removes a <i>Cooldown Token</i> from an <b><i><span style={{ color: '#351c75' }}>Item</span></i></b>, they can remove one additional <i>Cooldown Token</i>.
    </span>
  );
};